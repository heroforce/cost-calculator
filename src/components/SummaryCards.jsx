import { formatMoney, formatPercent } from '../lib/format';

export default function SummaryCards({ result, country, fx, compare }) {
  const local = (n) => formatMoney(n, country.currency, country.symbol);
  const converted = (n) => (fx?.rate ? `${formatMoney(n * fx.rate, compare, '')} ${compare}` : null);

  const cards = [
    { label: 'Gross Salary', value: local(result.gross), sub: converted(result.gross) },
    {
      label: 'Total Cost to Company',
      value: local(result.totalCost),
      sub: converted(result.totalCost),
      highlight: true,
    },
    {
      label: 'Total Employer Statutory Costs',
      value: local(result.totalEmployer),
      sub: converted(result.totalEmployer),
    },
    {
      label: 'Employer Cost Uplift',
      value: formatPercent(result.upliftPct),
      sub: 'on top of gross salary',
    },
  ];

  return (
    <div className="summary">
      {cards.map((c) => (
        <div key={c.label} className={`card stat${c.highlight ? ' highlight' : ''}`}>
          <p className="stat-label">{c.label}</p>
          <div className="stat-value">{c.value}</div>
          {c.sub && <div className="stat-sub">{c.sub}</div>}
        </div>
      ))}
    </div>
  );
}
