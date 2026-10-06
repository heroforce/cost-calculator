# Verification status

As at 6 October 2026.

**33 of 34 countries verified** against the national revenue or social security
authority. Every line carries the authority and effective date in its note.

**Italy is the one exception** and still shows the amber banner. See below.

The calculation engine is checked against 44 authority-published maximums —
Canada's $4,230.45 CPP and $1,572.30 EI, the Philippines' ₱42,360, Thailand's
฿875/mo, Hong Kong's HK$1,500/mo, South Africa's R177.12/mo, and so on. All 44
match exactly. Run them with:

```bash
npm run check-rates
```

Add a case there whenever you change a capped or tiered rate — it is the only
thing standing between a typo and a wrong number in front of a client.

---

## Changes since the July pass

Two diarised items came due and have been applied, one country added.

| Country | Change | Effective |
|---|---|---|
| **India** | EPF wage ceiling **₹15,000 → ₹25,000/mo**, per Gazette Notification S.O. 5109(E). First increase since 2014. Applied to EPF, admin charges and EDLI — the annual cap moves from ₹180,000 to ₹300,000, so all three lines rise by up to 67%. Max employer EPS contribution ₹1,250 → ₹2,083/mo. | 17 Sep 2026 |
| **Ireland** | Employer PRSI Class A **9.00% → 9.15%** and **11.25% → 11.40%**. The €552/week threshold is unchanged. | 1 Oct 2026 |
| **Japan** | Minimum wage (display field only) ¥1,121 → **¥1,177/hr** national weighted average. Prefectural rates phase in between 1 Oct and 2 Dec 2026. | Oct 2026 |
| **Sri Lanka** | Added. See below. | — |

India is the one that matters commercially — it is a material cost increase on
every Indian placement, not a rounding adjustment.

---

## Verified (33)

### Asia Pacific

| Country | Source | Key figures |
|---|---|---|
| Australia | ATO; Fair Work Commission | SG 12%, MCB A$270,830 |
| New Zealand | Inland Revenue; ACC / MBIE | KiwiSaver 3.5%, ACC 0.69% |
| Philippines | SSS Circular 2024-006; PhilHealth; Pag-IBIG | All three caps confirmed |
| Singapore | CPF Board; SkillsFuture SG | CPF 17%, OW ceiling S$8,000/mo |
| Malaysia | KWSP; PERKESO; HRD Corp | EPF banded 13% / 12% |
| Indonesia | BPJS Kesehatan; BPJS Ketenagakerjaan | JP ceiling now Rp 11,086,300/mo |
| Vietnam | Vietnam Social Security | Ceiling ₫50,600,000/mo from 1 Jul 2026 |
| Thailand | Social Security Office | Ceiling ฿17,500/mo from 1 Jan 2026 |
| Hong Kong | MPFA | 5%, HK$30,000/mo ceiling |
| India | EPFO Gazette S.O. 5109(E); ESIC | Ceiling ₹25,000/mo from 17 Sep 2026; basic = 50% of gross assumption |
| Sri Lanka | Dept of Labour; ETF Board; Gratuity Act 1983 | EPF 12% + ETF 3%, both **uncapped** |
| Japan | Japan Pension Service; Kyokai Kenpo; MHLW | New childcare levy from Apr 2026 |
| South Korea | NPS; NHIS; MOEL | Pension rose to 9.5% total |
| Taiwan | Bureau of Labor Insurance; NHIA | Three separate ceilings |

### Americas

| Country | Source | Key figures |
|---|---|---|
| United States | SSA; IRS | Wage base $184,500 |
| Canada | CRA; CEIC | CPP, CPP2 and EI maximums match to the cent |
| Mexico | IMSS 2026 tables; INFONAVIT | Rebuilt — see below |
| Brazil | Receita Federal; Caixa | INSS 20%, FGTS 8%, terceiros 5.8% |
| Chile | Superintendencia de Pensiones | Restructured — see below |
| Colombia | MinSalud; Colpensiones; Ley 1607 | Exemption threshold modelled |
| Argentina | Decreto 814/2001 as amended | 20.4% (18% for MiPyME) |

### Europe, Middle East & Africa

| Country | Source | Key figures |
|---|---|---|
| United Kingdom | HMRC; The Pensions Regulator | NIC 15% over £5,000 |
| Ireland | Revenue.ie; My Future Fund rules | PRSI banded 9.15% / 11.40% from 1 Oct 2026 |
| Germany | Deutsche Rentenversicherung; GKV; BA | Ceilings €69,750 / €101,400 |
| France | URSSAF; AGIRC-ARRCO; AGS | PASS 2026 €48,060 |
| Netherlands | Definitive 2026 premium percentages | Max premium wage €79,409 |
| Spain | Orden PJC/297/2026 (BOE 31 Mar 2026) | Base máxima €5,101.20/mo |
| Portugal | Taxa Social Única | 23.75% employer |
| Poland | ZUS | 30-krotność cap PLN 282,600 |
| Sweden | Skatteverket; ITP1 | 31.42%, uncapped |
| UAE | GPSSA 2023 pension law | 15%, AED 70,000/mo cap |
| Saudi Arabia | GOSI | 11.75% national / 2% expat |
| South Africa | DEL; SARS; Compensation Fund | COIDA ceiling R668,000 |

---

## The one still flagged

### Italy

I could not pin Italy to a single authoritative employer rate, so it keeps
`verified: false` and the amber banner.

The problem is structural, not effort: INPS publishes employer contributions per
sector, company size and employee category rather than as one headline figure.
Credible sources put the commercial-sector employer burden anywhere between 29%
and 32%, which on a €120,000 salary is a spread of about €3,600. The 29.81% in
the file is a commonly quoted *commercio* figure, not something I could confirm.

Two further Italy-specific complications are noted in the data:

- The **massimale contributivo** is €122,295 for employees first registered from
  1 Jan 1996, but €93,707 for those with pre-1996 seniority — and it applies
  only to the IVS pension component, not the whole contribution. The file
  applies the higher ceiling to the entire INPS line, which is a simplification.
- The **14th month** depends on the applicable CCNL. The file assumes both 13th
  and 14th are payable, so it may overstate by half a month.

Worth ten minutes with an Italian payroll provider. Once you have a rate for the
CCNL you actually use, update the line and flip `verified` to `true`.

---

## Sri Lanka — added 6 Oct 2026

Three employer lines, and the structure is unusually simple for the region:

| Line | Rate | Ceiling |
|---|---|---|
| EPF (Employees' Provident Fund) | 12% | **None** |
| ETF (Employees' Trust Fund) | 3% | **None** |
| Gratuity accrual | 4.17% | None |

The thing to watch is that **neither EPF nor ETF has a salary ceiling**. Almost
every other APAC country in this file caps out — Singapore at S$8,000/mo, Hong
Kong at HK$30,000/mo, India now at ₹25,000/mo. Sri Lanka does not, so the 15%
combined employer burden applies to the whole salary no matter how senior the
hire. A high earner costs proportionally far more than the regional pattern
would lead you to expect.

Gratuity is payable at half a month per completed year, but only after five
years' service and only where the employer has 15 or more staff. It is booked
here as an accrual, not a cash cost.

**One caveat worth knowing.** Unlike the other countries in this file, Sri Lanka
has no Remote People or Horizons simulation behind it — your Downloads folder
has been cleared since the July pass and the Sri Lanka PDF is gone. The rates
come from the Department of Labour, the ETF Board and the Gratuity Act, and were
consistent across several independent sources, but there is no EOR provider
breakdown to cross-check them against. If you still have that simulation
somewhere, worth a five-minute reconciliation.

LKR was also added to `FRANKFURTER_GAPS` in `src/lib/fx.js` — the ECB does not
publish a rupee rate, so FX skips straight to the fallback provider.

---

## Rebuilt this pass

### Mexico — IMSS modelled branch by branch

Previously a single blended 20% line. Now eleven lines matching the actual
structure, all on the salario base de cotización capped at 25 UMA (daily UMA
2026 = MXN 113.14, so the annual ceiling is MXN 1,032,402.50):

| Branch | Employer rate |
|---|---|
| Sickness & maternity, fixed quota | 20.40% of daily UMA — a **flat** MXN 8,423.44/yr, not a percentage of pay |
| Sickness & maternity, excess over 3 UMA | 1.10% above MXN 123,888.30 |
| Sickness & maternity, cash benefits | 0.70% |
| Medical expenses for pensioners | 1.05% |
| Disability & life | 1.75% |
| Occupational risk | 0.54% (Class I) |
| Nurseries & social benefits | 1.00% |
| Retirement (SAR) | 2.00% |
| Severance & old age (CEAV) | 3.150% → 7.513%, banded by UMA |
| INFONAVIT | 5.00% |
| State payroll tax | 3.00% (CDMX) |

CEAV is a **whole-band** rate — the band containing the SBC sets one rate applied
to the entire SBC. It is still stepping up annually under the December 2020
pension reform until 2030, so it needs an annual check.

### Chile — SIS folded into the reform contribution

The old file had a separate 1.88% SIS line plus a 1% placeholder for the pension
reform. That double-counted. From August 2026 the employer contribution is
**3.5%, and that figure already includes the 2.5% Social Insurance component**
that funds the SIS. There is now one line, not two.

### Colombia — the Ley 1607 exemption is now modelled

Employer health (8.5%), SENA (2%) and ICBF (3%) are **exempt** for employees
earning under 10 SMMLV where the employer is a legal entity. On COP 1,750,905
SMMLV that threshold is COP 17,509,050/mo. Those lines now correctly show zero
below it — a 13.5-point swing that the previous flat model got wrong at the
lower end.

This needed a new engine field, `appliesFrom`, the mirror of `appliesUpTo`.

---

## Where sources conflict — still open

These are points where your brief, the reference PDFs and the primary sources
disagree. I used the primary source in each case.

### 1. Canada CPP and EI caps

Your brief: *"CPP 5.95% capped at C$5,708.33 contribution; EI 2.282% capped at
C$5,291.67 contribution."*

Those are **monthly base caps**, not contribution caps — from the Remote People
PDF's monthly column. 5,708.33 × 12 = $68,500 (2025 max contributory earnings);
5,291.67 × 12 = $63,500 (2025 max insurable earnings). Read as annual
contribution caps they overstate CPP by about 35% and EI by roughly 3.4x.

CRA 2026, which is what the file uses:

| | Rate | Base cap | Max employer contribution |
|---|---|---|---|
| CPP | 5.95% | YMPE $74,600 less $3,500 exemption | **$4,230.45** |
| CPP2 | 4.00% | $74,600 → YAMPE $85,000 | **$416.00** |
| EI | 2.282% | MIE $68,900 | **$1,572.30** |

CPP2 was absent from your brief and from the Remote People PDF entirely.

### 2. Australia — both figures moved

Maximum contribution base is **A$270,830/yr for 2026-27**, not A$250,000, and it
changed from a quarterly to an annual basis on 1 Jul 2026 under Payday Super.
Minimum wage is **A$26.44/hr from 1 Jul 2026**, not A$24.95. SG 12% confirmed.

### 3. Ireland PRSI — rate and threshold both differ

2026 actuals: **9.00%** on weekly earnings up to **€552**, **11.25%** above, both
rising on **1 Oct 2026** to 9.15% / 11.40%. 11.15% was the 2025 rate. The
€1,764/mo threshold in the Remote People PDF does not reconcile with the
€552/week (≈€2,392/mo) statutory threshold — worth asking them.

The higher rate applies to **all** earnings once the threshold is crossed, so
it's banded, not marginal.

"Employer MFF" is **My Future Fund**, Ireland's auto-enrolment pension, live
since 1 Jan 2026. Capped at €80,000 and rising 1.5 points every three years to
6% by 2035.

### 4. New Zealand ACC work levy

Your brief says ~0.63%. The **2026/27 average is 0.69%**. 0.63% was 2025/26.

### 5. France unemployment insurance

Remote People (2 Jun 2026) shows **4.1%**; URSSAF publishes **4.05%**. I used
URSSAF. Also **FNAL**: the file uses 0.10% capped at one PASS, which is the rate
for employers under 50 staff. A French entity with 50+ employees pays **0.50% on
total earnings, uncapped** — materially more. Confirm which applies.

### 6. India PF admin fee is not a flat amount

Your brief describes it as INR 150/mo flat. It is **0.5% of basic wages**,
subject to a ₹500/month minimum **per establishment**, not per employee. The
₹150 in the Horizons PDF is simply 0.5% of a ₹30,000 base.

India's bigger caveat: EPF is levied on *basic wages*, not gross. The file
assumes **basic = 50% of gross** via `baseFactor: 0.5`. If your contracts differ,
that one number changes every India figure.

### 7. Errors in the US reference PDF

The Remote People US simulation (18 Jun 2026) capped OASDI at $13,350/mo — the
**2023** wage base, against $184,500 for 2026 — and applied FUTA at 0.6% to full
gross with no cap. Both corrected.

---

## Modelling assumptions worth knowing

- **13th / 14th month pay is a cost line** for the Philippines, Indonesia,
  Mexico, Brazil, Colombia, Argentina, Portugal and Italy, assuming the salary
  you enter is **12 monthly payments**. If your annual figure already includes
  it, those lines double-count.
- **Severance accruals** (India gratuity, Brazil FGTS, Italy TFR, UAE and Saudi
  end-of-service) are annual accruals, not cash costs, until they vest.
- **UAE and Saudi default to national rates.** Expatriate hires — most EOR
  placements in both — attract far less: nothing in the UAE, 2% in Saudi. Saudi
  has a separate expat line; zero out whichever does not apply.
- **Chile's ceilings are UF-denominated** and the UF is inflation-indexed daily.
  The CLP figures assume **UF = CLP 40,300** and need reconverting periodically.
  The UF value used is stated in each note so the conversion is auditable.
- **Sweden's ITP1 jumps to 30%** above 7.5 income base amounts (≈SEK 616,500).
  Senior Swedish hires cost far more than the 31.42% headline suggests.
- **Employer Liability Insurance** is a flat 1% HeroForce assumption applied
  everywhere except Canada. Not statutory anywhere, and the note says so.

---

## Things to diarise

| When | What |
|---|---|
| Jan 2027 | Spain publishes the new Orden de Cotización — base máxima and MEI both step up |
| 1 Jan 2027 | Ireland My Future Fund year-two position; Singapore CPF announced changes take effect |
| Annually, March | Indonesia JP ceiling reindexed; Japan Kyokai Kenpo rates reset; South Africa COIDA ceiling |
| Annually, April | Japan employment insurance rates reset; NZ KiwiSaver and ACC levies |
| Annually, July | Korea pension income ceiling resets; Australia SG thresholds |
| Annually | Mexico CEAV steps up under the 2020 reform, through 2030 |
| Annually | Chile employer pension contribution phases toward 8.5% |
| Every 3 years | Ireland My Future Fund rises 1.5 points, to 6% by 2035 |
| Watch | Hong Kong MPF ceiling — MPFA reviewing a rise to HK$40,000/mo; report was due mid-2026, not yet acted on |
| Watch | Thailand SSF — two further phased ceiling increases legislated |
| Watch | Chile UF drift — the CLP ceilings assume UF = CLP 40,300 and need reconverting |

Cleared and applied on 6 Oct 2026: Ireland's 1 Oct PRSI rise, and the India EPF
ceiling that had been sitting on this list as a watch item since January.

---

## Minimum wage caveat

Minimum wage is a display field, not part of the cost calculation. It is
reasonably current everywhere but was not verified to the same standard as the
contribution lines, and several countries set it provincially or by sector
(Indonesia, Vietnam, India, Mexico, Canada, US, Japan). Treat those as
indicative.
