import Alpine from 'alpinejs'
import { Movie } from '../config/movie'
import { People } from '../config/people'
import { TVShow } from '../config/tvShow'
import { formatDate } from '../utils/date'

export const movieDB = () => ({
  search: Alpine.$persist('') as unknown as string,
  searchResults: Alpine.$persist([]) as unknown as [],

  popularMoviesLoading: false,
  topRatedMoviesLoading: false,
  popularTVShowsLoading: false,
  topRatedTVShowsLoading: false,
  popularPersonsLoading: false,

  popularMoviesPage: 1,
  topRatedMoviesPage: 1,
  popularTVShowsPage: 1,
  topRatedTVShowsPage: 1,
  popularPersonsPage: 1,

  popularMovies: [] as Movie[],
  nowPlayingMovies: [] as Movie[],
  comingSoonMovies: [] as Movie[],
  topRatedMovies: [] as Movie[],

  popularTVShows: [] as TVShow[],
  airingTodayTVShows: [] as TVShow[],
  onTheAirTVShows: [] as TVShow[],
  topRatedTVShows: [] as TVShow[],

  popularPersons: [] as People[],

  randomMovieInfos: null as Movie | null,
  randomMoviePicture: null as string | null,

  // @ts-ignore
  apiKey: import.meta.env.VITE_API_KEY_TMDB,
  // @ts-ignore
  apiUrl: import.meta.env.VITE_API_URL,

  // Convert date to human readable format
  formatDate,

  // Clear search
  clearSearch() {
    this.search = ''
    this.searchResults = []
  },

  async fetchSearchResults() {
    if (this.search.length < 2) {
      this.searchResults = []
      return
    }
    const url = `${this.apiUrl}/search/multi?api_key=${this.apiKey}&query=${this.search}&include_adult=false&language=en-US&region=FR&page=1`
    const response = await fetch(url)
    const data = await response.json()
    console.dir(data.results)
    this.searchResults = data.results.slice(0, 5)
  },

  async fetchPopularMovies() {
    this.popularMoviesLoading = true
    const url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&include_adult=false&include_video=false&language=en-US&region=FR&year=2024&sort_by=popularity.desc&page=${this.popularMoviesPage}`
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

  async fetchNowPlayingMovies() {
    const url = `${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&region=FR&page=1`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        this.nowPlayingMovies = [...data.results]
      })
      .catch(console.error)
  },

  async fetchComingSoonMovies() {
    const url = `${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}&language=en-US&region=FR&page=1`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        this.comingSoonMovies = [...data.results]
        this.getRandomMovie()
      })
      .catch(console.error)
  },

  async fetchTopRatedMovies() {
    this.topRatedMoviesLoading = true
    const url = `${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}&language=en-US&region=FR&page=${this.topRatedMoviesPage}`
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

  async fetchPopularTVShows() {
    this.popularTVShowsLoading = true
    const url = `${this.apiUrl}/discover/tv?api_key=${this.apiKey}&include_adult=false&include_video=false&language=en-US&region=FR&year=2024&sort_by=popularity.desc&page=${this.popularTVShowsPage}`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        if (data?.results?.length) {
          this.popularTVShows.push(...data.results)
          this.popularTVShowsPage++
        }
      })
      .catch(console.error)
      .finally(() => {
        this.popularTVShowsLoading = false
      })
  },

  async fetchAiringTodayTVShows() {
    const url = `${this.apiUrl}/tv/airing_today?api_key=${this.apiKey}&language=en-US&region=FR&page=1`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        this.airingTodayTVShows = [...data.results]
      })
      .catch(console.error)
  },

  async fetchOnTheAirTVShows() {
    const url = `${this.apiUrl}/tv/on_the_air?api_key=${this.apiKey}&language=en-US&region=FR&page=1`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        this.onTheAirTVShows = [...data.results]
      })
      .catch(console.error)
  },

  async fetchTopRatedTVShows() {
    this.topRatedTVShowsLoading = true
    const url = `${this.apiUrl}/tv/top_rated?api_key=${this.apiKey}&language=en-US&region=FR&page=${this.topRatedTVShowsPage}`
    fetch(url)
      .then((response) => response.json())
      .then((data: { results: [] }) => {
        if (data?.results?.length) {
          this.topRatedTVShows.push(...data.results)
          this.topRatedTVShowsPage++
        }
      })
      .catch(console.error)
      .finally(() => {
        this.topRatedTVShowsLoading = false
      })
  },

  async fetchPopularPersons() {
    this.popularPersonsLoading = true
    const url = `${this.apiUrl}/person/popular?api_key=${this.apiKey}&language=en-US&region=FR&page=${this.popularPersonsPage}`
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

  popularTVShowsCheckScroll() {
    // @ts-ignore
    const listHeight = this.$refs.popularTVShowsList?.scrollHeight
    const scrollHeight = window.innerHeight + window.scrollY
    if (
      scrollHeight >= listHeight - 50 &&
      !this.popularTVShowsLoading &&
      this.popularTVShowsPage <= 5
    ) {
      this.fetchPopularTVShows()
    }
  },

  topRatedTVShowsCheckScroll() {
    // @ts-ignore
    const listHeight = this.$refs.topRatedTVShowsList?.scrollHeight
    const scrollHeight = window.innerHeight + window.scrollY
    if (
      scrollHeight >= listHeight - 50 &&
      !this.topRatedTVShowsLoading &&
      this.topRatedTVShowsPage <= 5
    ) {
      this.fetchTopRatedTVShows()
    }
  },

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

  async selectMovie(id: number, type: string) {
    window.location.href = `/movie-detail.html?id=${id}`
  },

  async getRandomMovie() {
    this.randomMovieInfos = null
    this.randomMoviePicture = null

    if (!this.comingSoonMovies?.length) {
      return
    }

    this.randomMovieInfos =
      this.comingSoonMovies[
        Math.floor(Math.random() * this.comingSoonMovies.length)
      ]

    const imagesResponse = await fetch(
      `${this.apiUrl}/movie/${this.randomMovieInfos?.id}/images?api_key=${this.apiKey}`
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

  getPosterUrl(path: string) {
    return `https://image.tmdb.org/t/p/w500${path}`
  },

  getProfileUrl(path: string) {
    return `https://media.themoviedb.org/t/p/w470_and_h470_face${path}`
  }
})
