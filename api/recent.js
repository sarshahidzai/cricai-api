// api/recent.js
const { callCricApi } = require("./_cricapiClient");

module.exports = async (req, res) => {
  try {
    // If CricAPI has a dedicated "recentMatches" endpoint, use that.
    // Otherwise this example reuses "currentMatches" and you can tweak later.
    const data = await callCricApi("currentMatches", { offset: 0 });

    const recent = Array.isArray(data?.data) ? data.data : [];

    res.status(200).json({
      source: "cricapi",
      category: "recent",
      raw: data,
      matches: recent,
    });
  } catch (err) {
    console.error("Recent matches error:", err);
    res.status(500).json({
      error: "Failed to fetch recent matches",
      details: String(err.message || err),
    });
  }
};
