// api/matches.js
const { callCricApi } = require("./_cricapiClient");

/**
 * /api/matches?type=live|upcoming|recent
 */
module.exports = async (req, res) => {
  const type = (req.query.type || "").toLowerCase();

  try {
    const data = await callCricApi("matches", { offset: 0 });
    let matches = Array.isArray(data?.data) ? data.data : [];

    if (type === "live") {
      matches = matches.filter((m) => m.matchStarted);
    } else if (type === "upcoming") {
      matches = matches.filter((m) => !m.matchStarted);
    }
    // "recent" can be left as-is or filtered differently later

    res.status(200).json({
      source: "cricapi",
      category: type || "all",
      raw: data,
      matches,
    });
  } catch (err) {
    console.error("General matches error:", err);
    res.status(500).json({
      error: "Failed to fetch matches",
      details: String(err.message || err),
    });
  }
};
