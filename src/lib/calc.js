/**
 * Employer cost calculation engine.
 *
 * Everything here works in ANNUAL local-currency amounts. Monthly figures are
 * derived by dividing by 12 at display time, never by calculating separately —
 * that keeps annual and monthly columns internally consistent.
 *
 * A contribution definition in src/data/countries.js is one of three shapes:
 *
 *   1. Percentage
 *      { rate, cap, capType, exempt, baseFactor, appliesUpTo, note }
 *
 *   2. Tiered percentage
 *      { tiers: [{ upTo, rate }, ...], tierMode, baseFactor, note }
 *
 *   3. Fixed amount
 *      { fixedAnnual | fixedMonthly, note }
 *
 * Field reference:
 *   rate         Decimal, e.g. 0.12 for 12%.
 *   cap          Annual ceiling. Meaning depends on capType.
 *   capType      "base"         cap the salary the rate applies to
 *                "contribution" cap the resulting amount
 *                Required whenever cap is set — these produce very different
 *                numbers and conflating them is a real source of error.
 *   exempt       Annual amount subtracted from the base before the rate applies
 *                (UK NIC secondary threshold, Canada CPP basic exemption).
 *                Applied AFTER a base cap, so Canada CPP works out as
 *                min(salary, YMPE) - 3500.
 *   baseFactor   Fraction of gross the contribution is assessed on, for
 *                countries that levy on "basic wages" rather than total gross
 *                (India). Stated explicitly in the note when used.
 *   appliesUpTo  Contribution only applies if gross is at or below this figure
 *                (India ESIC coverage threshold). Above it, the line is zero.
 *   tiers        Ascending bands. `upTo` is the top of the band in annual local
 *                currency; the final band uses upTo: Infinity.
 *   tierMode     "marginal" each band's rate applies only to the slice of base
 *                           inside that band (France AGIRC-ARRCO).
 *                "whole"    the band containing the base determines a single
 *                           rate, applied to the entire base (Ireland PRSI).
 *                Defaults to "marginal".
 */

export const ELI_RATE = 0.01;
export const ELI_NAME = 'Employer Liability Insurance';
export const ELI_NOTE =
  'Global 1% assumption applied by HeroForce, not a statutory charge. Excluded ' +
  'for countries where equivalent cover is already provided through the state scheme.';

/** Resolve the base a percentage rate should be applied to. */
function resolveBase(def, gross) {
  let base = gross * (def.baseFactor ?? 1);
  if (def.cap != null && def.capType === 'base') base = Math.min(base, def.cap);
  if (def.exempt) base -= def.exempt;
  return Math.max(0, base);
}

function computeTiered(def, gross) {
  const base = resolveBase(def, gross);
  const mode = def.tierMode ?? 'marginal';

  if (mode === 'whole') {
    const band = def.tiers.find((t) => base <= t.upTo) ?? def.tiers[def.tiers.length - 1];
    return base * band.rate;
  }

  let amount = 0;
  let floor = 0;
  for (const tier of def.tiers) {
    if (base <= floor) break;
    amount += (Math.min(base, tier.upTo) - floor) * tier.rate;
    floor = tier.upTo;
  }
  return amount;
}

/**
 * Calculate one contribution line.
 * Returns the annual amount in local currency.
 */
export function computeContribution(def, gross) {
  if (def.appliesUpTo != null && gross > def.appliesUpTo) return 0;

  if (def.fixedAnnual != null) return def.fixedAnnual;
  if (def.fixedMonthly != null) return def.fixedMonthly * 12;
  if (def.tiers) return computeTiered(def, gross);

  let amount = resolveBase(def, gross) * def.rate;
  if (def.cap != null && def.capType === 'contribution') amount = Math.min(amount, def.cap);
  return amount;
}

/**
 * Human-readable rate label for the table's "Rate" column.
 */
export function describeRate(def) {
  if (def.fixedAnnual != null) return 'fixed';
  if (def.fixedMonthly != null) return 'fixed / mo';
  if (def.tiers) {
    const parts = def.tiers.map((t) => pct(t.rate));
    return def.tierMode === 'whole' ? parts.join(' | ') : parts.join(' → ');
  }
  return pct(def.rate);
}

function pct(rate) {
  const n = rate * 100;
  const rounded = Math.round(n * 1000) / 1000;
  return `${rounded}%`;
}

/**
 * Full breakdown for a country at a given annual gross salary.
 */
export function calculateCost(country, gross) {
  const salary = Number.isFinite(gross) && gross > 0 ? gross : 0;

  const lines = Object.entries(country.employer ?? {}).map(([name, def]) => ({
    name,
    def,
    rateLabel: describeRate(def),
    note: def.note ?? '',
    annual: computeContribution(def, salary),
  }));

  if (!country.excludeELI) {
    lines.push({
      name: ELI_NAME,
      def: { rate: ELI_RATE, note: ELI_NOTE },
      rateLabel: pct(ELI_RATE),
      note: ELI_NOTE,
      annual: salary * ELI_RATE,
    });
  }

  const totalEmployer = lines.reduce((sum, l) => sum + l.annual, 0);

  return {
    gross: salary,
    lines: lines.map((l) => ({
      ...l,
      monthly: l.annual / 12,
      pctOfGross: salary > 0 ? l.annual / salary : 0,
    })),
    totalEmployer,
    totalCost: salary + totalEmployer,
    upliftPct: salary > 0 ? totalEmployer / salary : 0,
  };
}
