// api/currentMatches.js
const { callCricApi } = require("./_cricapiClient");

module.exports = async (req, res) => {
  try {
    const data = await callCricApi("currentMatches", { offset: 0 });

    res.status(200).json({
      source: "cricapi",
      category: "current",
      raw: data,
      matches: data?.data || [],
    });
  } catch (err) {
    console.error("Current matches error:", err);
    res.status(500).json({
      error: "Failed to fetch current matches",
      details: String(err.message || err),
    });
  }
};
