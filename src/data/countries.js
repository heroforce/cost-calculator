/**
 * ============================================================================
 * COUNTRY COST DATA — the only file you need to edit to change rates.
 * ============================================================================
 *
 * Nothing in here imports app code and no app code needs changing when you
 * add a country or move a rate. See README.md for the editing walkthrough.
 *
 * Each country:
 *
 *   currency    ISO 4217 code, used for FX lookups.
 *   symbol      What prefixes the number on screen.
 *   verified    true  = every line checked against a primary source (the
 *                       national revenue or social security authority).
 *               false = needs your review before client use. The UI shows a
 *                       warning banner for these.
 *   excludeELI  true suppresses the global 1% Employer Liability Insurance line.
 *   employer    The contribution lines. Shapes documented in src/lib/calc.js.
 *   leave       Statutory minimums.
 *   minWage     { amount, period: 'hr' | 'day' | 'mo' }
 *
 * Cap semantics matter — see capType in src/lib/calc.js. "base" caps the
 * salary the rate applies to; "contribution" caps the resulting amount.
 *
 * All cap / exempt figures are ANNUAL in local currency. Where a statute is
 * written monthly (most of Asia) the note records the monthly figure and the
 * cap is the annualised x12 value.
 */

export const countries = {
  /* ==========================================================================
   * VERIFIED — checked against primary sources, July 2026
   * ======================================================================== */

  Australia: {
    currency: 'AUD',
    symbol: 'A$',
    verified: true,
    excludeELI: false,
    employer: {
      'Superannuation Guarantee': {
        rate: 0.12,
        cap: 270830,
        capType: 'base',
        note: 'ATO. 12% from 1 Jul 2025, unchanged for 2026-27. Maximum contribution base A$270,830/yr from 1 Jul 2026 — note this moved from a quarterly to an annual basis under Payday Super (was A$62,500/quarter = A$250,000/yr in 2025-26).',
      },
      'Payroll Tax': {
        rate: 0.0545,
        note: 'State-varying: 4.75% (QLD) to 6.85% (ACT). 5.45% shown is the NSW rate, the most common. Only payable once the employer\'s total state payroll exceeds the state threshold (A$1.2m in NSW) — an EOR\'s aggregate payroll normally does. 2025-26 rates.',
      },
      "Workers' Compensation": {
        rate: 0.015,
        note: 'National average across states and industries. Actual premium is industry-rated and state-set: roughly 0.5% for professional services up to 5%+ for construction. 2025-26.',
      },
    },
    leave: { annualDays: 20, sickDays: 10, parentalWeeks: 24 },
    minWage: { amount: 26.44, period: 'hr' },
  },

  'New Zealand': {
    currency: 'NZD',
    symbol: 'NZ$',
    verified: true,
    excludeELI: false,
    employer: {
      'KiwiSaver Employer Contribution': {
        rate: 0.035,
        note: 'Inland Revenue. Compulsory employer contribution rose from 3% to 3.5% on 1 Apr 2026; scheduled to reach 4% on 1 Apr 2028. ESCT is deducted FROM this contribution, not added to it, so it is not a separate employer cost.',
      },
      'ACC Work Levy': {
        rate: 0.0069,
        note: 'ACC / MBIE. Average work levy across all industries for the 2026/27 year, $0.69 per $100 of liable earnings. Actual rate is set by Classification Unit — well below average for office-based work, well above for forestry or construction. The ACC Earners\' Levy is an EMPLOYEE deduction and is excluded.',
      },
    },
    leave: { annualDays: 20, sickDays: 10, parentalWeeks: 26 },
    minWage: { amount: 23.95, period: 'hr' },
  },

  'United Kingdom': {
    currency: 'GBP',
    symbol: '£',
    verified: true,
    excludeELI: false,
    employer: {
      'Employer National Insurance (Class 1 Secondary)': {
        rate: 0.15,
        exempt: 5000,
        note: 'HMRC. 15% on earnings above the £5,000/yr Secondary Threshold, from 6 Apr 2025. Rate and threshold unchanged for 2026-27 and frozen to 2030-31.',
      },
      'Workplace Pension (auto-enrolment minimum)': {
        rate: 0.03,
        exempt: 6240,
        cap: 50270,
        capType: 'base',
        note: 'The Pensions Regulator. Minimum 3% employer contribution on qualifying earnings — the band from £6,240 to £50,270/yr. 2026-27 band. Many employers contribute on full salary instead, which costs more.',
      },
    },
    leave: { annualDays: 28, sickDays: 0, parentalWeeks: 52 },
    minWage: { amount: 12.71, period: 'hr' },
  },

  Ireland: {
    currency: 'EUR',
    symbol: '€',
    verified: true,
    excludeELI: false,
    employer: {
      'Pay-Related Social Insurance (PRSI, Class A)': {
        tiers: [
          { upTo: 28704, rate: 0.09 },
          { upTo: Infinity, rate: 0.1125 },
        ],
        tierMode: 'whole',
        note: 'Revenue.ie. 9.00% on weekly earnings up to €552, 11.25% above €552 — and the higher rate applies to ALL earnings, not just the excess, which is why this is a banded rather than marginal rate. Threshold annualised as €552 x 52 = €28,704. Both rates rise on 1 Oct 2026 to 9.15% / 11.40%.',
      },
      'My Future Fund (auto-enrolment)': {
        rate: 0.015,
        cap: 80000,
        capType: 'base',
        note: 'Ireland\'s auto-enrolment pension, live from 1 Jan 2026. Employer contributes 1.5% of gross earnings up to €80,000, rising by 1.5 points every three years to 6% by 2035. Applies to employees aged 23-60 earning over €20,000/yr who are not already in a workplace scheme.',
      },
    },
    leave: { annualDays: 20, sickDays: 5, parentalWeeks: 26 },
    minWage: { amount: 14.15, period: 'hr' },
  },

  Philippines: {
    currency: 'PHP',
    symbol: '₱',
    verified: true,
    excludeELI: false,
    employer: {
      'SSS (Social Security System)': {
        rate: 0.1,
        cap: 420000,
        capType: 'base',
        note: 'SSS Circular 2024-006 / RA 11199. Employer share 10% of the Monthly Salary Credit; total rate reached its 15% target on 1 Jan 2025 and is unchanged for 2026. Maximum MSC ₱35,000/mo, annualised to ₱420,000 — so the employer share caps at ₱3,500/mo (₱42,000/yr).',
      },
      "SSS Employees' Compensation": {
        fixedMonthly: 30,
        note: 'SSS. Flat ₱30/month employer EC contribution at the maximum MSC. Combined with the SSS share above this gives the ₱3,530/mo (₱42,360/yr) employer maximum.',
      },
      PhilHealth: {
        rate: 0.025,
        cap: 1200000,
        capType: 'base',
        note: 'PhilHealth / RA 11223. Premium held at 5% of monthly basic salary for 2026, split 2.5% employer / 2.5% employee. Income ceiling ₱100,000/mo, so the employer share caps at ₱2,500/mo.',
      },
      'Pag-IBIG (HDMF)': {
        rate: 0.02,
        cap: 120000,
        capType: 'base',
        note: 'Pag-IBIG Fund. 2% employer contribution on the Monthly Fund Salary, capped at ₱10,000/mo since Feb 2024 — employer share caps at ₱200/mo.',
      },
      '13th Month Pay': {
        rate: 0.083333,
        note: 'Presidential Decree 851. Mandatory, equal to one-twelfth of basic salary earned in the year. Included on the assumption that the salary entered above represents 12 monthly payments — if your figure already includes the 13th month, remove this line.',
      },
    },
    leave: { annualDays: 5, sickDays: 0, parentalWeeks: 15 },
    minWage: { amount: 695, period: 'day' },
  },

  Singapore: {
    currency: 'SGD',
    symbol: 'S$',
    verified: true,
    excludeELI: false,
    employer: {
      'CPF (Central Provident Fund)': {
        rate: 0.17,
        cap: 96000,
        capType: 'base',
        note: 'CPF Board. 17% employer rate for employees aged 55 and below. Ordinary Wage ceiling rose to S$8,000/mo on 1 Jan 2026 (from S$7,400), the final step of the multi-year increase — annualised to S$96,000. Rates step down above age 55.',
      },
      'Skills Development Levy': {
        rate: 0.0025,
        cap: 135,
        capType: 'contribution',
        note: 'SkillsFuture Singapore. 0.25% of monthly remuneration, minimum S$2 and maximum S$11.25 per employee per month — S$135/yr maximum. 2026.',
      },
    },
    leave: { annualDays: 7, sickDays: 14, parentalWeeks: 16 },
    minWage: { amount: 0, period: 'mo' },
  },

  Malaysia: {
    currency: 'MYR',
    symbol: 'RM',
    verified: true,
    excludeELI: false,
    employer: {
      'EPF (KWSP)': {
        tiers: [
          { upTo: 60000, rate: 0.13 },
          { upTo: Infinity, rate: 0.12 },
        ],
        tierMode: 'whole',
        note: 'KWSP. Employer rate is 13% where monthly wages are RM5,000 or below and 12% above that — the rate applies to the whole wage, so this is banded not marginal. Threshold annualised as RM60,000. Employees under 60, 2026 rates.',
      },
      'SOCSO (PERKESO, First Category)': {
        rate: 0.0175,
        cap: 72000,
        capType: 'base',
        note: 'PERKESO. Approximately 1.75% employer contribution for Employment Injury plus Invalidity. Wage ceiling RM6,000/mo since 1 Oct 2024, annualised to RM72,000. PERKESO publishes an exact contribution table by wage band; this rate is the effective top-of-band figure.',
      },
      'EIS (Employment Insurance System)': {
        rate: 0.002,
        cap: 72000,
        capType: 'base',
        note: 'PERKESO. 0.2% employer contribution, wage ceiling RM6,000/mo — caps at RM11.90/mo. 2026.',
      },
      'HRD Corp Levy': {
        rate: 0.01,
        note: 'HRD Corp. 1% of monthly wages, mandatory for employers with 10 or more Malaysian employees. Reduces to 0.5% for employers with 5-9 employees. 2026.',
      },
    },
    leave: { annualDays: 8, sickDays: 14, parentalWeeks: 14 },
    minWage: { amount: 1700, period: 'mo' },
  },

  India: {
    currency: 'INR',
    symbol: '₹',
    verified: true,
    excludeELI: false,
    employer: {
      'Provident Fund (EPF)': {
        rate: 0.12,
        baseFactor: 0.5,
        cap: 180000,
        capType: 'base',
        note: 'EPFO. 12% of BASIC wages, not gross. Modelled here on basic = 50% of gross, the common Indian structure — adjust baseFactor if your contracts differ. Statutory wage ceiling ₹15,000/mo (₹180,000/yr). A Jan 2026 Supreme Court direction may lift this ceiling to ₹21,000-25,000; watch for a revision.',
      },
      'EPF Administrative Charges': {
        rate: 0.005,
        baseFactor: 0.5,
        cap: 180000,
        capType: 'base',
        note: 'EPFO, notified Jul 2026. 0.5% of basic wages. Subject to a minimum charge of ₹500/month per ESTABLISHMENT (not per employee), so the per-head cost is effectively the 0.5% shown for any establishment of reasonable size.',
      },
      'EDLI (Deposit Linked Insurance)': {
        rate: 0.005,
        baseFactor: 0.5,
        cap: 180000,
        capType: 'base',
        note: 'EPFO, notified Jul 2026. 0.5% of basic wages, employer-funded. EDLI administrative charges are waived.',
      },
      'ESIC': {
        rate: 0.0325,
        appliesUpTo: 252000,
        note: 'ESIC. 3.25% employer contribution, but only for employees with gross wages of ₹21,000/mo or less (₹25,000 for persons with disability). Shows as zero above that — which is correct, not a bug.',
      },
      'Gratuity Accrual': {
        rate: 0.0481,
        baseFactor: 0.5,
        note: 'Payment of Gratuity Act 1972. Payable at 15 days\' wages per completed year after five years\' service; 4.81% of basic is the standard annual accrual convention. Booked as an accrual, not a cash cost, until it vests.',
      },
    },
    leave: { annualDays: 15, sickDays: 12, parentalWeeks: 26 },
    minWage: { amount: 176, period: 'day' },
  },

  'United States': {
    currency: 'USD',
    symbol: '$',
    verified: true,
    excludeELI: false,
    employer: {
      'Social Security (OASDI)': {
        rate: 0.062,
        cap: 184500,
        capType: 'base',
        note: 'SSA. 6.2% employer share on wages up to the 2026 Social Security wage base of $184,500 (up from $176,100 in 2025).',
      },
      'Medicare (HI)': {
        rate: 0.0145,
        note: 'IRS. 1.45% employer share on all covered wages, no ceiling. The 0.9% Additional Medicare Tax above $200,000 is employee-only and is correctly excluded here.',
      },
      'FUTA (Federal Unemployment)': {
        rate: 0.006,
        cap: 7000,
        capType: 'base',
        note: 'IRS. Statutory 6.0% on the first $7,000 of wages, reduced to an effective 0.6% by the 5.4% state credit. Credit-reduction states pay more. 2026.',
      },
      'SUTA (State Unemployment)': {
        rate: 0.034,
        cap: 7000,
        capType: 'base',
        note: 'State-varying and experience-rated. 3.4% on a $7,000 base is the common new-employer rate; both the rate and the taxable wage base differ substantially by state (some bases exceed $50,000). Treat as indicative only.',
      },
      "Workers' Compensation": {
        rate: 0.0075,
        note: 'National average for office-based classifications. Rates are state-set and class-code-rated, from under 0.3% for clerical work to well over 5% for manual trades.',
      },
      'Health Insurance (employer premium)': {
        fixedMonthly: 336,
        note: 'Not statutory, but effectively mandatory for employers over 50 FTE under the ACA employer mandate. $336/mo reflects the lowest-tier HSA plan at employee-only coverage; realistic premiums run from $329 to $2,550/mo depending on plan tier and coverage level.',
      },
    },
    leave: { annualDays: 0, sickDays: 0, parentalWeeks: 12 },
    minWage: { amount: 7.25, period: 'hr' },
  },

  Canada: {
    currency: 'CAD',
    symbol: 'C$',
    verified: true,
    excludeELI: true,
    employer: {
      'Canada Pension Plan (CPP)': {
        rate: 0.0595,
        cap: 74600,
        capType: 'base',
        exempt: 3500,
        note: 'CRA, 2026. 5.95% on pensionable earnings — that is, salary capped at the YMPE of $74,600 less the $3,500 basic exemption. Maximum employer contribution $4,230.45/yr (up from $4,034.10 in 2025).',
      },
      'CPP2 (second additional)': {
        tiers: [
          { upTo: 74600, rate: 0 },
          { upTo: 85000, rate: 0.04 },
          { upTo: Infinity, rate: 0 },
        ],
        tierMode: 'marginal',
        note: 'CRA, 2026. 4.00% on earnings between the YMPE ($74,600) and the YAMPE ($85,000). Maximum employer contribution $416/yr.',
      },
      'Employment Insurance (EI)': {
        rate: 0.02282,
        cap: 68900,
        capType: 'base',
        note: 'CRA / CEIC, 2026. Employer rate is 1.4x the employee rate of $1.63 per $100, giving 2.282%. Maximum insurable earnings $68,900, so the maximum employer premium is $1,572.30/yr. Quebec rates differ.',
      },
      'Employer Health Tax (Ontario)': {
        rate: 0.0195,
        note: 'Ontario Ministry of Finance. 1.95% top rate, payable only on Ontario payroll above the $1m exemption — an EOR\'s aggregate payroll normally exceeds it. Provincial: BC, MB, NL and QC levy their own equivalents at different rates; AB and SK levy none.',
      },
      "Workers' Compensation": {
        rate: 0.0031,
        note: 'Provincial average for low-risk office classifications (WSIB Ontario basis). Board-set and industry-rated; higher-risk classes run several times this.',
      },
    },
    leave: { annualDays: 10, sickDays: 10, parentalWeeks: 40 },
    minWage: { amount: 17.75, period: 'hr' },
  },

  Germany: {
    currency: 'EUR',
    symbol: '€',
    verified: true,
    excludeELI: false,
    employer: {
      'Pension Insurance (Rentenversicherung)': {
        rate: 0.093,
        cap: 101400,
        capType: 'base',
        note: 'Deutsche Rentenversicherung, 2026. Total 18.6% split evenly; employer share 9.3%. Contribution assessment ceiling €8,450/mo (€101,400/yr).',
      },
      'Health Insurance (Krankenversicherung)': {
        rate: 0.0875,
        cap: 69750,
        capType: 'base',
        note: 'GKV, 2026. General rate 14.6% split evenly (7.3%) plus half the average supplementary contribution, which rose to 2.9% for 2026 (1.45%) — 8.75% employer share. Ceiling €5,812.50/mo (€69,750/yr). The supplementary rate is set per Krankenkasse and varies around the average.',
      },
      'Long-term Care Insurance (Pflegeversicherung)': {
        rate: 0.018,
        cap: 69750,
        capType: 'base',
        note: 'GKV, 2026. 3.6% base rate split evenly; employer share 1.8%. Ceiling €69,750/yr. Saxony shifts an extra 0.5 points to the employee. Childless employees over 23 pay a surcharge that is employee-only.',
      },
      'Unemployment Insurance (Arbeitslosenversicherung)': {
        rate: 0.013,
        cap: 101400,
        capType: 'base',
        note: 'Bundesagentur für Arbeit, 2026. 2.6% split evenly; employer share 1.3%. Ceiling €101,400/yr.',
      },
      'Insolvency Levy (U3)': {
        rate: 0.0015,
        cap: 101400,
        capType: 'base',
        note: 'Insolvenzgeldumlage, 2026. 0.15%, employer-only. Ceiling €101,400/yr.',
      },
      'Sick Pay & Maternity Apportionment (U1/U2)': {
        rate: 0.0044,
        cap: 101400,
        capType: 'base',
        note: 'Umlage U1 (sick pay, only for employers under 30 staff) and U2 (maternity, all employers). Rates are set independently by each Krankenkasse; 0.44% combined is an indicative blend and will differ by fund.',
      },
      'Accident Insurance (Berufsgenossenschaft)': {
        rate: 0.018,
        note: 'DGUV. Employer-only and industry-rated by Berufsgenossenschaft — 1.8% is an indicative blended figure. Office-based classifications sit well below it, construction and transport well above.',
      },
    },
    leave: { annualDays: 20, sickDays: 30, parentalWeeks: 14 },
    minWage: { amount: 13.9, period: 'hr' },
  },

  France: {
    currency: 'EUR',
    symbol: '€',
    verified: true,
    excludeELI: false,
    employer: {
      'Health, Maternity, Invalidity, Death': {
        rate: 0.131,
        note: 'URSSAF, 2026. 13.00% plus 0.10% additional contribution. The reduced 7% rate applies only where annual pay is below 2.5x SMIC; 13.1% is the standard rate for professional salaries.',
      },
      'Family Benefits (Allocations familiales)': {
        rate: 0.0525,
        note: 'URSSAF, 2026. 5.25% standard rate. Reduced to 3.45% where annual pay is below 3.5x SMIC.',
      },
      'Old-Age Insurance (capped)': {
        rate: 0.0855,
        cap: 48060,
        capType: 'base',
        note: 'URSSAF, 2026. 8.55% on earnings up to one PASS. PASS 2026 = €48,060/yr (€4,005/mo), a 2% uplift on 2025.',
      },
      'Old-Age Insurance (uncapped)': {
        rate: 0.0211,
        note: 'URSSAF, 2026. 2.11% on total earnings, no ceiling.',
      },
      'Unemployment Insurance': {
        rate: 0.0405,
        cap: 192240,
        capType: 'base',
        note: 'URSSAF, 2026. 4.05% up to four PASS (€192,240/yr). Note the Remote People simulation dated 2 Jun 2026 shows 4.1% for this line — see the README conflicts list.',
      },
      'AGS (Wage Guarantee Scheme)': {
        rate: 0.0025,
        cap: 192240,
        capType: 'base',
        note: 'AGS, 2026. 0.25% up to four PASS. Raised from 0.20% in Jul 2024.',
      },
      'Autonomy Solidarity Contribution (CSA)': {
        rate: 0.003,
        note: 'URSSAF, 2026. 0.30% on total earnings, employer-only.',
      },
      'AGIRC-ARRCO Supplementary Pension': {
        tiers: [
          { upTo: 48060, rate: 0.0472 },
          { upTo: 384480, rate: 0.1295 },
          { upTo: Infinity, rate: 0 },
        ],
        tierMode: 'marginal',
        note: 'AGIRC-ARRCO, 2026. Employer share 4.72% on Tranche 1 (to one PASS) and 12.95% on Tranche 2 (one to eight PASS). Genuinely marginal — each rate applies only to its own slice.',
      },
      'AGIRC-ARRCO CEG': {
        tiers: [
          { upTo: 48060, rate: 0.0129 },
          { upTo: 384480, rate: 0.0162 },
          { upTo: Infinity, rate: 0 },
        ],
        tierMode: 'marginal',
        note: 'Contribution d\'équilibre général, 2026. Employer share 1.29% on Tranche 1, 1.62% on Tranche 2.',
      },
      'AGIRC-ARRCO CET': {
        rate: 0.0021,
        cap: 384480,
        capType: 'base',
        note: 'Contribution d\'équilibre technique, 2026. 0.21% employer share, applies to earnings up to eight PASS and only where pay exceeds one PASS.',
      },
      'APEC': {
        rate: 0.00036,
        cap: 192240,
        capType: 'base',
        note: 'APEC, 2026. 0.036% employer share, cadre employees only, up to four PASS.',
      },
      'Training, Apprenticeship & Social Dialogue': {
        rate: 0.01156,
        note: 'URSSAF, 2026. Combined contribution à la formation professionnelle, taxe d\'apprentissage and contribution au dialogue social. 1.156% for employers with 11 or more employees.',
      },
      'Housing Assistance Fund (FNAL)': {
        rate: 0.001,
        cap: 48060,
        capType: 'base',
        note: 'URSSAF, 2026. 0.10% capped at one PASS for employers under 50 employees; employers of 50 or more pay 0.50% on TOTAL earnings with no ceiling — materially more. Change this line if the EOR entity is the employer of record for 50+ staff in France.',
      },
      'Work Accident Insurance (AT/MP)': {
        rate: 0.0071,
        note: 'URSSAF. Sector-rated and set annually per establishment. 0.71% reflects office-based professional activity; the all-sector average is closer to 2.2%.',
      },
      'Supplementary Health Cover (mutuelle)': {
        rate: 0.0183,
        cap: 48060,
        capType: 'base',
        note: 'Mandatory since the ANI 2013 reform: the employer must fund at least 50% of a compliant mutuelle. 1.83% is the Remote People 2026 benchmark, not a statutory rate — actual cost depends on the policy chosen.',
      },
      'Prévoyance (life & disability)': {
        rate: 0.0178,
        note: 'Mandatory for cadre employees at a minimum 1.50% of Tranche 1 under the 1947 convention; sector collective agreements often require more. 1.78% is the Remote People 2026 benchmark.',
      },
    },
    leave: { annualDays: 25, sickDays: 0, parentalWeeks: 16 },
    minWage: { amount: 12.02, period: 'hr' },
  },

  /* ==========================================================================
   * NEEDS REVIEW — built from secondary sources and EOR simulation
   * benchmarks. Not yet checked against the national authority. Every note
   * in this block is prefixed UNVERIFIED.
   * ======================================================================== */

  Indonesia: {
    currency: 'IDR',
    symbol: 'Rp',
    verified: false,
    excludeELI: false,
    employer: {
      'BPJS Kesehatan (Health)': {
        rate: 0.04,
        cap: 144000000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 4% employer share, salary ceiling Rp 12,000,000/mo. Per Horizons simulation, 27 May 2025.',
      },
      'JHT (Old Age Security)': {
        rate: 0.037,
        note: 'UNVERIFIED — needs review. 3.7% employer share, no ceiling. Per Horizons simulation, 27 May 2025.',
      },
      'JP (Pension Security)': {
        rate: 0.02,
        cap: 120507600,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 2% employer share, salary ceiling Rp 10,042,300/mo — this ceiling is indexed annually and the 2026 figure needs confirming. Per Horizons simulation, 27 May 2025.',
      },
      'JKK (Work Accident)': {
        rate: 0.0024,
        note: 'UNVERIFIED — needs review. 0.24% is the lowest of five risk bands (0.24%-1.74%). Per Horizons simulation, 27 May 2025.',
      },
      'JKM (Death)': {
        rate: 0.003,
        note: 'UNVERIFIED — needs review. 0.30% employer share. Per Horizons simulation, 27 May 2025.',
      },
      'THR (Religious Holiday Allowance)': {
        rate: 0.083333,
        note: 'UNVERIFIED — needs review. Mandatory one month\'s salary paid annually. Assumes the salary entered is 12 monthly payments.',
      },
    },
    leave: { annualDays: 12, sickDays: 0, parentalWeeks: 13 },
    minWage: { amount: 5400000, period: 'mo' },
  },

  Vietnam: {
    currency: 'VND',
    symbol: '₫',
    verified: false,
    excludeELI: false,
    employer: {
      'Social Insurance': {
        rate: 0.175,
        note: 'UNVERIFIED — needs review. 17.5% employer share (retirement, sickness/maternity, occupational accident). Capped at 20x the base salary.',
      },
      'Health Insurance': {
        rate: 0.03,
        note: 'UNVERIFIED — needs review. 3% employer share, capped at 20x the base salary.',
      },
      'Unemployment Insurance': {
        rate: 0.01,
        note: 'UNVERIFIED — needs review. 1% employer share, capped at 20x the regional minimum wage.',
      },
      'Trade Union Fee': {
        rate: 0.02,
        note: 'UNVERIFIED — needs review. 2% employer contribution to the trade union fund.',
      },
    },
    leave: { annualDays: 12, sickDays: 30, parentalWeeks: 26 },
    minWage: { amount: 4960000, period: 'mo' },
  },

  Thailand: {
    currency: 'THB',
    symbol: '฿',
    verified: false,
    excludeELI: false,
    employer: {
      'Social Security Fund': {
        rate: 0.05,
        cap: 180000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 5% employer share, wage ceiling THB 15,000/mo — caps at THB 750/mo. A rise in the ceiling has been under discussion; confirm the 2026 position.',
      },
      "Workmen's Compensation Fund": {
        rate: 0.002,
        cap: 240000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 0.2%-1.0% by industry risk; 0.2% is the lowest band. Wage ceiling THB 20,000/mo.',
      },
    },
    leave: { annualDays: 6, sickDays: 30, parentalWeeks: 14 },
    minWage: { amount: 400, period: 'day' },
  },

  'Hong Kong': {
    currency: 'HKD',
    symbol: 'HK$',
    verified: false,
    excludeELI: false,
    employer: {
      'MPF (Mandatory Provident Fund)': {
        rate: 0.05,
        cap: 360000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 5% employer contribution, relevant income ceiling HK$30,000/mo — caps at HK$1,500/mo.',
      },
    },
    leave: { annualDays: 7, sickDays: 12, parentalWeeks: 14 },
    minWage: { amount: 42.1, period: 'hr' },
  },

  Japan: {
    currency: 'JPY',
    symbol: '¥',
    verified: false,
    excludeELI: false,
    employer: {
      'Employees Pension Insurance': {
        rate: 0.0915,
        cap: 7860000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 18.3% split evenly; employer share 9.15%. Standard monthly remuneration capped at ¥650,000.',
      },
      'Health Insurance': {
        rate: 0.0499,
        cap: 16860000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. Roughly 9.98% split evenly; rate varies by prefecture and by health insurance society. Standard monthly remuneration capped at ¥1,405,000.',
      },
      'Long-term Care Insurance': {
        rate: 0.008,
        cap: 16860000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. Employer share for employees aged 40-64 only.',
      },
      'Employment Insurance': {
        rate: 0.009,
        note: 'UNVERIFIED — needs review. Employer share for general businesses; rates are revised each April.',
      },
      "Workers' Accident Compensation": {
        rate: 0.003,
        note: 'UNVERIFIED — needs review. Industry-rated from 0.25% to 8.8%; 0.3% is the office-work band.',
      },
    },
    leave: { annualDays: 10, sickDays: 0, parentalWeeks: 58 },
    minWage: { amount: 1121, period: 'hr' },
  },

  'South Korea': {
    currency: 'KRW',
    symbol: '₩',
    verified: false,
    excludeELI: false,
    employer: {
      'National Pension': {
        rate: 0.045,
        cap: 75720000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 9% split evenly; employer share 4.5%. Monthly income ceiling around KRW 6,310,000 — confirm the 2026 figure, it is reset each July.',
      },
      'National Health Insurance': {
        rate: 0.03595,
        note: 'UNVERIFIED — needs review. 7.09% split evenly; employer share roughly 3.545%. Confirm the 2026 rate.',
      },
      'Long-term Care Insurance': {
        rate: 0.00459,
        note: 'UNVERIFIED — needs review. Levied as a percentage of the health insurance contribution, expressed here as an effective rate on salary.',
      },
      'Employment Insurance': {
        rate: 0.0115,
        note: 'UNVERIFIED — needs review. 1.15% employer share for employers under 150 staff; higher for larger employers.',
      },
      'Industrial Accident Insurance': {
        rate: 0.007,
        note: 'UNVERIFIED — needs review. Industry-rated; 0.7% is the office-work band.',
      },
    },
    leave: { annualDays: 15, sickDays: 0, parentalWeeks: 52 },
    minWage: { amount: 10320, period: 'hr' },
  },

  Taiwan: {
    currency: 'TWD',
    symbol: 'NT$',
    verified: false,
    excludeELI: false,
    employer: {
      'Labor Insurance': {
        rate: 0.0871,
        cap: 528000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. Employer bears 70% of the 12.5% total (including employment insurance). Insured salary ceiling around NT$45,800/mo.',
      },
      'National Health Insurance': {
        rate: 0.0517,
        cap: 2652000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 5.17% rate; employer bears 60% with an average dependant multiplier applied. Ceiling around NT$219,500/mo.',
      },
      'Labor Pension': {
        rate: 0.06,
        cap: 2160000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 6% mandatory employer contribution to the individual pension account. Ceiling around NT$180,000/mo.',
      },
    },
    leave: { annualDays: 7, sickDays: 30, parentalWeeks: 8 },
    minWage: { amount: 28590, period: 'mo' },
  },

  Mexico: {
    currency: 'MXN',
    symbol: 'MX$',
    verified: false,
    excludeELI: false,
    employer: {
      'IMSS (Social Security)': {
        rate: 0.2,
        note: 'UNVERIFIED — needs review. Blended employer IMSS burden across sickness/maternity, disability, retirement and nursery branches. The real calculation is a stack of separate rates on differing UMA-based bands and needs modelling properly before client use.',
      },
      'INFONAVIT (Housing)': {
        rate: 0.05,
        note: 'UNVERIFIED — needs review. 5% employer contribution to the housing fund.',
      },
      'SAR (Retirement)': {
        rate: 0.02,
        note: 'UNVERIFIED — needs review. 2% employer contribution.',
      },
      'State Payroll Tax': {
        rate: 0.03,
        note: 'UNVERIFIED — needs review. State-varying, roughly 1%-4%. 3% is the common Mexico City rate.',
      },
      'Aguinaldo (13th month)': {
        rate: 0.041667,
        note: 'UNVERIFIED — needs review. Statutory minimum 15 days\' pay per year. Assumes the salary entered is 12 monthly payments.',
      },
    },
    leave: { annualDays: 12, sickDays: 0, parentalWeeks: 12 },
    minWage: { amount: 278.8, period: 'day' },
  },

  Brazil: {
    currency: 'BRL',
    symbol: 'R$',
    verified: false,
    excludeELI: false,
    employer: {
      'INSS (Social Security)': {
        rate: 0.2,
        note: 'UNVERIFIED — needs review. 20% employer contribution on total payroll, no ceiling on the employer side.',
      },
      'RAT (Work Accident)': {
        rate: 0.02,
        note: 'UNVERIFIED — needs review. 1%-3% by risk grade, adjusted by the FAP multiplier (0.5-2.0).',
      },
      'Sistema S & Third-party Levies': {
        rate: 0.058,
        note: 'UNVERIFIED — needs review. Combined SESI/SENAI/SEBRAE/INCRA/salário-educação levies, typically 5.8%.',
      },
      'FGTS': {
        rate: 0.08,
        note: 'UNVERIFIED — needs review. 8% employer deposit to the severance fund.',
      },
      '13th Salary': {
        rate: 0.083333,
        note: 'UNVERIFIED — needs review. Mandatory 13th salary. Assumes the salary entered is 12 monthly payments.',
      },
      'Vacation Bonus (1/3)': {
        rate: 0.0278,
        note: 'UNVERIFIED — needs review. Constitutional one-third vacation premium on 30 days\' leave.',
      },
      'Meal & Food Allowance': {
        fixedMonthly: 600,
        note: 'UNVERIFIED — needs review. Not federally mandatory but required by most collective bargaining agreements. R$600/mo is an indicative benchmark; the actual figure comes from the applicable CBA. This is a placeholder — replace it with the CBA figure for the role.',
      },
    },
    leave: { annualDays: 30, sickDays: 15, parentalWeeks: 17 },
    minWage: { amount: 1621, period: 'mo' },
  },

  Chile: {
    currency: 'CLP',
    symbol: 'CLP$',
    verified: false,
    excludeELI: false,
    employer: {
      'Unemployment Insurance (AFC)': {
        rate: 0.024,
        note: 'UNVERIFIED — needs review. 2.4% employer share for indefinite contracts, capped at roughly 131.9 UF.',
      },
      'Work Accident Insurance (Mutual)': {
        rate: 0.0093,
        note: 'UNVERIFIED — needs review. 0.93% base rate plus an activity-based surcharge up to 3.4%.',
      },
      'SIS (Disability & Survivorship)': {
        rate: 0.0188,
        note: 'UNVERIFIED — needs review. Employer-funded, rate reset periodically by tender.',
      },
      'Heavy Labour / Social Security Reform Levy': {
        rate: 0.01,
        note: 'UNVERIFIED — needs review. The 2025 pension reform phases in an additional employer contribution rising to 8.5% over several years. The 2026 step needs confirming — this figure is a placeholder.',
      },
    },
    leave: { annualDays: 15, sickDays: 0, parentalWeeks: 30 },
    minWage: { amount: 529000, period: 'mo' },
  },

  Colombia: {
    currency: 'COP',
    symbol: 'COL$',
    verified: false,
    excludeELI: false,
    employer: {
      'Health (EPS)': {
        rate: 0.085,
        note: 'UNVERIFIED — needs review. 8.5% employer share. Exempt for employees earning under 10 minimum wages in some structures.',
      },
      'Pension': {
        rate: 0.12,
        note: 'UNVERIFIED — needs review. 12% employer share of the 16% total.',
      },
      'Work Risk Insurance (ARL)': {
        rate: 0.00522,
        note: 'UNVERIFIED — needs review. Risk-class-rated, 0.522% (class I) to 6.96% (class V).',
      },
      'Parafiscal (SENA, ICBF, Caja)': {
        rate: 0.09,
        note: 'UNVERIFIED — needs review. 4% Caja de Compensación plus 3% ICBF plus 2% SENA; the latter two are exempt for employees under 10 minimum wages.',
      },
      'Severance (Cesantías) & Interest': {
        rate: 0.0917,
        note: 'UNVERIFIED — needs review. One month\'s salary per year plus 12% annual interest on the balance.',
      },
      'Prima de Servicios': {
        rate: 0.083333,
        note: 'UNVERIFIED — needs review. Mandatory 13th month equivalent, paid in two instalments.',
      },
    },
    leave: { annualDays: 15, sickDays: 0, parentalWeeks: 18 },
    minWage: { amount: 1623500, period: 'mo' },
  },

  Argentina: {
    currency: 'ARS',
    symbol: 'AR$',
    verified: false,
    excludeELI: false,
    employer: {
      'Social Security Contributions': {
        rate: 0.207,
        note: 'UNVERIFIED — needs review. Combined employer contribution for pension, PAMI, family allowances and unemployment fund. 20.7% applies to services employers above the revenue threshold; 18% otherwise.',
      },
      'Health Insurance (Obra Social)': {
        rate: 0.06,
        note: 'UNVERIFIED — needs review. 6% employer share to the union health fund.',
      },
      'Work Risk Insurance (ART)': {
        rate: 0.03,
        note: 'UNVERIFIED — needs review. Negotiated per employer and industry, commonly 2%-6%.',
      },
      'Aguinaldo (SAC)': {
        rate: 0.083333,
        note: 'UNVERIFIED — needs review. Mandatory 13th month, paid in two instalments.',
      },
    },
    leave: { annualDays: 14, sickDays: 90, parentalWeeks: 13 },
    minWage: { amount: 322000, period: 'mo' },
  },

  Netherlands: {
    currency: 'EUR',
    symbol: '€',
    verified: false,
    excludeELI: false,
    employer: {
      'WW / AWf (Unemployment)': {
        rate: 0.0274,
        cap: 79000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. Low rate for permanent written contracts; the high rate for flexible contracts is 5 points more. Confirm the 2026 rate and the maximum contribution wage.',
      },
      'WIA / Aof (Disability)': {
        rate: 0.0764,
        cap: 79000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. Higher rate applies to large employers; small employers pay a reduced rate.',
      },
      'Zvw (Health Insurance Act)': {
        rate: 0.0626,
        cap: 79000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. Employer levy on wages up to the maximum contribution wage.',
      },
      'Whk (Return to Work Fund)': {
        rate: 0.0121,
        cap: 79000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. Differentiated per employer based on claims history.',
      },
      'Holiday Allowance': {
        rate: 0.08,
        note: 'UNVERIFIED — needs review. Statutory 8% holiday allowance, usually paid in May. Assumes the salary entered excludes it.',
      },
    },
    leave: { annualDays: 20, sickDays: 104, parentalWeeks: 16 },
    minWage: { amount: 14.71, period: 'hr' },
  },

  Spain: {
    currency: 'EUR',
    symbol: '€',
    verified: false,
    excludeELI: false,
    employer: {
      'Social Security (Common Contingencies)': {
        rate: 0.236,
        cap: 59059,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 23.6% employer share. Contribution base ceiling around €4,921/mo — confirm the 2026 figure, it is reset annually.',
      },
      'Unemployment': {
        rate: 0.055,
        cap: 59059,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 5.5% employer share for indefinite contracts; 6.7% for temporary.',
      },
      'FOGASA': {
        rate: 0.002,
        cap: 59059,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 0.2% wage guarantee fund.',
      },
      'Professional Training': {
        rate: 0.006,
        cap: 59059,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 0.6% employer share.',
      },
      'MEI (Intergenerational Equity Mechanism)': {
        rate: 0.0067,
        cap: 59059,
        capType: 'base',
        note: 'UNVERIFIED — needs review. Employer share of the MEI levy, which steps up annually to 2029.',
      },
      'Work Accident (AT/EP)': {
        rate: 0.015,
        cap: 59059,
        capType: 'base',
        note: 'UNVERIFIED — needs review. Activity-rated; 1.5% is the office-work band.',
      },
    },
    leave: { annualDays: 22, sickDays: 0, parentalWeeks: 16 },
    minWage: { amount: 1381, period: 'mo' },
  },

  Portugal: {
    currency: 'EUR',
    symbol: '€',
    verified: false,
    excludeELI: false,
    employer: {
      'Social Security (Segurança Social)': {
        rate: 0.2375,
        note: 'UNVERIFIED — needs review. 23.75% employer share, no ceiling.',
      },
      'Wage Guarantee Fund (FGCT/FCT)': {
        rate: 0.01,
        note: 'UNVERIFIED — needs review. 1% employer contribution to the labour compensation funds.',
      },
      'Work Accident Insurance': {
        rate: 0.0125,
        note: 'UNVERIFIED — needs review. Mandatory private cover, roughly 1%-2% depending on risk.',
      },
      '13th & 14th Month': {
        rate: 0.166667,
        note: 'UNVERIFIED — needs review. Mandatory holiday and Christmas subsidies, each one month. Assumes the salary entered is 12 monthly payments.',
      },
      'Meal Allowance': {
        fixedMonthly: 132,
        note: 'UNVERIFIED — needs review. €6/working day for 22 days, the common tax-exempt card rate. Not statutory for all employers but near-universal in practice.',
      },
    },
    leave: { annualDays: 22, sickDays: 0, parentalWeeks: 17 },
    minWage: { amount: 920, period: 'mo' },
  },

  Italy: {
    currency: 'EUR',
    symbol: '€',
    verified: false,
    excludeELI: false,
    employer: {
      'INPS (Social Security)': {
        rate: 0.2981,
        note: 'UNVERIFIED — needs review. Roughly 29.81% employer share for commercial-sector employees; varies materially by sector, company size and employee category. The pension component is capped at around €120,000/yr for post-1996 entrants.',
      },
      'INAIL (Work Accident)': {
        rate: 0.005,
        note: 'UNVERIFIED — needs review. Activity-rated from 0.4% to 13%; 0.5% is the office-work band.',
      },
      'TFR (Severance Accrual)': {
        rate: 0.069,
        note: 'UNVERIFIED — needs review. Trattamento di Fine Rapporto accrues at 1/13.5 of annual pay, roughly 7.41%, less a 0.5% INPS transfer.',
      },
      '13th & 14th Month': {
        rate: 0.166667,
        note: 'UNVERIFIED — needs review. 13th month is universal; the 14th depends on the applicable CCNL. Assumes the salary entered is 12 monthly payments.',
      },
    },
    leave: { annualDays: 20, sickDays: 180, parentalWeeks: 21 },
    minWage: { amount: 0, period: 'mo' },
  },

  Poland: {
    currency: 'PLN',
    symbol: 'zł',
    verified: false,
    excludeELI: false,
    employer: {
      'Pension (Emerytalne)': {
        rate: 0.0976,
        cap: 260190,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 9.76% employer share, capped at 30x the average forecast salary. Confirm the 2026 cap.',
      },
      'Disability (Rentowe)': {
        rate: 0.065,
        cap: 260190,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 6.5% employer share, same annual cap.',
      },
      'Accident (Wypadkowe)': {
        rate: 0.0167,
        note: 'UNVERIFIED — needs review. 0.67%-3.33% by activity; 1.67% is the default for most employers.',
      },
      'Labour Fund & FGŚP': {
        rate: 0.0255,
        note: 'UNVERIFIED — needs review. 2.45% Labour Fund plus 0.10% guaranteed benefits fund.',
      },
      'PPK (Employee Capital Plans)': {
        rate: 0.015,
        note: 'UNVERIFIED — needs review. 1.5% employer contribution; employees may opt out.',
      },
    },
    leave: { annualDays: 20, sickDays: 33, parentalWeeks: 20 },
    minWage: { amount: 4806, period: 'mo' },
  },

  Sweden: {
    currency: 'SEK',
    symbol: 'kr',
    verified: false,
    excludeELI: false,
    employer: {
      'Employer Social Fees (Arbetsgivaravgifter)': {
        rate: 0.3142,
        note: 'UNVERIFIED — needs review. 31.42% statutory employer contribution, no ceiling. Reduced rates apply to employees born before 1959 and to young workers.',
      },
      'Occupational Pension (ITP)': {
        rate: 0.045,
        note: 'UNVERIFIED — needs review. Not statutory but required by most collective agreements: 4.5% up to 7.5 income base amounts and 30% above.',
      },
    },
    leave: { annualDays: 25, sickDays: 14, parentalWeeks: 68 },
    minWage: { amount: 0, period: 'mo' },
  },

  'United Arab Emirates': {
    currency: 'AED',
    symbol: 'AED',
    verified: false,
    excludeELI: false,
    employer: {
      'GPSSA Pension (UAE/GCC nationals only)': {
        rate: 0.125,
        cap: 840000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 12.5% employer contribution for Emirati nationals only (15% for those who joined from Oct 2023). Expatriate employees attract no pension contribution — set this to zero for expat hires, which is the majority of EOR placements.',
      },
      'End of Service Gratuity': {
        rate: 0.0583,
        note: 'UNVERIFIED — needs review. 21 days\' basic pay per year for the first five years. Accrual convention, assumes basic = 100% of the figure entered.',
      },
      'Medical Insurance': {
        fixedMonthly: 300,
        note: 'UNVERIFIED — needs review. Mandatory employer-provided cover. AED 300/mo is an indicative basic-plan benchmark; actual premiums vary widely by emirate and plan.',
      },
    },
    leave: { annualDays: 30, sickDays: 90, parentalWeeks: 8 },
    minWage: { amount: 0, period: 'mo' },
  },

  'Saudi Arabia': {
    currency: 'SAR',
    symbol: 'SAR',
    verified: false,
    excludeELI: false,
    employer: {
      'GOSI (Saudi nationals)': {
        rate: 0.1175,
        cap: 540000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. For Saudi nationals: 9% pension plus 0.75% unemployment (SANED) plus 2% occupational hazards. Ceiling SAR 45,000/mo. The 2024 reform phases the pension rate up for new entrants.',
      },
      'GOSI (expatriates)': {
        rate: 0.02,
        cap: 540000,
        capType: 'base',
        note: 'UNVERIFIED — needs review. Expatriate employees attract only the 2% occupational hazards branch. If hiring an expat, zero out the line above and keep this one.',
      },
      'End of Service Award': {
        rate: 0.0556,
        note: 'UNVERIFIED — needs review. Half a month\'s pay per year for the first five years. Accrual convention.',
      },
    },
    leave: { annualDays: 21, sickDays: 120, parentalWeeks: 12 },
    minWage: { amount: 4000, period: 'mo' },
  },

  'South Africa': {
    currency: 'ZAR',
    symbol: 'R',
    verified: false,
    excludeELI: false,
    employer: {
      'UIF (Unemployment Insurance Fund)': {
        rate: 0.01,
        cap: 212544,
        capType: 'base',
        note: 'UNVERIFIED — needs review. 1% employer contribution, remuneration ceiling R17,712/mo. Confirm the 2026/27 ceiling.',
      },
      'SDL (Skills Development Levy)': {
        rate: 0.01,
        note: 'UNVERIFIED — needs review. 1% of total payroll, payable where annual payroll exceeds R500,000.',
      },
      'COIDA (Compensation Fund)': {
        rate: 0.0104,
        cap: 654632,
        capType: 'base',
        note: 'UNVERIFIED — needs review. Industry-rated; 1.04% is a mid-band figure. Earnings ceiling confirmed annually.',
      },
    },
    leave: { annualDays: 15, sickDays: 30, parentalWeeks: 17 },
    minWage: { amount: 28.79, period: 'hr' },
  },
};

/** Country names in the order they should appear in the dropdown. */
export const countryNames = Object.keys(countries);

/** Currency options for the compare dropdown, de-duplicated across countries. */
export const compareCurrencies = [
  ...new Set(Object.values(countries).map((c) => c.currency)),
].sort();
