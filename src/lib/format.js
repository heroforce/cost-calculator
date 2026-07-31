/**
 * Currencies conventionally written without decimal places. Showing
 * "Rp 32,500,000.00" or "¥5,400,000.00" reads as a mistake to anyone local.
 */
const ZERO_DECIMAL = new Set(['IDR', 'VND', 'JPY', 'KRW', 'CLP', 'COP', 'HUF', 'TWD']);

export function formatMoney(amount, currency, symbol) {
  if (!Number.isFinite(amount)) return '—';
  const digits = ZERO_DECIMAL.has(currency) ? 0 : 2;
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return `${symbol}${formatted}`;
}

export function formatPercent(fraction, digits = 2) {
  if (!Number.isFinite(fraction)) return '—';
  return `${(fraction * 100).toFixed(digits)}%`;
}

/**
 * FX rates span many orders of magnitude — 1 AUD = 0.6981 USD but
 * 1 VND = 0.000038 USD. A fixed 4 decimal places renders the latter as
 * "0.0000", so scale the precision to the size of the rate.
 */
export function formatRate(rate) {
  if (!Number.isFinite(rate)) return '—';
  if (rate >= 1) return rate.toFixed(4);
  if (rate >= 0.01) return rate.toFixed(5);
  return rate.toPrecision(4);
}

export function parseSalary(input) {
  const cleaned = String(input).replace(/[^0-9.]/g, '');
  const value = parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}
