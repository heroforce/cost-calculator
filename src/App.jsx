import { useEffect, useMemo, useState } from 'react';
import { countries } from './data/countries';
import { calculateCost } from './lib/calc';
import { getRate } from './lib/fx';
import { parseSalary, formatRate } from './lib/format';

import Badge from './components/Badge';
import Controls from './components/Controls';
import SummaryCards from './components/SummaryCards';
import ContributionsTable from './components/ContributionsTable';
import CostBar from './components/CostBar';
import LeaveCards from './components/LeaveCards';

const DEFAULT_COUNTRY = 'Australia';
const DEFAULT_SALARY = '120000';

export default function App() {
  const [countryName, setCountryName] = useState(DEFAULT_COUNTRY);
  const [salaryInput, setSalaryInput] = useState(DEFAULT_SALARY);
  const [compare, setCompare] = useState('');
  const [fx, setFx] = useState(null);
  const [fxLoading, setFxLoading] = useState(false);

  const country = countries[countryName];
  const salary = parseSalary(salaryInput);
  const result = useMemo(() => calculateCost(country, salary), [country, salary]);

  // Clear a compare currency that matches the newly selected country — an
  // identical duplicate pair of columns is just noise.
  useEffect(() => {
    if (compare && compare === country.currency) setCompare('');
  }, [compare, country.currency]);

  useEffect(() => {
    if (!compare) {
      setFx(null);
      return;
    }
    let cancelled = false;
    setFxLoading(true);
    getRate(country.currency, compare).then((res) => {
      if (cancelled) return;
      setFx(res);
      setFxLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [country.currency, compare]);

  const fxOk = Boolean(fx?.rate);

  return (
    <>
      <div className="backdrop" />
      <div className="shell">
        <header>
          <Badge>Powered by Employment Hero</Badge>
          <h1>Global Employment Cost Calculator</h1>
          <p className="lede">
            Employer statutory costs for hiring in {Object.keys(countries).length} countries —
            line by line, in local currency, with the source behind every rate.
          </p>
        </header>

        <Controls
          country={country}
          countryName={countryName}
          salaryInput={salaryInput}
          compare={compare}
          onCountry={setCountryName}
          onSalary={setSalaryInput}
          onCompare={setCompare}
        />

        {!country.verified && (
          <div className="banner warn">
            <span aria-hidden="true">⚠</span>
            <span>
              <strong>{countryName} has not been verified against primary sources.</strong> Rates
              here come from secondary sources and EOR simulation benchmarks. Review each line
              before using these figures with a client.
            </span>
          </div>
        )}

        {compare && (
          <div className={`banner ${fxOk || fxLoading ? 'info' : 'warn'}`}>
            <span aria-hidden="true">{fxOk || fxLoading ? '↔' : '⚠'}</span>
            <span>
              {fxLoading && `Fetching ${country.currency} → ${compare} rate…`}
              {!fxLoading && fxOk && (
                <>
                  <strong>
                    1 {country.currency} = {formatRate(fx.rate)} {compare}
                  </strong>{' '}
                  · {fx.source} · rate dated {fx.date}
                </>
              )}
              {!fxLoading && !fxOk && (
                <>
                  <strong>FX lookup failed ({fx?.error}).</strong> Local currency figures below
                  are unaffected.
                </>
              )}
            </span>
          </div>
        )}

        <SummaryCards result={result} country={country} fx={fxOk ? fx : null} compare={compare} />

        <ContributionsTable
          result={result}
          country={country}
          fx={fxOk ? fx : null}
          compare={compare}
        />

        <CostBar result={result} country={country} />

        <LeaveCards country={country} />

        <footer>
          Figures are indicative and for illustration only. Industry-rated and state-varying
          contributions (workers' compensation, payroll tax, accident insurance) use stated
          national averages and will differ for any specific employer. Verify against the
          relevant national authority before contracting.
        </footer>
      </div>
    </>
  );
}
