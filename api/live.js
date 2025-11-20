// api/live.js
const { callCricApi } = require("./_cricapiClient");

module.exports = async (req, res) => {
  try {
    const data = await callCricApi("currentMatches", { offset: 0 });

    // Optionally filter only live matches (if CricAPI marks them)
    const live =
      Array.isArray(data?.data) && data.data.length
        ? data.data.filter((m) => m.matchStarted)
        : [];

    res.status(200).json({
      source: "cricapi",
      category: "live",
      raw: data,
      matches: live,
    });
  } catch (err) {
    console.error("Live matches error:", err);
    res.status(500).json({
      error: "Failed to fetch live matches",
      details: String(err.message || err),
    });
  }
};
