import { formatMoney, formatPercent } from '../lib/format';

/**
 * Line-by-line employer contributions.
 *
 * Local currency columns are unconditional. The compare currency, when one is
 * selected, appends two further columns — it never replaces the local pair.
 */
export default function ContributionsTable({ result, country, fx, compare }) {
  const showCompare = Boolean(compare) && Boolean(fx?.rate);

  const local = (n) => formatMoney(n, country.currency, country.symbol);
  const foreign = (n) => formatMoney(n * fx.rate, compare, '');

  return (
    <div className="card section">
      <div className="card-header">
        <h2 className="section-title">Employer contributions</h2>
        <p className="section-sub">
          Employer-borne costs only. Employee deductions the employer merely withholds are
          excluded.
        </p>
      </div>

      <div className="card-body">
        <div className="table-scroll">
          <table>
            <thead>
              <tr className="group">
                <th className="left" />
                <th />
                <th colSpan={2}>{country.currency}</th>
                {showCompare && <th colSpan={2}>{compare}</th>}
                <th />
                <th className="left" />
              </tr>
              <tr>
                <th className="left">Contribution</th>
                <th>Rate</th>
                <th>Annual</th>
                <th>Monthly</th>
                {showCompare && <th className="compare">Annual</th>}
                {showCompare && <th className="compare">Monthly</th>}
                <th>% of gross</th>
                <th className="left">Notes</th>
              </tr>
            </thead>

            <tbody>
              {result.lines.map((line) => (
                <tr key={line.name} className={line.annual === 0 ? 'zero' : undefined}>
                  <td className="left">{line.name}</td>
                  <td>{line.rateLabel}</td>
                  <td>{local(line.annual)}</td>
                  <td>{local(line.monthly)}</td>
                  {showCompare && <td className="compare">{foreign(line.annual)}</td>}
                  {showCompare && <td className="compare">{foreign(line.monthly)}</td>}
                  <td>{formatPercent(line.pctOfGross)}</td>
                  <td className="note">{line.note}</td>
                </tr>
              ))}

              <tr className="total">
                <td className="left">Total Employer Costs</td>
                <td>{formatPercent(result.upliftPct)}</td>
                <td>{local(result.totalEmployer)}</td>
                <td>{local(result.totalEmployer / 12)}</td>
                {showCompare && <td className="compare">{foreign(result.totalEmployer)}</td>}
                {showCompare && <td className="compare">{foreign(result.totalEmployer / 12)}</td>}
                <td>{formatPercent(result.upliftPct)}</td>
                <td className="note" />
              </tr>

              <tr className="total grand">
                <td className="left">Total Cost to Company</td>
                <td />
                <td>{local(result.totalCost)}</td>
                <td>{local(result.totalCost / 12)}</td>
                {showCompare && <td className="compare">{foreign(result.totalCost)}</td>}
                {showCompare && <td className="compare">{foreign(result.totalCost / 12)}</td>}
                <td>{formatPercent(result.gross > 0 ? result.totalCost / result.gross : 0)}</td>
                <td className="note" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
