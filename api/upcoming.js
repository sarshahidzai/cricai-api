// api/upcoming.js
const { callCricApi } = require("./_cricapiClient");

module.exports = async (req, res) => {
  try {
    // CricAPI's "matches" endpoint usually returns upcoming fixtures too
    const data = await callCricApi("matches", { offset: 0 });

    const upcoming =
      Array.isArray(data?.data) && data.data.length
        ? data.data.filter((m) => !m.matchStarted)
        : [];

    res.status(200).json({
      source: "cricapi",
      category: "upcoming",
      raw: data,
      matches: upcoming,
    });
  } catch (err) {
    console.error("Upcoming matches error:", err);
    res.status(500).json({
      error: "Failed to fetch upcoming matches",
      details: String(err.message || err),
    });
  }
};
