// api/currentMatches.js
// Returns live/current cricket matches from CricAPI via CRICAPI_KEY.
// Path on Vercel: /api/currentMatches

const API_KEY = process.env.CRICAPI_KEY;

module.exports = async (req, res) => {
  // Basic CORS so Base44 / browser clients can call this API.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (!API_KEY) {
    res.status(500).json({ error: "CRICAPI_KEY is not configured on the server." });
    return;
  }

  try {
    const url = `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`;

    const upstream = await fetch(url);
    if (!upstream.ok) {
      const text = await upstream.text();
      console.error("Upstream currentMatches error:", upstream.status, text);
      res.status(502).json({ error: "Upstream currentMatches failed", status: upstream.status });
      return;
    }

    const json = await upstream.json();
    res.status(200).json(json);
  } catch (err) {
    console.error("currentMatches handler error:", err);
    res.status(500).json({ error: "Server error in currentMatches", details: String(err && err.message || err) });
  }
};