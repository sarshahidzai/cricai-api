const API_BASE = "https://api.cricapi.com/v1";
const API_KEY = process.env.CRICAPI_KEY;

if (!API_KEY) {
  console.warn("CRICAPI_KEY is not set in environment variables.");
}

/**
 * Helper to call CricAPI.
 */
async function callCricApi(path) {
  if (!API_KEY) {
    return {
      ok: false,
      status: 500,
      error: "CRICAPI_KEY is missing on the server",
      data: null,
    };
  }

  const url = `${API_BASE}${path}?apikey=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      return {
        ok: false,
        status: response.status,
        error: `Upstream error: ${response.status} ${response.statusText}`,
        data: text
      };
    }

    const data = await response.json();

    return {
      ok: true,
      status: response.status,
      error: null,
      data
    };
  } catch (err) {
    console.error("Error calling CricAPI:", err);
    return {
      ok: false,
      status: 500,
      error: err.message || "Unknown error",
      data: null
    };
  }
}

function sendJson(res, result) {
  if (!result.ok) {
    res.status(result.status || 500).json({
      success: false,
      error: result.error,
      data: result.data
    });
  } else {
    res.status(200).json({
      success: true,
      data: result.data
    });
  }
}


// GET /api/live
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  const result = await callCricApi("/currentMatches");
  sendJson(res, result);
}
