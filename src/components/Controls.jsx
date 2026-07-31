import { countryNames, compareCurrencies } from '../data/countries';

export default function Controls({
  country,
  countryName,
  salaryInput,
  compare,
  onCountry,
  onSalary,
  onCompare,
}) {
  return (
    <div className="card section">
      <h2 className="section-title">Inputs</h2>
      <p className="section-sub">
        Enter the annual gross salary in the country's own currency.
      </p>

      <div className="controls">
        <div className="field">
          <label htmlFor="country">Country</label>
          <select id="country" value={countryName} onChange={(e) => onCountry(e.target.value)}>
            {countryNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="salary">Annual gross salary ({country.currency})</label>
          <div className="input-wrap">
            <span className="prefix">{country.symbol}</span>
            <input
              id="salary"
              inputMode="decimal"
              value={salaryInput}
              onChange={(e) => onSalary(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="compare">Compare currency</label>
          <select id="compare" value={compare} onChange={(e) => onCompare(e.target.value)}>
            <option value="">None</option>
            {compareCurrencies
              .filter((c) => c !== country.currency)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
          <span className="hint">Added as extra columns — local currency always stays.</span>
        </div>
      </div>
    </div>
  );
}
