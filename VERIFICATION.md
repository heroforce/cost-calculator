# Verification status

As at 31 July 2026.

- **12 countries verified** against the national revenue or social security
  authority. Every line carries the authority and effective date in its note.
- **21 countries need your review.** They are built from secondary sources and
  EOR simulation benchmarks, every note is prefixed `UNVERIFIED`, and the app
  shows an amber banner when one is selected.

---

## Verified (12)

| Country | Checked against | Notes |
|---|---|---|
| Australia | ATO key super rates; Fair Work Commission | SG 12%, MCB A$270,830 |
| New Zealand | Inland Revenue; ACC / MBIE levy consultation | KiwiSaver 3.5%, ACC 0.69% |
| United Kingdom | HMRC; The Pensions Regulator | NIC 15% over £5,000; AE 3% on qualifying earnings |
| Ireland | Revenue.ie; My Future Fund scheme rules | PRSI banded 9.00% / 11.25%; MFF 1.5% |
| Philippines | SSS Circular 2024-006; PhilHealth (RA 11223); Pag-IBIG | All three caps confirmed |
| Singapore | CPF Board; SkillsFuture SG | CPF 17%, OW ceiling S$8,000/mo |
| Malaysia | KWSP; PERKESO; HRD Corp | EPF banded 13% / 12% |
| India | EPFO (Jul 2026 notification); ESIC | Modelled on basic = 50% of gross — see caveat below |
| United States | SSA; IRS | SS wage base $184,500 |
| Canada | CRA; CEIC | CPP, CPP2 and EI maximums match to the cent |
| Germany | Deutsche Rentenversicherung; GKV; Bundesagentur für Arbeit | 2026 ceilings €69,750 / €101,400 |
| France | URSSAF; AGIRC-ARRCO; AGS | PASS 2026 €48,060 |

The calculation engine was checked against 25 authority-published maximums
(Canada's $4,230.45 CPP and $1,572.30 EI, the Philippines' ₱42,360, Singapore's
S$135 SDL, and so on). All 25 match exactly.

---

## Needs your review (21)

Indonesia · Vietnam · Thailand · Hong Kong · Japan · South Korea · Taiwan ·
Mexico · Brazil · Chile · Colombia · Argentina · Netherlands · Spain · Portugal ·
Italy · Poland · Sweden · United Arab Emirates · Saudi Arabia · South Africa

Where a Remote People or Horizons simulation existed in your Downloads I used it
and cited the document date (Indonesia, Vietnam, Mexico, Netherlands, Spain,
Portugal, Italy, Sweden, South Africa, UAE). The rest are from my own knowledge
and are the weakest data in the file.

Three that need more than a spot-check:

- **Mexico** — IMSS is currently a single blended 20% line. The real calculation
  is a stack of separate rates on differing UMA-based bands. It needs proper
  modelling before client use.
- **Chile** — the 2025 pension reform phases in an additional employer
  contribution rising to 8.5%. The 2026 step is a placeholder.
- **Brazil / Colombia** — no simulation PDFs found in Downloads, so these are
  unsupported by any reference document.

---

## Where sources conflict — please decide

These are points where your brief, the reference PDFs, and the primary sources
disagree. I have used the primary source in each case and flagged it here rather
than picking silently.

### 1. Canada CPP and EI caps — the big one

Your brief: *"CPP 5.95% capped at C$5,708.33 contribution; EI 2.282% capped at
C$5,291.67 contribution."*

Those two figures are **monthly base caps**, not contribution caps. They come
from the Remote People simulation, which shows monthly amounts: 5,708.33 × 12 =
$68,500 (2025 max contributory earnings) and 5,291.67 × 12 = $63,500 (2025 max
insurable earnings). Treating them as annual contribution caps would overstate
CPP by about 35% and EI by roughly 3.4x.

CRA 2026 actuals, which is what the file uses:

| | Rate | Base cap | Max employer contribution |
|---|---|---|---|
| CPP | 5.95% | YMPE $74,600 less $3,500 exemption | **$4,230.45** |
| CPP2 | 4.00% | $74,600 → YAMPE $85,000 | **$416.00** |
| EI | 2.282% | MIE $68,900 | **$1,572.30** |

CPP2 was absent from your brief and from the Remote People PDF entirely.

### 2. Australia — both figures have moved since your brief

- Maximum contribution base is **A$270,830/yr for 2026-27**, not A$250,000.
  It also changed from a quarterly to an annual basis on 1 Jul 2026 under Payday
  Super. A$250,000 (A$62,500/quarter) was the 2025-26 figure.
- Minimum wage is **A$26.44/hr from 1 Jul 2026**, not A$24.95 — the FWC awarded
  4.75%.
- SG rate 12% is confirmed unchanged.

### 3. Ireland PRSI — rate and threshold both differ

Your brief: *"PRSI 11.15% above ~EUR 1,764/mo."*

2026 actuals: **9.00%** on weekly earnings up to **€552**, **11.25%** above.
Both rise on **1 Oct 2026** to 9.15% / 11.40%. 11.15% was the 2025 rate. The
€1,764/mo threshold in the Remote People PDF does not reconcile with the €552/week
(≈€2,392/mo) statutory threshold — worth asking them about.

The higher rate applies to **all** earnings once the threshold is crossed, not
just the excess, so this is modelled as a banded rather than marginal rate.

"Employer MFF 1.5%" in the PDF is **My Future Fund**, Ireland's auto-enrolment
pension, live since 1 Jan 2026. Capped at €80,000 of earnings and rising 1.5
points every three years to 6% by 2035. Worth diarising.

### 4. New Zealand ACC work levy

Your brief says ~0.63%. The **2026/27 average is 0.69%** per $100 of liable
earnings. 0.63% was the 2025/26 figure. KiwiSaver 3.5% from 1 Apr 2026 is
confirmed.

### 5. France unemployment insurance

The Remote People simulation dated 2 Jun 2026 shows **4.1%**. URSSAF publishes
**4.05%**. I used 4.05%. A 0.05 point difference, but worth reconciling since
their other France figures match the primary source exactly.

Also note **FNAL**: the file uses 0.10% capped at one PASS, matching the Remote
People simulation, which is the rate for employers under 50 staff. An EOR entity
with 50+ French employees pays **0.50% on total earnings with no ceiling** —
materially more. Confirm which applies.

### 6. India PF admin fee is not a flat amount

Your brief describes it as INR 150/mo flat. It is **0.5% of basic wages**,
subject to a minimum of ₹500/month **per establishment** (not per employee). The
₹150 in the Horizons PDF is simply 0.5% of a ₹30,000 base.

The bigger India caveat: EPF is levied on *basic wages*, not gross. The file
assumes **basic = 50% of gross** via `baseFactor: 0.5`, which is the common
Indian structure but not universal. If your contracts differ, that one number
changes every India figure. A January 2026 Supreme Court direction may also lift
the ₹15,000/mo ceiling to ₹21,000-25,000.

### 7. Errors in the US reference PDF

The Remote People US simulation dated 18 Jun 2026 has two problems, both fixed in
the file:

- OASDI capped at $13,350/mo ($160,200/yr). That is the **2023** wage base; 2026
  is **$184,500**.
- FUTA at 0.6% applied to full gross with no cap. FUTA is capped at the first
  **$7,000** of wages, so the line should be $42/yr, not $720 on a $120k salary.

---

## Modelling assumptions worth knowing

- **13th / 14th month pay is included as a cost line** for the Philippines,
  Indonesia, Mexico, Brazil, Colombia, Argentina, Portugal and Italy, on the
  assumption that the salary you enter represents **12 monthly payments**. If
  your annual figure already bakes in the 13th month, those lines double-count —
  delete them or halve the salary input accordingly.
- **Severance accruals** (India gratuity, Brazil FGTS, Italy TFR, UAE and Saudi
  end-of-service) are booked as annual accruals, not cash costs. They are real
  employer liabilities but do not hit cash until they vest.
- **UAE and Saudi Arabia** default to the **national** contribution rates.
  Expatriate hires — the majority of EOR placements in both — attract far less
  (nothing in the UAE, 2% in Saudi). There is a separate expat line for Saudi;
  zero out whichever does not apply.
- **Employer Liability Insurance** is a flat 1% assumption applied everywhere
  except Canada. It is not a statutory charge anywhere and the note says so.

---

## Suggested next pass

In rough order of business value: Indonesia, Vietnam, Netherlands, Spain,
Mexico, Japan. Those cover the highest-volume EOR destinations still sitting on
secondary sources.
