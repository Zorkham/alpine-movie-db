import Alpine from 'alpinejs'
import { navigation } from '../src/components/navigation'

// Mock Alpine.$persist
Alpine.$persist = (value: any) => value

describe('navigation component', () => {
  let navigationInstance: ReturnType<typeof navigation>

  beforeEach(() => {
    window.scrollTo = jest.fn()
    navigationInstance = navigation()
  })

  it("should initialize with 'board' as the current tab", () => {
    expect(navigationInstance.currentTab).toBe('board')
  })

  it('should change the current tab', () => {
    navigationInstance.changeTab('list')
    expect(navigationInstance.currentTab).toBe('list')

    navigationInstance.changeTab('board')
    expect(navigationInstance.currentTab).toBe('board')
  })
})
