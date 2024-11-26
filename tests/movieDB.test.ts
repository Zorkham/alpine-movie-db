import Alpine from 'alpinejs'
import { jest } from '@jest/globals'
import { movieDB } from '../src/components/movieDB'

// Mock Alpine.$persist
Alpine.$persist = (value: any) => value

describe('movieDB', () => {
  let instance: ReturnType<typeof movieDB>

  beforeEach(() => {
    instance = movieDB()
  })

  it('should initialize with default values', () => {
    expect(instance.search).toBe('')
    expect(instance.searchResults).toEqual([])
    expect(instance.popularMoviesLoading).toBe(false)
    expect(instance.topRatedMoviesLoading).toBe(false)
    expect(instance.popularTvShowsLoading).toBe(false)
    expect(instance.topRatedTvShowsLoading).toBe(false)
    expect(instance.popularPersonsLoading).toBe(false)
    expect(instance.popularMoviesPage).toBe(1)
    expect(instance.topRatedMoviesPage).toBe(1)
    expect(instance.popularTvShowsPage).toBe(1)
    expect(instance.topRatedTvShowsPage).toBe(1)
    expect(instance.popularPersonsPage).toBe(1)
    expect(instance.popularMovies).toEqual([])
    expect(instance.nowPlayingMovies).toEqual([])
    expect(instance.comingSoonMovies).toEqual([])
    expect(instance.topRatedMovies).toEqual([])
    expect(instance.popularTvShows).toEqual([])
    expect(instance.airingTodayTvShows).toEqual([])
    expect(instance.onTheAirTvShows).toEqual([])
    expect(instance.topRatedTvShows).toEqual([])
    expect(instance.popularPersons).toEqual([])
    expect(instance.randomMovieDetails).toBeNull()
    expect(instance.randomMoviePicture).toBeNull()
  })

  it('should clear search', () => {
    instance.search = 'test'
    // @ts-ignore
    instance.searchResults = [{ id: 1, title: 'Test Movie' }]
    instance.clearSearch()
    expect(instance.search).toBe('')
    expect(instance.searchResults).toEqual([])
  })

  it('should fetch search results', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ results: [{ id: 1, title: 'Test Movie' }] })
      })
    ) as jest.Mock

    instance.search = 'test'
    await instance.fetchSearchResults()
    expect(instance.searchResults).toEqual([{ id: 1, title: 'Test Movie' }])
  })

  it('should fetch popular movies', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ results: [{ id: 1, title: 'Popular Movie' }] })
      })
    ) as jest.Mock

    await instance.fetchPopularMovies()
    expect(instance.popularMovies).toEqual([{ id: 1, title: 'Popular Movie' }])
    expect(instance.popularMoviesPage).toBe(2)
  })

  it('should fetch now playing movies', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ results: [{ id: 1, title: 'Now Playing Movie' }] })
      })
    ) as jest.Mock

    await instance.fetchNowPlayingMovies()
    expect(instance.nowPlayingMovies).toEqual([
      { id: 1, title: 'Now Playing Movie' }
    ])
  })

  it('should fetch coming soon movies', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ results: [{ id: 1, title: 'Coming Soon Movie' }] })
      })
    ) as jest.Mock

    await instance.fetchComingSoonMovies()
    expect(instance.comingSoonMovies).toEqual([
      { id: 1, title: 'Coming Soon Movie' }
    ])
  })

  it('should fetch top rated movies', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ results: [{ id: 1, title: 'Top Rated Movie' }] })
      })
    ) as jest.Mock

    await instance.fetchTopRatedMovies()
    expect(instance.topRatedMovies).toEqual([
      { id: 1, title: 'Top Rated Movie' }
    ])
    expect(instance.topRatedMoviesPage).toBe(2)
  })

  it('should fetch popular tv shows', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ results: [{ id: 1, title: 'Popular TV Show' }] })
      })
    ) as jest.Mock

    await instance.fetchPopularTvShows()
    expect(instance.popularTvShows).toEqual([
      { id: 1, title: 'Popular TV Show' }
    ])
    expect(instance.popularTvShowsPage).toBe(2)
  })

  it('should fetch airing today tv shows', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [{ id: 1, title: 'Airing Today TV Show' }]
          })
      })
    ) as jest.Mock

    await instance.fetchAiringTodayTvShows()
    expect(instance.airingTodayTvShows).toEqual([
      { id: 1, title: 'Airing Today TV Show' }
    ])
  })

  it('should fetch on the air tv shows', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ results: [{ id: 1, title: 'On The Air TV Show' }] })
      })
    ) as jest.Mock

    await instance.fetchOnTheAirTvShows()
    expect(instance.onTheAirTvShows).toEqual([
      { id: 1, title: 'On The Air TV Show' }
    ])
  })

  it('should fetch top rated tv shows', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ results: [{ id: 1, title: 'Top Rated TV Show' }] })
      })
    ) as jest.Mock

    await instance.fetchTopRatedTvShows()
    expect(instance.topRatedTvShows).toEqual([
      { id: 1, title: 'Top Rated TV Show' }
    ])
    expect(instance.topRatedTvShowsPage).toBe(2)
  })

  it('should fetch popular persons', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ results: [{ id: 1, name: 'Popular Person' }] })
      })
    ) as jest.Mock

    await instance.fetchPopularPersons()
    expect(instance.popularPersons).toEqual([{ id: 1, name: 'Popular Person' }])
    expect(instance.popularPersonsPage).toBe(2)
  })

  it('should get random movie', async () => {
    // @ts-ignore
    instance.comingSoonMovies = [{ id: 1, title: 'Coming Soon Movie' }]
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ backdrops: [{ file_path: '/path.jpg' }] })
      })
    ) as jest.Mock

    await instance.getRandomMovie()
    expect(instance.randomMovieDetails).toEqual({
      id: 1,
      title: 'Coming Soon Movie'
    })
    expect(instance.randomMoviePicture).toBe(
      'https://image.tmdb.org/t/p/original/path.jpg'
    )
  })

  it('should get poster URL', () => {
    const url = instance.getPosterUrl('/path.jpg')
    expect(url).toBe('https://image.tmdb.org/t/p/w500/path.jpg')
  })

  it('should get profile URL', () => {
    const url = instance.getProfileUrl('/path.jpg')
    expect(url).toBe(
      'https://media.themoviedb.org/t/p/w470_and_h470_face/path.jpg'
    )
  })
})
