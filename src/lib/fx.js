/**
 * FX lookup.
 *
 * Frankfurter (ECB reference rates) is the primary source. It only covers the
 * ~30 currencies the ECB publishes, so anything outside that set falls through
 * to open.er-api.com. Both are keyless.
 *
 * Every failure path resolves rather than throws — the caller must always be
 * able to keep rendering local currency.
 */

// Use the .dev host directly. api.frankfurter.app still resolves but 301s here,
// and the Cloudflare redirect response carries no CORS headers — so a browser
// fetch to the old host always fails and silently falls through to the backup.
const FRANKFURTER = 'https://api.frankfurter.dev/v1/latest';
const FALLBACK = 'https://open.er-api.com/v6/latest';

/** Currencies the ECB does not publish, so Frankfurter can never serve them. */
export const FRANKFURTER_GAPS = new Set([
  'VND', 'ARS', 'COP', 'CLP', 'SAR', 'AED', 'TWD',
]);

const cache = new Map();

async function fromFrankfurter(from, to) {
  const res = await fetch(`${FRANKFURTER}?from=${from}&to=${to}`);
  if (!res.ok) throw new Error(`Frankfurter ${res.status}`);
  const data = await res.json();
  const rate = data?.rates?.[to];
  if (typeof rate !== 'number') throw new Error('Frankfurter: rate missing');
  return { rate, date: data.date, source: 'ECB via Frankfurter' };
}

async function fromFallback(from, to) {
  const res = await fetch(`${FALLBACK}/${from}`);
  if (!res.ok) throw new Error(`open.er-api ${res.status}`);
  const data = await res.json();
  const rate = data?.rates?.[to];
  if (typeof rate !== 'number') throw new Error('open.er-api: rate missing');
  return {
    rate,
    // time_last_update_utc is an RFC1123 string; normalise to YYYY-MM-DD.
    date: data.time_last_update_utc
      ? new Date(data.time_last_update_utc).toISOString().slice(0, 10)
      : 'unknown',
    source: 'open.er-api.com',
  };
}

/**
 * Resolve an FX rate.
 * @returns {Promise<{rate:number,date:string,source:string}|{error:string}>}
 */
export async function getRate(from, to) {
  if (!from || !to || from === to) {
    return { rate: 1, date: 'n/a', source: 'same currency' };
  }

  const key = `${from}:${to}`;
  if (cache.has(key)) return cache.get(key);

  const providers = FRANKFURTER_GAPS.has(from) || FRANKFURTER_GAPS.has(to)
    ? [fromFallback]
    : [fromFrankfurter, fromFallback];

  let lastError = 'unknown error';
  for (const provider of providers) {
    try {
      const result = await provider(from, to);
      cache.set(key, result);
      return result;
    } catch (err) {
      lastError = err.message;
    }
  }

  // Deliberately not cached — a transient network failure shouldn't stick.
  return { error: lastError };
}
