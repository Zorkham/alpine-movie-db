import { VercelRequest, VercelResponse } from '@vercel/node'

import axios from 'axios'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { path } = req.query
    const TMDB_API_KEY = process.env.TMDB_API_KEY

    if (!path) {
      return res.status(400).json({ error: 'Path is required' })
    }

    const tmdbResponse = await axios.get(
      `https://api.themoviedb.org/3${path}`,
      {
        params: { api_key: TMDB_API_KEY, ...req.query }
      }
    )

    res.status(200).json(tmdbResponse.data)
  } catch (error: any) {
    res
      .status(500)
      .json({ error: 'An error occurred', details: error?.message })
  }
}
