// api/health.js
module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    message: "CRICAI backend is alive ✅",
    time: new Date().toISOString(),
  });
};
