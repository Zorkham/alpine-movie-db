import Alpine from 'alpinejs'
import { feedback } from '../src/stores/feedback'
import { navigation } from '../src/components/navigation'
import persist from '@alpinejs/persist'
import { planner } from '../src/components/planner'

// Mock the stores
jest.mock('../src/stores/feedback')

// Mock the components
jest.mock('../src/components/navigation')
jest.mock('../src/components/planner')

describe('Alpine.js initialization', () => {
  beforeAll(() => {
    // Mock the Alpine.js plugin and data methods
    Alpine.plugin = jest.fn()
    Alpine.store = jest.fn()
    Alpine.data = jest.fn()
    Alpine.start = jest.fn()
  })

  it('should register the persist plugin', () => {
    require('../src/main')
    expect(Alpine.plugin).toHaveBeenCalledWith(persist)
  })

  it('should register the feedback store', () => {
    require('../src/main')
    expect(Alpine.store).toHaveBeenCalledWith('feedback', feedback)
  })

  it('should register the navigation component', () => {
    require('../src/main')
    expect(Alpine.data).toHaveBeenCalledWith('navigation', navigation)
  })

  it('should register the planner component', () => {
    require('../src/main')
    expect(Alpine.data).toHaveBeenCalledWith('planner', planner)
  })

  it('should expose Alpine globally', () => {
    require('../src/main')
    expect(window.Alpine).toBe(Alpine)
  })

  it('should start Alpine.js', () => {
    require('../src/main')
    expect(Alpine.start).toHaveBeenCalled()
  })
})
