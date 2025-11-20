export default async function handler(req, res) {
  try {
    const API_KEY = process.env.CRICAPI_KEY;
    const response = await fetch(`https://api.cricapi.com/v1/upcoming?apikey=${API_KEY}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}