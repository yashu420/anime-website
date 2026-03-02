export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://gnews.io/api/v4/search?q=anime&lang=en&max=10&apikey=aee0be136a7a2c0a2ba08c6fe5bcd1d0"
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}