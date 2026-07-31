# HeroForce — Global Employment Cost Calculator

Client-facing calculator for employer statutory costs across 33 countries. React
+ Vite, no backend, all data in one file.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle into dist/
npm run deploy   # build + push dist/ to the gh-pages branch
```

---

## Where things live

```
src/
  data/countries.js      ALL country cost data. The only file you edit for rates.
  lib/calc.js            Calculation engine. Cap semantics documented at the top.
  lib/fx.js              FX lookup with fallback.
  lib/format.js          Currency / percentage / rate formatting.
  components/            Presentation only, no rates or business rules.
  App.jsx                Wiring and state.
vite.config.js           `base` must match the repo name for GitHub Pages.
```

`countries.js` imports nothing. You can edit every rate in the app without
opening another file.

---

## How to update a rate

Open `src/data/countries.js`, find the country, change the number.

```js
'Superannuation Guarantee': {
  rate: 0.12,          // <- the rate, as a decimal
  cap: 270830,         // <- annual ceiling in local currency
  capType: 'base',     // <- see below. Required whenever cap is set.
  note: 'ATO. 12% from 1 Jul 2025 …',   // <- always update the note too
},
```

**Always update the `note` when you change a number.** The note is what appears
in the client-facing table, and a stale source reference is worse than none.
Include the authority and the effective date.

### capType — the distinction that matters

Two caps that look alike calculate very differently:

| capType | Meaning | Example |
|---|---|---|
| `'base'` | Cap the **salary** the rate applies to | Australia super: 12% of the first A$270,830 |
| `'contribution'` | Cap the **resulting amount** | Singapore SDL: 0.25%, but never more than S$135/yr |

Getting this wrong produces materially wrong numbers, so `capType` is required
whenever `cap` is set.

### Other fields

| Field | Use |
|---|---|
| `exempt` | Annual amount subtracted from the base before the rate applies. UK NIC's £5,000 secondary threshold; Canada CPP's $3,500 basic exemption. Applied *after* a base cap. |
| `baseFactor` | Fraction of gross the contribution is assessed on, where the statute levies on "basic wages" rather than total gross. India uses `0.5`. |
| `appliesUpTo` | Line only applies at or below this gross. India ESIC cuts out above ₹21,000/mo — showing zero above that is correct, not a bug. |

### Tiered rates

```js
tiers: [{ upTo: 48060, rate: 0.0472 }, { upTo: 384480, rate: 0.1295 }],
tierMode: 'marginal',   // or 'whole'
```

- `'marginal'` — each rate applies only to its own slice. France AGIRC-ARRCO.
- `'whole'` — the band containing the salary picks one rate, applied to the
  entire salary. Ireland PRSI and Malaysia EPF both work this way; modelling
  them as marginal would understate the cost significantly.

Bands ascend; the last one uses `upTo: Infinity`.

### Fixed amounts

```js
{ fixedMonthly: 30 }    // x12 internally
{ fixedAnnual: 360 }
```

### Employer Liability Insurance

A global 1% ELI line is added to every country automatically. Suppress it with
`excludeELI: true` on the country (currently only Canada).

---

## How to add a country

Add one entry to the `countries` object. Everything else — dropdown, compare
currency list, table, cards, chart — picks it up automatically.

```js
'Country Name': {
  currency: 'XXX',
  symbol: 'X$',
  verified: false,        // false shows an amber "needs review" banner in the UI
  excludeELI: false,
  employer: {
    'Contribution Name': {
      rate: 0.12,
      cap: 250000,
      capType: 'base',
      note: 'Authority. Rate, threshold, effective date.',
    },
  },
  leave: { annualDays: 20, sickDays: 10, parentalWeeks: 18 },
  minWage: { amount: 24.95, period: 'hr' },   // hr | day | mo; 0 = none
},
```

Set `verified: true` only once every line has been checked against the national
revenue or social security authority — not an aggregator or a competitor's
calculator.

If the currency is one the ECB doesn't publish, add it to `FRANKFURTER_GAPS` in
`src/lib/fx.js` so FX skips straight to the fallback provider.

---

## How to redeploy

```bash
npm run deploy
```

`predeploy` builds first, then `gh-pages` pushes `dist/` to the `gh-pages`
branch. GitHub Pages serves it within a minute or so.

If you rename the repo, change **both**:

- `base` in `vite.config.js`
- `homepage` in `package.json`

They must match the repo name or the deployed page will 404 on its own JS and CSS.

### First-time setup

Not yet done — the repo does not exist on GitHub yet. Create `cost-calculator`
under the `heroforce` account, then:

```bash
git remote add origin https://github.com/heroforce/cost-calculator.git
git push -u origin main
npm run deploy
```

Then in the repo's **Settings → Pages**, set the source to the `gh-pages` branch,
root folder. The site lands at `https://heroforce.github.io/cost-calculator/`.

---

## FX

Frankfurter (ECB reference rates) is primary, `open.er-api.com` is the fallback
for the seven currencies the ECB doesn't publish (VND, ARS, COP, CLP, SAR, AED,
TWD) and for any Frankfurter outage. The rate and its date are shown above the
summary cards.

Note the endpoint is `api.frankfurter.dev/v1/latest`, not the older
`api.frankfurter.app` — the old host 301s to the new one, and the redirect
carries no CORS headers, so a browser request to it always fails silently.

If both providers fail the app shows an amber notice and carries on. Local
currency never depends on FX.

---

## What counts as an employer cost

Only costs the employer actually bears. Employee deductions the employer merely
withholds and remits are **excluded** — they are already inside the gross salary.

Deliberately excluded:

| Country | Excluded | Why |
|---|---|---|
| New Zealand | ACC Earners' Levy | Employee deduction, not an employer cost. |
| New Zealand | ESCT | Withheld *from* the employer's KiwiSaver contribution, not added to it. Total employer outlay is the 3.5%. |
| United States | Additional Medicare Tax (0.9%) | Employee-only. |
| All | Employee halves of split contributions | Already inside gross. |

Where a rate is industry-rated or state-varying (workers' comp, payroll tax,
accident insurance), the data uses a stated national average and the note says so.

---

## Verification status

See [VERIFICATION.md](VERIFICATION.md) for which countries were checked against
primary sources, which need review, and the specific points where sources
conflict.
