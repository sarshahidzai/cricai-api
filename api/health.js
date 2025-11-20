// api/health.js
// Simple health-check endpoint. Path: /api/health

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ ok: true, message: "CRICAI API backend is running." });
};