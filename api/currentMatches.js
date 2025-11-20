
const API_KEY = process.env.CRICAPI_KEY;
const BASE_URL = 'https://api.cricapi.com/v1';
module.exports = async (req, res) => {
  if (!API_KEY) return res.status(500).json({ error: "Missing CRICAPI_KEY" });
  try {
    const url = `${BASE_URL}/currentMatches?apikey=${API_KEY}&offset=0`;
    const r = await fetch(url);
    const j = await r.json();
    res.status(200).json(j);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};
