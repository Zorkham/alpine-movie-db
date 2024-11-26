import { VercelRequest, VercelResponse } from '@vercel/node'

import axios from 'axios'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { path } = req.query
    const tmdbApiKey = process.env.TMDB_API_KEY

    if (!path) {
      return res.status(400).json({ error: 'Path is required' })
    }

    const tmdbResponse = await axios.get(
      `https://api.themoviedb.org/3${path}`,
      {
        params: { api_key: tmdbApiKey, ...req.query }
      }
    )

    res.status(200).json(tmdbResponse.data)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred', details: error.message })
  }
}
