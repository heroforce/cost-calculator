import { formatMoney, formatPercent } from '../lib/format';

export default function CostBar({ result, country }) {
  const total = result.totalCost || 1;
  const grossPct = (result.gross / total) * 100;
  const employerPct = (result.totalEmployer / total) * 100;

  const local = (n) => formatMoney(n, country.currency, country.symbol);

  return (
    <div className="card section">
      <h2 className="section-title">Cost to company</h2>
      <p className="section-sub">
        Gross salary versus employer statutory costs, as a share of total outlay.
      </p>

      <div className="bar">
        <div className="bar-seg gross" style={{ flexBasis: `${grossPct}%` }}>
          {grossPct > 12 && `${grossPct.toFixed(1)}%`}
        </div>
        <div className="bar-seg employer" style={{ flexBasis: `${employerPct}%` }}>
          {employerPct > 12 && `${employerPct.toFixed(1)}%`}
        </div>
      </div>

      <div className="bar-legend">
        <div>
          <span className="swatch gross" />
          Gross salary
          <span className="amount">
            {local(result.gross)} · {formatPercent(grossPct / 100, 1)}
          </span>
        </div>
        <div>
          <span className="swatch employer" />
          Employer costs
          <span className="amount">
            {local(result.totalEmployer)} · {formatPercent(employerPct / 100, 1)}
          </span>
        </div>
      </div>
    </div>
  );
}
