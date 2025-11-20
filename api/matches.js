// api/matches.js
// Returns upcoming or recent matches, based on the `type` query parameter:
//   /api/matches?type=upcoming
//   /api/matches?type=recent

const API_KEY = process.env.CRICAPI_KEY;

module.exports = async (req, res) => {
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

  const { type } = req.query || {};
  let statusFilter;

  if (type === "upcoming") {
    statusFilter = "upcoming";
  } else if (type === "recent" || type === "completed") {
    statusFilter = "completed";
  } else {
    res.status(400).json({ error: "Invalid or missing type. Use type=upcoming or type=recent." });
    return;
  }

  try {
    const url = `https://api.cricapi.com/v1/matches?apikey=${API_KEY}&offset=0&status=${encodeURIComponent(statusFilter)}`;

    const upstream = await fetch(url);
    if (!upstream.ok) {
      const text = await upstream.text();
      console.error("Upstream matches error:", upstream.status, text);
      res.status(502).json({ error: "Upstream matches failed", status: upstream.status });
      return;
    }

    const json = await upstream.json();
    res.status(200).json(json);
  } catch (err) {
    console.error("matches handler error:", err);
    res.status(500).json({ error: "Server error in matches", details: String(err && err.message || err) });
  }
};