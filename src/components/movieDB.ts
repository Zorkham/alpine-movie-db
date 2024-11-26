import Alpine from 'alpinejs'
import { Movie } from '../config/movie'
import { People } from '../config/people'
import { TvShow } from '../config/tvShow'
import { formatDate } from '../utils/date'

export const movieDB = () => ({
  search: Alpine.$persist('') as unknown as string,
  searchResults: Alpine.$persist([]) as unknown as
    | Movie[]
    | TvShow[]
    | People[],

  popularMoviesLoading: false,
  topRatedMoviesLoading: false,
  popularTvShowsLoading: false,
  topRatedTvShowsLoading: false,
  popularPersonsLoading: false,

  popularMoviesPage: 1,
  topRatedMoviesPage: 1,
  popularTvShowsPage: 1,
  topRatedTvShowsPage: 1,
  popularPersonsPage: 1,

  popularMovies: [] as Movie[],
  nowPlayingMovies: [] as Movie[],
  comingSoonMovies: [] as Movie[],
  topRatedMovies: [] as Movie[],

  popularTvShows: [] as TvShow[],
  airingTodayTvShows: [] as TvShow[],
  onTheAirTvShows: [] as TvShow[],
  topRatedTvShows: [] as TvShow[],

  popularPersons: [] as People[],

  randomMovieDetails: null as Movie | null,
  randomMoviePicture: null as string | null,

  // Convert date to human readable format
  formatDate,

  // Clear search
  clearSearch() {
    this.search = ''
    this.searchResults = []
  },

  // Fetch search results from the API
  async fetchSearchResults() {
    if (this.search.length < 2) {
      this.searchResults = []
      return
    }
    const url = `/api/search?query=${this.search}`
    const response = await fetch(url)
    const data = await response.json()
    this.searchResults = data.results.slice(0, 5)
  },

  // Fetch popular movies from the API
  async fetchPopularMovies() {
    this.popularMoviesLoading = true
    const url = `/api/movies/popular?page=${this.popularMoviesPage}`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        if (data?.results?.length) {
          this.popularMovies.push(...data.results)
          this.popularMoviesPage++
        }
      })
      .catch(console.error)
      .finally(() => {
        this.popularMoviesLoading = false
      })
  },

  // Fetch now playing movies from the API
  async fetchNowPlayingMovies() {
    const url = `/api/movies/now_playing`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        this.nowPlayingMovies = [...data.results]
      })
      .catch(console.error)
  },

  // Fetch coming soon movies from the API
  async fetchComingSoonMovies() {
    const url = `/api/movies/upcoming`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        this.comingSoonMovies = [...data.results]
        this.getRandomMovie()
      })
      .catch(console.error)
  },

  // Fetch top rated movies from the API
  async fetchTopRatedMovies() {
    this.topRatedMoviesLoading = true
    const url = `/api/movies/top_rated?page=${this.topRatedMoviesPage}`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        if (data?.results?.length) {
          this.topRatedMovies.push(...data.results)
          this.topRatedMoviesPage++
        }
      })
      .catch(console.error)
      .finally(() => {
        this.topRatedMoviesLoading = false
      })
  },

  // Fetch popular tv shows from the API
  async fetchPopularTvShows() {
    this.popularTvShowsLoading = true
    const url = `/api/tv_shows/popular?page=${this.popularTvShowsPage}`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        if (data?.results?.length) {
          this.popularTvShows.push(...data.results)
          this.popularTvShowsPage++
        }
      })
      .catch(console.error)
      .finally(() => {
        this.popularTvShowsLoading = false
      })
  },

  // Fetch airing today tv shows from the API
  async fetchAiringTodayTvShows() {
    const url = `/api/tv_shows/airing_today`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        this.airingTodayTvShows = [...data.results]
      })
      .catch(console.error)
  },

  // Fetch on the air tv shows from the API
  async fetchOnTheAirTvShows() {
    const url = `/api/tv_shows/on_the_air`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        this.onTheAirTvShows = [...data.results]
      })
      .catch(console.error)
  },

  // Fetch top rated tv shows from the API
  async fetchTopRatedTvShows() {
    this.topRatedTvShowsLoading = true
    const url = `/api/tv_shows/top_rated?page=${this.topRatedTvShowsPage}`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        if (data?.results?.length) {
          this.topRatedTvShows.push(...data.results)
          this.topRatedTvShowsPage++
        }
      })
      .catch(console.error)
      .finally(() => {
        this.topRatedTvShowsLoading = false
      })
  },

  // Fetch popular persons from the API
  async fetchPopularPersons() {
    this.popularPersonsLoading = true
    const url = `/api/persons/popular?page=${this.popularPersonsPage}`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        if (data?.results?.length) {
          this.popularPersons.push(...data.results)
          this.popularPersonsPage++
        }
      })
      .catch(console.error)
      .finally(() => {
        this.popularPersonsLoading = false
      })
  },

  // Check if the user has scrolled to the bottom of the popular movies list
  popularMoviesCheckScroll() {
    // @ts-ignore
    const listHeight = this.$refs.popularMoviesList?.scrollHeight
    const scrollHeight = window.innerHeight + window.scrollY
    if (
      scrollHeight >= listHeight - 50 &&
      !this.popularMoviesLoading &&
      this.popularMoviesPage <= 5
    ) {
      this.fetchPopularMovies()
    }
  },

  // Check if the user has scrolled to the bottom of the top rated movies list
  topRatedMoviesCheckScroll() {
    // @ts-ignore
    const listHeight = this.$refs.topRatedMoviesList?.scrollHeight
    const scrollHeight = window.innerHeight + window.scrollY
    if (
      scrollHeight >= listHeight - 50 &&
      !this.topRatedMoviesLoading &&
      this.topRatedMoviesPage <= 5
    ) {
      this.fetchTopRatedMovies()
    }
  },

  // Check if the user has scrolled to the bottom of the popular Tv shows list
  popularTvShowsCheckScroll() {
    // @ts-ignore
    const listHeight = this.$refs.popularTvShowsList?.scrollHeight
    const scrollHeight = window.innerHeight + window.scrollY
    if (
      scrollHeight >= listHeight - 50 &&
      !this.popularTvShowsLoading &&
      this.popularTvShowsPage <= 5
    ) {
      this.fetchPopularTvShows()
    }
  },

  // Check if the user has scrolled to the bottom of the top rated Tv shows list
  topRatedTvShowsCheckScroll() {
    // @ts-ignore
    const listHeight = this.$refs.topRatedTvShowsList?.scrollHeight
    const scrollHeight = window.innerHeight + window.scrollY
    if (
      scrollHeight >= listHeight - 50 &&
      !this.topRatedTvShowsLoading &&
      this.topRatedTvShowsPage <= 5
    ) {
      this.fetchTopRatedTvShows()
    }
  },

  // Check if the user has scrolled to the bottom of the popular persons list
  popularPersonsCheckScroll() {
    // @ts-ignore
    const listHeight = this.$refs.popularPersonsList?.scrollHeight
    const scrollHeight = window.innerHeight + window.scrollY
    if (
      scrollHeight >= listHeight - 50 &&
      !this.popularPersonsLoading &&
      this.popularPersonsPage <= 5
    ) {
      this.fetchPopularPersons()
    }
  },

  // Select a movie and redirect to the movie detail page
  async selectMovie(id: number, type: string) {
    // window.location.href = `/movie-detail.html?id=${id}`
  },

  // Select a Tv show and redirect to the Tv show detail page
  async getRandomMovie() {
    this.randomMovieDetails = null
    this.randomMoviePicture = null

    if (!this.comingSoonMovies?.length) {
      return
    }

    this.randomMovieDetails =
      this.comingSoonMovies[
        Math.floor(Math.random() * this.comingSoonMovies.length)
      ]

    const imagesResponse = await fetch(
      `/api/movies/${this.randomMovieDetails?.id}/images`
    )
    const imagesData = await imagesResponse.json()

    if (imagesData.backdrops && imagesData.backdrops.length > 0) {
      const randomBackdrop =
        imagesData.backdrops[
          Math.floor(Math.random() * imagesData.backdrops.length)
        ]
      this.randomMoviePicture = `https://image.tmdb.org/t/p/original${randomBackdrop?.file_path}`
    }
  },

  // Get the full poster URL
  getPosterUrl(path: string) {
    return `https://image.tmdb.org/t/p/w500${path}`
  },

  // Get the full profile URL
  getProfileUrl(path: string) {
    return `https://media.themoviedb.org/t/p/w470_and_h470_face${path}`
  }
})
