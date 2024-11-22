import axios from 'axios'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const API_KEY = process.env.TMDB_API_KEY
const API_URL = 'https://api.themoviedb.org/3'

const language = 'en-US'
const region = 'FR'

// Check that the API key is present
if (!API_KEY) {
  throw new Error(`${API_KEY} is not defined in the .env file`)
}

// Search for movies, TV shows, and persons
export const searchResults = async (query: string) => {
  const response = await axios.get(`${API_URL}/search/multi`, {
    params: {
      api_key: API_KEY,
      include_adult: false,
      language,
      region,
      page: 1,
      query
    }
  })
  return response.data
}

export const getMovieDetails = async (movieId: string) => {
  const response = await axios.get(`${API_URL}/movie/${movieId}`, {
    params: { api_key: API_KEY, language }
  })
  return response.data
}

export const getMovieImages = async (movieId: string) => {
  const response = await axios.get(`${API_URL}/movie/${movieId}/images`, {
    params: { api_key: API_KEY }
  })
  return response.data
}

// Fetch popular movies by page
export const getPopularMovies = async (page: number) => {
  const response = await axios.get(`${API_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      include_adult: false,
      include_video: false,
      sort_by: 'popularity.desc',
      year: 2024,
      language,
      region,
      page
    }
  })
  return response.data
}

// Fetch now playing movies by page
export const getNowPlayingMovies = async (page: number) => {
  const response = await axios.get(`${API_URL}/movie/now_playing`, {
    params: {
      api_key: API_KEY,
      language,
      region,
      page
    }
  })
  return response.data
}

// Fetch upcoming movies by page
export const getUpcomingMovies = async (page: number) => {
  const response = await axios.get(`${API_URL}/movie/upcoming`, {
    params: {
      api_key: API_KEY,
      language,
      region,
      page
    }
  })
  return response.data
}

// Fetch top rated movies by page
export const getTopRatedMovies = async (page: number) => {
  const response = await axios.get(`${API_URL}/movie/top_rated`, {
    params: {
      api_key: API_KEY,
      language,
      region,
      page
    }
  })
  return response.data
}

// Fetch popular TV shows by page
export const getPopularTvShows = async (page: number) => {
  const response = await axios.get(`${API_URL}/discover/tv`, {
    params: {
      api_key: API_KEY,
      include_adult: false,
      include_video: false,
      sort_by: 'popularity.desc',
      year: 2024,
      language,
      region,
      page
    }
  })
  return response.data
}

// Fetch airing today TV shows by page
export const getAiringTodayTvShows = async (page: number) => {
  const response = await axios.get(`${API_URL}/tv/airing_today`, {
    params: {
      api_key: API_KEY,
      language,
      region,
      page
    }
  })
  return response.data
}

// Fetch on the air TV shows by page
export const getOnTheAirTvShows = async (page: number) => {
  const response = await axios.get(`${API_URL}/tv/on_the_air`, {
    params: {
      api_key: API_KEY,
      language,
      region,
      page
    }
  })
  return response.data
}

// Fetch top rated TV shows by page
export const getTopRatedTvShows = async (page: number) => {
  const response = await axios.get(`${API_URL}/tv/top_rated`, {
    params: {
      api_key: API_KEY,
      language,
      region,
      page
    }
  })
  return response.data
}

// Fetch popular persons by page
export const getPopularPersons = async (page: number) => {
  const response = await axios.get(`${API_URL}/person/popular`, {
    params: {
      api_key: API_KEY,
      language,
      region,
      page
    }
  })
  return response.data
}
