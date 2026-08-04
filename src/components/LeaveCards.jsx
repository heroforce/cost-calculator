import { formatMoney } from '../lib/format';

const PERIOD_LABEL = { hr: 'per hour', day: 'per day', mo: 'per month' };

export default function LeaveCards({ country }) {
  const { leave, minWage } = country;

  const wage =
    minWage && minWage.amount > 0
      ? {
          value: formatMoney(minWage.amount, country.currency, country.symbol),
          unit: PERIOD_LABEL[minWage.period] ?? minWage.period,
        }
      : { value: 'None', unit: 'no statutory national minimum' };

  const cards = [
    { k: 'Annual leave', v: leave.annualDays, u: 'days per year' },
    {
      k: 'Sick leave',
      v: leave.sickDays > 0 ? leave.sickDays : 'None',
      u: leave.sickDays > 0 ? 'days per year' : 'no statutory paid entitlement',
    },
    { k: 'Parental leave', v: leave.parentalWeeks, u: 'weeks' },
    { k: 'Minimum wage', v: wage.value, u: wage.unit },
  ];

  return (
    <div className="card section">
      <div className="card-header">
        <h2 className="section-title">Mandatory leave &amp; benefits</h2>
        <p className="section-sub">
          Statutory minimums. Collective agreements and individual contracts frequently exceed
          these.
        </p>
      </div>

      <div className="card-body">
        <div className="leave-grid">
          {cards.map((c) => (
            <div key={c.k} className="leave-card">
              <div className="k">{c.k}</div>
              <div className="v">{c.v}</div>
              <div className="u">{c.u}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
