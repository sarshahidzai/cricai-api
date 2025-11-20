// api/_cricapiClient.js

const BASE_URL = "https://api.cricapi.com/v1";
const API_KEY = process.env.CRICAPI_KEY;

if (!API_KEY) {
  console.warn("⚠️ CRICAPI_KEY is not set in environment variables.");
}

/**
 * Generic helper to call CricAPI endpoints.
 * @param {string} endpoint e.g. "currentMatches"
 * @param {object} params  extra query params
 */
async function callCricApi(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.set("apikey", API_KEY);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `CricAPI error ${response.status}: ${response.statusText} – ${text}`
    );
  }

  const json = await response.json();
  return json;
}

module.exports = { callCricApi };
