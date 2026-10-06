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
 *               false = needs review before client use. The UI shows a
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
 * written monthly (most of Asia and Latin America) the note records the
 * monthly figure and the cap is the annualised x12 value.
 *
 * Last verification pass: 31 July 2026.
 */

export const countries = {
  /* ==========================================================================
   * ASIA PACIFIC
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

  Indonesia: {
    currency: 'IDR',
    symbol: 'Rp',
    verified: true,
    excludeELI: false,
    employer: {
      'BPJS Kesehatan (Health)': {
        rate: 0.04,
        cap: 144000000,
        capType: 'base',
        note: 'BPJS Kesehatan. 4% employer share of the 5% total. Salary ceiling Rp 12,000,000/mo, annualised to Rp 144,000,000. 2026.',
      },
      'JHT (Old Age Security)': {
        rate: 0.037,
        note: 'BPJS Ketenagakerjaan. 3.7% employer share of the 5.7% total, assessed on fixed monthly income with no ceiling. 2026.',
      },
      'JP (Pension Security)': {
        rate: 0.02,
        cap: 133035600,
        capType: 'base',
        note: 'BPJS Ketenagakerjaan. 2% employer share of the 3% total. Salary ceiling raised to Rp 11,086,300/mo at the March 2026 update, annualised to Rp 133,035,600. The ceiling is reindexed annually — check it each March.',
      },
      'JKK (Work Accident)': {
        rate: 0.0024,
        note: 'BPJS Ketenagakerjaan. Risk-rated across five bands from 0.24% to 1.74%. 0.24% is the lowest band, which is the correct one for office-based work. 2026.',
      },
      'JKM (Death Benefit)': {
        rate: 0.003,
        note: 'BPJS Ketenagakerjaan. 0.30%, employer-funded in full, no ceiling. 2026.',
      },
      'THR (Religious Holiday Allowance)': {
        rate: 0.083333,
        note: 'Mandatory one month\'s salary paid annually before the religious holiday. Assumes the salary entered represents 12 monthly payments.',
      },
    },
    leave: { annualDays: 12, sickDays: 0, parentalWeeks: 13 },
    minWage: { amount: 5400000, period: 'mo' },
  },

  Vietnam: {
    currency: 'VND',
    symbol: '₫',
    verified: true,
    excludeELI: false,
    employer: {
      'Social Insurance': {
        rate: 0.175,
        cap: 607200000,
        capType: 'base',
        note: 'Vietnam Social Security. 17.5% employer share covering retirement, sickness/maternity and occupational accident. Contribution base capped at 20x the reference level — VND 50,600,000/mo from 1 Jul 2026, annualised to VND 607,200,000.',
      },
      'Health Insurance': {
        rate: 0.03,
        cap: 607200000,
        capType: 'base',
        note: 'Vietnam Social Security. 3% employer share of the 4.5% total, same 20x reference-level ceiling as social insurance. From 1 Jul 2026.',
      },
      'Unemployment Insurance': {
        rate: 0.01,
        cap: 1190400000,
        capType: 'base',
        note: 'Vietnam Social Security. 1% employer share. This one is capped at 20x the REGIONAL minimum wage, not the reference level — VND 4,960,000/mo in Region I gives a ceiling of VND 99,200,000/mo. Lower in Regions II-IV.',
      },
      'Trade Union Fee': {
        rate: 0.02,
        cap: 607200000,
        capType: 'base',
        note: 'Vietnam General Confederation of Labour. 2% employer contribution to the trade union fund, payable whether or not a union exists at the workplace. Same ceiling as social insurance.',
      },
    },
    leave: { annualDays: 12, sickDays: 30, parentalWeeks: 26 },
    minWage: { amount: 4960000, period: 'mo' },
  },

  Thailand: {
    currency: 'THB',
    symbol: '฿',
    verified: true,
    excludeELI: false,
    employer: {
      'Social Security Fund': {
        rate: 0.05,
        cap: 210000,
        capType: 'base',
        note: 'Social Security Office. 5% employer share. The wage ceiling rose from THB 15,000 to THB 17,500/mo on 1 Jan 2026 under the Ministerial Regulation gazetted 12 Dec 2025 — maximum contribution THB 875/mo. Two further phased increases are legislated; check the ceiling annually.',
      },
      "Workmen's Compensation Fund": {
        rate: 0.002,
        cap: 240000,
        capType: 'base',
        note: 'Workmen\'s Compensation Fund, separate from the SSO. Risk-rated 0.2%-1.0%; 0.2% is the lowest band and the right one for office work. Wage ceiling THB 20,000/mo.',
      },
    },
    leave: { annualDays: 6, sickDays: 30, parentalWeeks: 14 },
    minWage: { amount: 400, period: 'day' },
  },

  'Hong Kong': {
    currency: 'HKD',
    symbol: 'HK$',
    verified: true,
    excludeELI: false,
    employer: {
      'MPF (Mandatory Provident Fund)': {
        rate: 0.05,
        cap: 360000,
        capType: 'base',
        note: 'MPFA. 5% employer contribution, relevant income ceiling HK$30,000/mo — caps at HK$1,500/mo. Note the employer pays 5% even below the HK$7,100/mo floor where the employee is exempt. The MPFA is reviewing a proposal to lift the ceiling to HK$40,000; report due mid-2026.',
      },
    },
    leave: { annualDays: 7, sickDays: 12, parentalWeeks: 14 },
    minWage: { amount: 42.1, period: 'hr' },
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
        cap: 300000,
        capType: 'base',
        note: 'EPFO. 12% of BASIC wages, not gross. Modelled here on basic = 50% of gross, the common Indian structure — adjust baseFactor if your contracts differ. Statutory wage ceiling raised from ₹15,000/mo to ₹25,000/mo (₹300,000/yr) effective 17 Sep 2026 by Gazette Notification S.O. 5109(E) — the first increase since 2014. Maximum employer EPS contribution rose from ₹1,250 to ₹2,083/mo.',
      },
      'EPF Administrative Charges': {
        rate: 0.005,
        baseFactor: 0.5,
        cap: 300000,
        capType: 'base',
        note: 'EPFO. 0.5% of basic wages, on the same ₹25,000/mo ceiling that took effect 17 Sep 2026. Subject to a minimum charge of ₹500/month per ESTABLISHMENT (not per employee), so the per-head cost is effectively the 0.5% shown for any establishment of reasonable size.',
      },
      'EDLI (Deposit Linked Insurance)': {
        rate: 0.005,
        baseFactor: 0.5,
        cap: 300000,
        capType: 'base',
        note: 'EPFO. 0.5% of basic wages, employer-funded, on the same ₹25,000/mo ceiling that took effect 17 Sep 2026. EDLI administrative charges are waived.',
      },
      ESIC: {
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

  'Sri Lanka': {
    currency: 'LKR',
    symbol: 'Rs',
    verified: true,
    excludeELI: false,
    employer: {
      "EPF (Employees' Provident Fund)": {
        rate: 0.12,
        note: 'Department of Labour / Central Bank of Sri Lanka, 2026. 12% employer contribution on total monthly earnings. Unusually for the region there is NO salary ceiling — the rate applies to the whole salary however senior the hire. The employee contributes a further 8%.',
      },
      "ETF (Employees' Trust Fund)": {
        rate: 0.03,
        note: "Employees' Trust Fund Board, 2026. 3% on total monthly earnings, no ceiling. Employer-funded in full — the employee contributes nothing to the ETF.",
      },
      'Gratuity Accrual': {
        rate: 0.041667,
        note: 'Payment of Gratuity Act No. 12 of 1983. Half a month\'s salary per completed year of service, payable once the employee passes five years, and only where the employer has 15 or more staff. 4.17% is the annual accrual convention — booked as an accrual, not a cash cost, until it vests.',
      },
    },
    leave: { annualDays: 14, sickDays: 7, parentalWeeks: 12 },
    minWage: { amount: 30000, period: 'mo' },
  },

  Japan: {
    currency: 'JPY',
    symbol: '¥',
    verified: true,
    excludeELI: false,
    employer: {
      'Employees Pension Insurance': {
        rate: 0.0915,
        cap: 7800000,
        capType: 'base',
        note: 'Japan Pension Service. National flat rate 18.30% split evenly; employer share 9.15%. Standard monthly remuneration capped at ¥650,000 (Grade 32), annualised to ¥7,800,000.',
      },
      'Health Insurance': {
        rate: 0.04925,
        cap: 16680000,
        capType: 'base',
        note: 'Kyokai Kenpo, rates effective March 2026. Tokyo rate fell from 9.91% to 9.85%, split evenly — employer share 4.925%. Rates are set per prefecture and differ again for company health insurance societies. Standard monthly remuneration capped at ¥1,390,000.',
      },
      'Long-term Care Insurance': {
        rate: 0.0081,
        cap: 16680000,
        capType: 'base',
        note: 'Kyokai Kenpo. National rate rose to 1.62% for 2026, split evenly — employer share 0.81%. Applies only to employees aged 40 to 64.',
      },
      'Child & Childcare Support Levy': {
        rate: 0.00115,
        cap: 16680000,
        capType: 'base',
        note: 'New from April 2026. 0.23% collected alongside health insurance premiums and split evenly — employer share 0.115%.',
      },
      'Employment Insurance': {
        rate: 0.0085,
        note: 'Ministry of Health, Labour and Welfare, FY2026 (from April 2026). Employer share for general businesses: 0.5% unemployment plus 0.35% employment-two-business levy. The unemployment portion fell from 0.55% to 0.5% this year.',
      },
      "Workers' Accident Compensation": {
        rate: 0.003,
        note: 'Employer-only and industry-rated from 0.25% to 8.8%. 0.3% is the office-work band.',
      },
    },
    leave: { annualDays: 10, sickDays: 0, parentalWeeks: 58 },
    minWage: { amount: 1177, period: 'hr' },
  },

  'South Korea': {
    currency: 'KRW',
    symbol: '₩',
    verified: true,
    excludeELI: false,
    employer: {
      'National Pension': {
        rate: 0.0475,
        cap: 79080000,
        capType: 'base',
        note: 'National Pension Service. Total rate rose from 9% to 9.5% in 2026, split evenly — employer share 4.75%. This is the first step of a phased increase to 13% by 2033. Standard monthly income ceiling KRW 6,590,000 from July 2026 (was 6,370,000), annualised to KRW 79,080,000.',
      },
      'National Health Insurance': {
        rate: 0.03595,
        note: 'NHIS. Total rate rose to 7.19% for 2026, split evenly — employer share 3.595%. No ceiling.',
      },
      'Long-term Care Insurance': {
        rate: 0.004656,
        note: 'NHIS. Levied at 12.95% of the health insurance contribution rather than directly on salary; 0.4656% is the equivalent effective rate on gross for the employer share.',
      },
      'Employment Insurance': {
        rate: 0.0115,
        note: 'Ministry of Employment and Labor, 2026. Employer share for employers under 150 staff: 0.9% unemployment benefit plus 0.25% employment stability and vocational levy. Larger employers pay up to 1.65%.',
      },
      'Industrial Accident Insurance': {
        rate: 0.007,
        note: 'Employer-only and industry-rated. 0.7% is the office-work band; manufacturing and construction run several times higher.',
      },
    },
    leave: { annualDays: 15, sickDays: 0, parentalWeeks: 52 },
    minWage: { amount: 10320, period: 'hr' },
  },

  Taiwan: {
    currency: 'TWD',
    symbol: 'NT$',
    verified: true,
    excludeELI: false,
    employer: {
      'Labor & Employment Insurance': {
        rate: 0.0805,
        cap: 549600,
        capType: 'base',
        note: 'Bureau of Labor Insurance, 2026. Labor insurance 10.5% plus employment insurance 1% = 11.5%, of which the employer bears 70% — 8.05%. Insured salary ceiling NT$45,800/mo, annualised to NT$549,600. Assessed on a bracket table, not on actual pay.',
      },
      'National Health Insurance': {
        rate: 0.0487,
        cap: 3756000,
        capType: 'base',
        note: 'NHIA, 2026. Rate 5.17%; the employer bears 60% with an average dependant multiplier of 1.57 applied, giving an effective 4.87%. Insured salary ceiling NT$313,000/mo. A separate 2.11% supplementary premium applies to bonuses and irregular income, which is not modelled here.',
      },
      'Labor Pension': {
        rate: 0.06,
        cap: 1800000,
        capType: 'base',
        note: 'Bureau of Labor Funds, 2026. 6% mandatory employer contribution to the employee\'s individual pension account. Monthly wage ceiling NT$150,000, annualised to NT$1,800,000. Each of Taiwan\'s three schemes uses its own bracket table and its own ceiling.',
      },
    },
    leave: { annualDays: 7, sickDays: 30, parentalWeeks: 8 },
    minWage: { amount: 29500, period: 'mo' },
  },

  /* ==========================================================================
   * AMERICAS
   * ======================================================================== */

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

  Mexico: {
    currency: 'MXN',
    symbol: 'MX$',
    verified: true,
    excludeELI: false,
    employer: {
      // IMSS is a stack of separate branches on the salario base de cotización
      // (SBC), capped at 25 UMA. Daily UMA 2026 = MXN 113.14, so one annual UMA
      // is 113.14 x 365 = 41,296.10 and the SBC ceiling is 1,032,402.50.
      'IMSS — Sickness & Maternity (fixed quota)': {
        fixedAnnual: 8423.44,
        note: 'IMSS 2026. 20.40% of the daily UMA per worker per day, regardless of salary — a flat employer charge, not a percentage of pay. Daily UMA 2026 MXN 113.14, so 0.204 x 113.14 x 365 = MXN 8,423.44/yr.',
      },
      'IMSS — Sickness & Maternity (excess over 3 UMA)': {
        rate: 0.011,
        exempt: 123888.3,
        cap: 1032402.5,
        capType: 'base',
        note: 'IMSS 2026. 1.10% employer on the portion of SBC above three UMA (MXN 123,888.30/yr). SBC ceiling 25 UMA.',
      },
      'IMSS — Sickness & Maternity (cash benefits)': {
        rate: 0.007,
        cap: 1032402.5,
        capType: 'base',
        note: 'IMSS 2026. 0.70% employer share (prestaciones en dinero) on SBC, capped at 25 UMA.',
      },
      'IMSS — Medical Expenses for Pensioners': {
        rate: 0.0105,
        cap: 1032402.5,
        capType: 'base',
        note: 'IMSS 2026. 1.05% employer share (gastos médicos pensionados) on SBC, capped at 25 UMA.',
      },
      'IMSS — Disability & Life': {
        rate: 0.0175,
        cap: 1032402.5,
        capType: 'base',
        note: 'IMSS 2026. 1.75% employer share (invalidez y vida) on SBC, capped at 25 UMA.',
      },
      'IMSS — Occupational Risk': {
        rate: 0.0054,
        cap: 1032402.5,
        capType: 'base',
        note: 'IMSS 2026. Risk-class-rated (riesgos de trabajo). 0.54% is the Class I minimum, correct for office work; Class V runs above 7%. Reassessed annually from the employer\'s own claims history.',
      },
      'IMSS — Nurseries & Social Benefits': {
        rate: 0.01,
        cap: 1032402.5,
        capType: 'base',
        note: 'IMSS 2026. 1.00% employer share (guarderías y prestaciones sociales) on SBC, capped at 25 UMA.',
      },
      'IMSS — Retirement (SAR)': {
        rate: 0.02,
        cap: 1032402.5,
        capType: 'base',
        note: 'IMSS 2026. 2.00% employer contribution to the retirement sub-account, capped at 25 UMA.',
      },
      'IMSS — Severance & Old Age (CEAV)': {
        tiers: [
          { upTo: 41296.1, rate: 0.0315 },
          { upTo: 61944.15, rate: 0.03676 },
          { upTo: 82592.2, rate: 0.04851 },
          { upTo: 103240.25, rate: 0.05556 },
          { upTo: 123888.3, rate: 0.06026 },
          { upTo: 144536.35, rate: 0.06361 },
          { upTo: 165184.4, rate: 0.06613 },
          { upTo: Infinity, rate: 0.07513 },
        ],
        tierMode: 'whole',
        note: 'IMSS 2026 (cesantía en edad avanzada y vejez). The band containing the SBC sets one rate applied to the whole SBC, so this is banded not marginal. Bands run 1.00 UMA at 3.150% up to 4.01+ UMA at 7.513%. Still stepping up annually under the Dec 2020 pension reform until 2030. Workers on exactly one minimum wage pay the 3.150% floor rate.',
      },
      'INFONAVIT (Housing)': {
        rate: 0.05,
        cap: 1032402.5,
        capType: 'base',
        note: 'INFONAVIT 2026. 5% employer contribution to the housing fund on SBC, capped at 25 UMA.',
      },
      'State Payroll Tax': {
        rate: 0.03,
        note: 'State-varying, roughly 1% to 4%. 3% is the Mexico City rate. Levied by the state, not IMSS, and uncapped.',
      },
      'Aguinaldo (13th month)': {
        rate: 0.041667,
        note: 'Federal Labour Law. Statutory minimum 15 days\' pay per year. Assumes the salary entered represents 12 monthly payments.',
      },
    },
    leave: { annualDays: 12, sickDays: 0, parentalWeeks: 12 },
    minWage: { amount: 315.04, period: 'day' },
  },

  Brazil: {
    currency: 'BRL',
    symbol: 'R$',
    verified: true,
    excludeELI: false,
    employer: {
      'INSS Patronal': {
        rate: 0.2,
        note: 'Receita Federal, 2026. 20% employer contribution on total payroll for companies under Lucro Presumido or Lucro Real. No employer-side ceiling — the ceiling applies only to the employee contribution.',
      },
      'RAT (Work Accident)': {
        rate: 0.02,
        note: '1%, 2% or 3% by CNAE activity code, then multiplied by the FAP accident-prevention factor (0.5 to 2.0) based on the employer\'s own claims history. 2% shown is the mid grade before FAP. 2026.',
      },
      'Sistema S & Third-party Levies': {
        rate: 0.058,
        note: 'Receita Federal, 2026. Combined terceiros for commerce and services: salário-educação 2.5%, SESI/SESC 1.5%, SENAI/SENAC 1.0%, SEBRAE 0.6%, INCRA 0.2%.',
      },
      FGTS: {
        rate: 0.08,
        note: 'Caixa Econômica Federal, 2026. 8% employer deposit to the employee\'s severance fund account, paid monthly.',
      },
      '13th Salary': {
        rate: 0.083333,
        note: 'Mandatory 13th salary (gratificação natalina), paid in two instalments. Assumes the salary entered represents 12 monthly payments.',
      },
      'Vacation Bonus (1/3)': {
        rate: 0.027778,
        note: 'Constitutional one-third vacation premium payable on the 30 days\' statutory leave.',
      },
      'Meal & Food Allowance': {
        fixedMonthly: 600,
        note: 'Not federally mandatory but required by most collective bargaining agreements. R$600/mo is an indicative benchmark only — replace it with the figure from the CBA that applies to the role.',
      },
    },
    leave: { annualDays: 30, sickDays: 15, parentalWeeks: 17 },
    minWage: { amount: 1621, period: 'mo' },
  },

  Chile: {
    currency: 'CLP',
    symbol: 'CLP$',
    verified: true,
    excludeELI: false,
    employer: {
      // Chilean ceilings are set in UF, which is inflation-indexed daily. The
      // CLP figures below assume UF = CLP 40,300 and need reconverting
      // periodically — see the notes.
      'Unemployment Insurance (AFC)': {
        rate: 0.024,
        cap: 65334360,
        capType: 'base',
        note: 'Superintendencia de Pensiones, 2026. 2.4% employer share for indefinite contracts (3.0% for fixed-term). Ceiling 135.1 UF/mo from January 2026 remuneration, shown here converted at UF = CLP 40,300. Reconvert when the UF moves materially.',
      },
      'Employer Pension Contribution (reform)': {
        rate: 0.035,
        cap: 43475640,
        capType: 'base',
        note: 'Pension reform, at 3.5% from August 2026. This figure already includes the 2.5% Social Insurance component that funds the SIS and life-expectancy compensation, so there is no separate SIS line. Still phasing up toward 8.5%. Ceiling 89.9 UF/mo, converted at UF = CLP 40,300.',
      },
      'Work Accident Insurance (Mutual)': {
        rate: 0.0093,
        cap: 43475640,
        capType: 'base',
        note: 'Ley 16.744. 0.90% basic rate plus a 0.03% extraordinary levy; an activity-based surcharge of up to 3.4% applies to higher-risk work. Same 89.9 UF/mo ceiling.',
      },
    },
    leave: { annualDays: 15, sickDays: 0, parentalWeeks: 30 },
    minWage: { amount: 529000, period: 'mo' },
  },

  Colombia: {
    currency: 'COP',
    symbol: 'COL$',
    verified: true,
    excludeELI: false,
    employer: {
      // SMMLV 2026 = COP 1,750,905/mo. IBC ceiling 25 SMMLV = 525,271,500/yr.
      // The Ley 1607 exemption threshold of 10 SMMLV = 210,108,600/yr.
      'Health (EPS)': {
        rate: 0.085,
        appliesFrom: 210108600,
        cap: 525271500,
        capType: 'base',
        note: 'Ministerio de Salud, 2026. 8.5% employer share of the 12.5% total. Exempt under Ley 1607 of 2012 for employees earning under 10 SMMLV (COP 17,509,050/mo) where the employer is a legal entity — so this line correctly shows zero below that.',
      },
      Pension: {
        rate: 0.12,
        cap: 525271500,
        capType: 'base',
        note: 'Colpensiones, 2026. 12% employer share of the 16% total. IBC ceiling 25 SMMLV (COP 43,772,625/mo). No exemption — payable at all salary levels.',
      },
      'Work Risk Insurance (ARL)': {
        rate: 0.00522,
        cap: 525271500,
        capType: 'base',
        note: '2026. Risk-class-rated from 0.522% (Class I, office work) to 6.960% (Class V). Employer-funded in full.',
      },
      'Caja de Compensación Familiar': {
        rate: 0.04,
        cap: 525271500,
        capType: 'base',
        note: '2026. 4% employer contribution to the family compensation fund. Unlike SENA and ICBF this is payable at all salary levels.',
      },
      'SENA & ICBF': {
        rate: 0.05,
        appliesFrom: 210108600,
        cap: 525271500,
        capType: 'base',
        note: '2026. SENA 2% plus ICBF 3%. Exempt under Ley 1607 of 2012 for employees under 10 SMMLV where the employer is a legal entity, on the same basis as employer health.',
      },
      'Severance (Cesantías) & Interest': {
        rate: 0.091667,
        note: 'One month\'s salary per year of service (8.333%) plus 12% annual interest on the accrued balance (1%).',
      },
      'Prima de Servicios': {
        rate: 0.083333,
        note: 'Mandatory 13th month equivalent, paid in two instalments in June and December. Assumes the salary entered represents 12 monthly payments.',
      },
    },
    leave: { annualDays: 15, sickDays: 0, parentalWeeks: 18 },
    minWage: { amount: 1750905, period: 'mo' },
  },

  Argentina: {
    currency: 'ARS',
    symbol: 'AR$',
    verified: true,
    excludeELI: false,
    employer: {
      'Social Security Contributions': {
        rate: 0.204,
        note: 'Decreto 814/2001 as amended, 2026. 20.4% combined employer contribution to SIPA, PAMI, family allowances and the National Employment Fund, for services and commerce employers above the MiPyME sales threshold. Employers holding a valid MiPyME certificate pay 18%. No ceiling on employer contributions.',
      },
      'Health Insurance (Obra Social)': {
        rate: 0.06,
        note: '2026. 6% employer share to the union health fund. No ceiling.',
      },
      'Work Risk Insurance (ART)': {
        rate: 0.015,
        note: 'Negotiated per employer and industry. Roughly 1% to 1.5% for office work, 3% to 5% for industry and up to 8% for construction.',
      },
      'Aguinaldo (SAC)': {
        rate: 0.083333,
        note: 'Mandatory 13th month (sueldo anual complementario), paid in two instalments in June and December. Assumes the salary entered represents 12 monthly payments.',
      },
    },
    leave: { annualDays: 14, sickDays: 90, parentalWeeks: 13 },
    minWage: { amount: 322000, period: 'mo' },
  },

  /* ==========================================================================
   * EUROPE, MIDDLE EAST & AFRICA
   * ======================================================================== */

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
          { upTo: 28704, rate: 0.0915 },
          { upTo: Infinity, rate: 0.114 },
        ],
        tierMode: 'whole',
        note: 'Revenue.ie. From 1 Oct 2026: 9.15% on weekly earnings up to €552, 11.40% above €552 (up from 9.00% / 11.25%). The higher rate applies to ALL earnings, not just the excess, which is why this is a banded rather than marginal rate. Threshold annualised as €552 x 52 = €28,704; the threshold itself rose from €527 to €552 on 1 Jan 2026 and is unchanged by the October rate rise.',
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
      APEC: {
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

  Netherlands: {
    currency: 'EUR',
    symbol: '€',
    verified: true,
    excludeELI: false,
    employer: {
      'AWf (Unemployment, low rate)': {
        rate: 0.0274,
        cap: 79409,
        capType: 'base',
        note: 'Definitive 2026 premium percentages. 2.74% low rate, which requires a written indefinite contract with no on-call clause. The high rate for flexible contracts is 7.74% — five points more. Maximum premium wage €79,409.',
      },
      'Aof (Disability)': {
        rate: 0.0763,
        cap: 79409,
        capType: 'base',
        note: 'Definitive 2026 premium percentages. 7.63% high rate for large employers; small employers pay the reduced 6.27% rate. Maximum premium wage €79,409.',
      },
      'Zvw (Health Insurance Act)': {
        rate: 0.061,
        cap: 79409,
        capType: 'base',
        note: 'Definitive 2026 premium percentages. Employer levy fell 0.41 points to 6.10% for 2026. Maximum premium wage €79,409.',
      },
      'Whk (Return to Work Fund)': {
        rate: 0.0152,
        cap: 79409,
        capType: 'base',
        note: '2026 averages: WGA 0.96% (up from 0.83%) plus ZW-flex 0.56% (up from 0.50%). Differentiated per employer based on claims history, so your actual rate will differ.',
      },
      'Childcare Surcharge': {
        rate: 0.005,
        cap: 79409,
        capType: 'base',
        note: '2026. 0.50% surcharge on the premium wage.',
      },
      'Holiday Allowance': {
        rate: 0.08,
        note: 'Statutory 8% holiday allowance (vakantiegeld), normally paid in May. Assumes the salary entered excludes it.',
      },
    },
    leave: { annualDays: 20, sickDays: 104, parentalWeeks: 16 },
    minWage: { amount: 14.71, period: 'hr' },
  },

  Spain: {
    currency: 'EUR',
    symbol: '€',
    verified: true,
    excludeELI: false,
    employer: {
      // Orden PJC/297/2026 (BOE 31 Mar 2026). Base máxima €5,101.20/mo =
      // €61,214.40/yr, applied to every capped line below.
      'Social Security (Common Contingencies)': {
        rate: 0.236,
        cap: 61214.4,
        capType: 'base',
        note: 'Orden PJC/297/2026. 23.60% employer share of the 28.30% total. Maximum contribution base €5,101.20/mo (€61,214.40/yr) from 1 Jan 2026.',
      },
      Unemployment: {
        rate: 0.055,
        cap: 61214.4,
        capType: 'base',
        note: 'Orden PJC/297/2026. 5.50% employer share for indefinite contracts (7.05% total). Fixed-term contracts attract 6.70% employer.',
      },
      FOGASA: {
        rate: 0.002,
        cap: 61214.4,
        capType: 'base',
        note: 'Orden PJC/297/2026. 0.20% wage guarantee fund, employer-only.',
      },
      'Professional Training': {
        rate: 0.006,
        cap: 61214.4,
        capType: 'base',
        note: 'Orden PJC/297/2026. 0.60% employer share of the 0.70% total.',
      },
      'MEI (Intergenerational Equity Mechanism)': {
        rate: 0.0075,
        cap: 61214.4,
        capType: 'base',
        note: 'Orden PJC/297/2026. MEI rose to 0.90% for 2026 — 0.75% employer, 0.15% employee. Steps up annually to 2029.',
      },
      'Work Accident (AT/EP)': {
        rate: 0.015,
        cap: 61214.4,
        capType: 'base',
        note: 'Orden PJC/297/2026. Activity-rated; 1.50% is the office-work band.',
      },
      'Solidarity Contribution (high earners)': {
        rate: 0.0096,
        exempt: 61214.4,
        note: 'Orden PJC/297/2026. Additional levy on the portion of salary ABOVE the maximum contribution base, at 1.15% rising to 1.46% across higher excess bands. 0.96% shown is the employer\'s 83.39% share of the 1.15% first band. Zero for salaries at or below €61,214.40.',
      },
    },
    leave: { annualDays: 22, sickDays: 0, parentalWeeks: 16 },
    minWage: { amount: 1381, period: 'mo' },
  },

  Portugal: {
    currency: 'EUR',
    symbol: '€',
    verified: true,
    excludeELI: false,
    employer: {
      'Social Security (Segurança Social)': {
        rate: 0.2375,
        note: 'Taxa Social Única, 2026. 23.75% employer share of the 34.75% global rate. No ceiling. Non-profit employers pay 22.30%.',
      },
      'Labour Compensation Fund (FCT/FGCT)': {
        rate: 0.01,
        note: '2026. 1% employer contribution to the labour compensation funds, which part-fund statutory severance.',
      },
      'Work Accident Insurance': {
        rate: 0.0125,
        note: 'Mandatory private cover. Roughly 1% to 2% depending on occupational risk; 1.25% is the office-work band.',
      },
      '13th & 14th Month': {
        rate: 0.166667,
        note: 'Mandatory holiday and Christmas subsidies, each one month\'s pay. Assumes the salary entered represents 12 monthly payments.',
      },
      'Meal Allowance': {
        fixedMonthly: 132,
        note: '€6/working day across 22 days, the common tax-exempt meal card rate. Not statutory for all employers but near-universal in practice.',
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
        cap: 122295,
        capType: 'base',
        note: 'UNVERIFIED — needs review. This is the one country in the file I could not pin to a single authoritative rate. INPS publishes employer contributions per sector, company size and employee category rather than as one headline figure; credible sources put the commercial-sector employer burden anywhere between 29% and 32%. 29.81% is a commonly quoted commercio figure. The €122,295 ceiling is the 2026 massimale contributivo for employees first registered from 1 Jan 1996 — those with pre-1996 seniority face a €93,707 ceiling instead, and the ceiling applies only to the IVS pension component, not the whole contribution. Get this confirmed by an Italian payroll provider before client use.',
      },
      'INAIL (Work Accident)': {
        rate: 0.004,
        note: 'UNVERIFIED — needs review. INAIL rates run 4‰ to 100‰ by occupational risk. 4‰ (0.4%) is the administrative-employee band; commercial workers sit around 8‰.',
      },
      'TFR (Severance Accrual)': {
        rate: 0.069,
        note: 'UNVERIFIED — needs review. Trattamento di Fine Rapporto accrues at 1/13.5 of annual pay (roughly 7.41%) less a 0.50% INPS transfer.',
      },
      '13th & 14th Month': {
        rate: 0.166667,
        note: 'UNVERIFIED — needs review. The 13th month is universal; the 14th depends on the applicable CCNL, so this line may overstate by half. Assumes the salary entered represents 12 monthly payments.',
      },
    },
    leave: { annualDays: 20, sickDays: 180, parentalWeeks: 21 },
    minWage: { amount: 0, period: 'mo' },
  },

  Poland: {
    currency: 'PLN',
    symbol: 'zł',
    verified: true,
    excludeELI: false,
    employer: {
      'Pension (Emerytalne)': {
        rate: 0.0976,
        cap: 282600,
        capType: 'base',
        note: 'ZUS, 2026. 9.76% employer share of the 19.52% total. Capped by the 30-krotność annual limit, PLN 282,600 for 2026 (up from PLN 260,190).',
      },
      'Disability (Rentowe)': {
        rate: 0.065,
        cap: 282600,
        capType: 'base',
        note: 'ZUS, 2026. 6.50% employer share of the 8.00% total. Same PLN 282,600 annual cap.',
      },
      'Accident (Wypadkowe)': {
        rate: 0.0167,
        note: 'ZUS, 2026. Employer-only, risk-rated 0.67% to 3.33%. 1.67% is the default rate for most employers. Uncapped.',
      },
      'Labour Fund & FGŚP': {
        rate: 0.0255,
        note: 'ZUS, 2026. Labour Fund 2.45% plus Guaranteed Employee Benefits Fund 0.10%. Employer-only, uncapped.',
      },
      'PPK (Employee Capital Plans)': {
        rate: 0.015,
        note: '2026. 1.5% minimum employer contribution to the auto-enrolment capital plan. Employees may opt out, in which case this falls away.',
      },
    },
    leave: { annualDays: 20, sickDays: 33, parentalWeeks: 20 },
    minWage: { amount: 4806, period: 'mo' },
  },

  Sweden: {
    currency: 'SEK',
    symbol: 'kr',
    verified: true,
    excludeELI: false,
    employer: {
      'Employer Social Fees (Arbetsgivaravgifter)': {
        rate: 0.3142,
        note: 'Skatteverket, 2026. 31.42% statutory employer contribution, unchanged since 2009 and uncapped. A reduced 20.81% rate applies to employees aged 18-23 on wages up to SEK 25,000/mo from 1 Apr 2026.',
      },
      'Occupational Pension (ITP1)': {
        tiers: [
          { upTo: 616500, rate: 0.045 },
          { upTo: Infinity, rate: 0.3 },
        ],
        tierMode: 'marginal',
        note: 'Not statutory but required by most collective agreements. 4.5% up to 7.5 income base amounts (roughly SEK 616,500/yr for 2026) and 30% above — genuinely marginal, and the 30% band makes senior hires far more expensive than the headline suggests. Delete this line if no collective agreement applies.',
      },
    },
    leave: { annualDays: 25, sickDays: 14, parentalWeeks: 68 },
    minWage: { amount: 0, period: 'mo' },
  },

  'United Arab Emirates': {
    currency: 'AED',
    symbol: 'AED',
    verified: true,
    excludeELI: false,
    employer: {
      'GPSSA Pension (Emirati nationals only)': {
        rate: 0.15,
        cap: 840000,
        capType: 'base',
        note: 'GPSSA under the 2023 pension law. 15% employer contribution for Emirati nationals in the private sector, of a 26% total. Contribution salary cap AED 70,000/mo (raised from AED 50,000 under the 1999 law), annualised to AED 840,000. The government pays 2.5 points of the employer share where pensionable salary is under AED 20,000/mo. EXPATRIATE EMPLOYEES ATTRACT NO PENSION CONTRIBUTION — zero this line for expat hires, which is most EOR placements.',
      },
      'End of Service Gratuity': {
        rate: 0.0583,
        note: 'UAE Labour Law. 21 days\' basic pay per year for the first five years, 30 days thereafter. 5.83% is the annual accrual convention and assumes basic pay equals the figure entered; where basic is a fraction of total pay the real cost is lower.',
      },
      'Medical Insurance': {
        fixedMonthly: 300,
        note: 'Mandatory employer-provided cover in Dubai and Abu Dhabi. AED 300/mo is an indicative basic-plan benchmark only — premiums vary widely by emirate, plan and employee age.',
      },
    },
    leave: { annualDays: 30, sickDays: 90, parentalWeeks: 8 },
    minWage: { amount: 0, period: 'mo' },
  },

  'Saudi Arabia': {
    currency: 'SAR',
    symbol: 'SAR',
    verified: true,
    excludeELI: false,
    employer: {
      'GOSI (Saudi nationals)': {
        rate: 0.1175,
        cap: 540000,
        capType: 'base',
        note: 'GOSI, 2026. For Saudi nationals registered before 3 Jul 2024: 9% pension plus 2% occupational hazards plus 0.75% SANED unemployment = 11.75% employer. Those registered after that date move to 12.75% employer from July 2026 under the phased reform. Wage ceiling SAR 45,000/mo (SAR 540,000/yr).',
      },
      'GOSI (expatriates)': {
        rate: 0.02,
        cap: 540000,
        capType: 'base',
        note: 'GOSI, 2026. Expatriate employees attract only the 2% occupational hazards branch — no pension, no unemployment. If the hire is an expat, zero out the Saudi-nationals line above and keep this one. They are mutually exclusive.',
      },
      'End of Service Award': {
        rate: 0.0556,
        note: 'Saudi Labour Law. Half a month\'s pay per year for the first five years, one month thereafter. 5.56% is the annual accrual convention.',
      },
    },
    leave: { annualDays: 21, sickDays: 120, parentalWeeks: 12 },
    minWage: { amount: 4000, period: 'mo' },
  },

  'South Africa': {
    currency: 'ZAR',
    symbol: 'R',
    verified: true,
    excludeELI: false,
    employer: {
      'UIF (Unemployment Insurance Fund)': {
        rate: 0.01,
        cap: 212544,
        capType: 'base',
        note: 'Department of Employment and Labour, 2026. 1% employer contribution matching the 1% employee deduction. Remuneration ceiling R17,712/mo (R212,544/yr), so the employer contribution caps at R177.12/mo.',
      },
      'SDL (Skills Development Levy)': {
        rate: 0.01,
        note: 'SARS, 2026. 1% of total payroll, payable only where the employer\'s annual payroll exceeds R500,000. Uncapped per employee.',
      },
      'COIDA (Compensation Fund)': {
        rate: 0.0104,
        cap: 668000,
        capType: 'base',
        note: 'Compensation Fund. Industry-rated; 1.04% is a mid-band figure for office work. Annual earnings ceiling raised to R668,000 per employee from 1 Mar 2026.',
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
