import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    const words = await kv.get('words');
    if (!words || words.length === 0) {
      return res.status(404).json({ error: 'No words found' });
    }
    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.status(200).json(randomWord);
  } catch (error) {
    console.error('Error fetching word of the day:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}