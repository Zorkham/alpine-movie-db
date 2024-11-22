import {
  getAiringTodayTvShows,
  getMovieDetails,
  getMovieImages,
  getNowPlayingMovies,
  getOnTheAirTvShows,
  getPopularMovies,
  getPopularPersons,
  getPopularTvShows,
  getTopRatedMovies,
  getTopRatedTvShows,
  getUpcomingMovies,
  searchResults
} from '../utils/tmdb'

import { Router } from 'express'

const router = Router()

// Route to fetch search movies, tv shows, and persons
router.get('/search', async (req, res) => {
  const query = req.query.query as string
  try {
    const data = await searchResults(query)
    res.json(data)
  } catch (err) {
    res
      .status(500)
      .json({ error: `Failed to search results for query "${query}"` })
  }
})

router.get('/movies/:id', async (req, res) => {
  try {
    const data = await getMovieDetails(req.params.id)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movie details' })
  }
})

router.get('/movies/:id/images', async (req, res) => {
  try {
    const data = await getMovieImages(req.params.id)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movie images' })
  }
})

// Route to fetch popular movies
router.get('/movies/popular', async (req, res) => {
  const page = req.query.page || 1
  try {
    const data = await getPopularMovies(Number(page))
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch popular movies' })
  }
})

// Route to fetch now playing movies
router.get('/movies/now_playing', async (req, res) => {
  const page = req.query.page || 1
  try {
    const data = await getNowPlayingMovies(Number(page))
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch now playing movies' })
  }
})

// Route to fetch upcoming movies
router.get('/movies/upcoming', async (req, res) => {
  const page = req.query.page || 1
  try {
    const data = await getUpcomingMovies(Number(page))
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch upcoming movies' })
  }
})

// Route to fetch top rated movies
router.get('/movies/top_rated', async (req, res) => {
  const page = req.query.page || 1
  try {
    const data = await getTopRatedMovies(Number(page))
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top rated movies' })
  }
})

// Route to fetch popular tv shows
router.get('/tv_shows/popular', async (req, res) => {
  const page = req.query.page || 1
  try {
    const data = await getPopularTvShows(Number(page))
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch popular tv shows' })
  }
})

// Route to fetch airing today tv shows
router.get('/tv_shows/airing_today', async (req, res) => {
  const page = req.query.page || 1
  try {
    const data = await getAiringTodayTvShows(Number(page))
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch airing today tv shows' })
  }
})

// Route to fetch on the air tv shows
router.get('/tv_shows/on_the_air', async (req, res) => {
  const page = req.query.page || 1
  try {
    const data = await getOnTheAirTvShows(Number(page))
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch on the air tv shows' })
  }
})

// Route to fetch top rated tv shows
router.get('/tv_shows/top_rated', async (req, res) => {
  const page = req.query.page || 1
  try {
    const data = await getTopRatedTvShows(Number(page))
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top rated tv shows' })
  }
})

// Route to fetch popular persons
router.get('/persons/popular', async (req, res) => {
  const page = req.query.page || 1
  try {
    const data = await getPopularPersons(Number(page))
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch popular persons' })
  }
})

export default router
