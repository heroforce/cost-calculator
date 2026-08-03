import { countries } from '../src/data/countries.js';
import { calculateCost, computeContribution } from '../src/lib/calc.js';

const cases = [
  // --- previously verified, must not regress ---
  ['Canada','Canada Pension Plan (CPP)',200000,4230.45,'CRA 2026 max employer CPP'],
  ['Canada','Employment Insurance (EI)',200000,1572.30,'CRA 2026 max employer EI'],
  ['Canada','CPP2 (second additional)',200000,416.00,'CRA 2026 max CPP2'],
  ['Philippines','SSS (Social Security System)',2000000,42000,'max SSS employer'],
  ['Australia','Superannuation Guarantee',400000,32499.60,'SG at MCB'],
  ['Singapore','Skills Development Levy',200000,135,'SDL contribution cap'],
  ['Ireland','Pay-Related Social Insurance (PRSI, Class A)',20000,1800,'whole-band low rate'],
  ['United States','FUTA (Federal Unemployment)',300000,42,'FUTA capped'],

  // --- new APAC ---
  ['Indonesia','JP (Pension Security)',500000000,133035600*0.02,'JP at 11,086,300/mo ceiling'],
  ['Indonesia','BPJS Kesehatan (Health)',500000000,144000000*0.04,'health at 12m/mo ceiling'],
  ['Vietnam','Social Insurance',2000000000,607200000*0.175,'SI at 20x reference ceiling'],
  ['Thailand','Social Security Fund',1000000,210000*0.05,'SSF max 875/mo = 10,500/yr'],
  ['Thailand','Social Security Fund',1000000,10500,'SSF explicit max'],
  ['Hong Kong','MPF (Mandatory Provident Fund)',1000000,18000,'MPF max 1,500/mo'],
  ['Japan','Employees Pension Insurance',20000000,7800000*0.0915,'EPI at grade 32 cap'],
  ['South Korea','National Pension',200000000,79080000*0.0475,'NP at Jul 2026 ceiling'],
  ['Taiwan','Labor Pension',5000000,1800000*0.06,'labor pension at 150k/mo cap'],
  ['Taiwan','Labor & Employment Insurance',5000000,549600*0.0805,'LI at 45,800/mo cap'],

  // --- Mexico rebuild ---
  ['Mexico','IMSS — Sickness & Maternity (fixed quota)',500000,8423.44,'flat cuota fija'],
  ['Mexico','IMSS — Sickness & Maternity (excess over 3 UMA)',200000,(200000-123888.30)*0.011,'excess over 3 UMA'],
  ['Mexico','IMSS — Sickness & Maternity (excess over 3 UMA)',100000,0,'below 3 UMA = zero'],
  ['Mexico','IMSS — Severance & Old Age (CEAV)',300000,300000*0.07513,'CEAV top band'],
  ['Mexico','IMSS — Severance & Old Age (CEAV)',50000,50000*0.03676,'CEAV 1.01-1.50 UMA band'],
  ['Mexico','IMSS — Retirement (SAR)',3000000,1032402.50*0.02,'SAR at 25 UMA cap'],

  // --- Colombia appliesFrom ---
  ['Colombia','Health (EPS)',100000000,0,'below 10 SMMLV = exempt'],
  ['Colombia','Health (EPS)',300000000,300000000*0.085,'above 10 SMMLV = payable'],
  ['Colombia','SENA & ICBF',100000000,0,'below 10 SMMLV = exempt'],
  ['Colombia','Pension',700000000,525271500*0.12,'pension at 25 SMMLV IBC cap'],

  // --- Europe / EMEA ---
  ['Netherlands','Aof (Disability)',150000,79409*0.0763,'Aof at max premium wage'],
  ['Spain','Social Security (Common Contingencies)',120000,61214.40*0.236,'at base maxima'],
  ['Spain','Solidarity Contribution (high earners)',50000,0,'below base maxima = zero'],
  ['Spain','Solidarity Contribution (high earners)',100000,(100000-61214.40)*0.0096,'on excess only'],
  ['Poland','Pension (Emerytalne)',400000,282600*0.0976,'at 30-krotnosc cap'],
  ['Sweden','Occupational Pension (ITP1)',1000000,616500*0.045+(1000000-616500)*0.30,'ITP1 marginal bands'],
  ['United Arab Emirates','GPSSA Pension (Emirati nationals only)',1500000,840000*0.15,'GPSSA at 70k/mo cap'],
  ['Saudi Arabia','GOSI (Saudi nationals)',900000,540000*0.1175,'GOSI at 45k/mo cap'],
  ['South Africa','UIF (Unemployment Insurance Fund)',900000,2125.44,'UIF max R177.12/mo'],
  ['South Africa','COIDA (Compensation Fund)',900000,668000*0.0104,'COIDA at Mar 2026 ceiling'],
];

let fails = 0;
for (const [c, line, gross, expected, why] of cases) {
  const def = countries[c]?.employer?.[line];
  if (!def) { console.log(`MISSING  ${c} / ${line}`); fails++; continue; }
  const got = computeContribution(def, gross);
  const ok = Math.abs(got - expected) < 0.02;
  if (!ok) fails++;
  console.log(`${ok?'ok  ':'FAIL'}  ${c.padEnd(21)} ${line.slice(0,46).padEnd(48)} got ${got.toFixed(2).padStart(13)}  want ${expected.toFixed(2).padStart(13)}  ${why}`);
}
console.log(`\n${fails===0 ? `All ${cases.length} engine checks passed.` : fails+' FAILED'}`);

for (const [name, c] of Object.entries(countries)) {
  const r = calculateCost(c, 100000);
  const eli = r.lines.find(l => l.name === 'Employer Liability Insurance');
  if (c.excludeELI && eli) console.log(`ELI LEAK: ${name}`);
  if (!c.excludeELI && !eli) console.log(`ELI MISSING: ${name}`);
  if (!Number.isFinite(r.totalCost)) console.log(`NON-FINITE: ${name}`);
  for (const l of r.lines) if (!Number.isFinite(l.annual)) console.log(`NON-FINITE LINE: ${name} / ${l.name}`);
}
const v = Object.entries(countries).filter(([,c])=>c.verified).length;
const nv = Object.entries(countries).filter(([,c])=>!c.verified).map(([n])=>n);
console.log(`\n${Object.keys(countries).length} countries | verified ${v} | needs review: ${nv.join(', ')||'none'}`);
