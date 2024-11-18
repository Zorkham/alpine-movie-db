import Alpine from 'alpinejs'

export const navigation = () => ({
  currentTab: Alpine.$persist('board') as unknown as string,

  scrollToTop() {
    window?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  },

  // Change the current tab
  changeTab(tab: string) {
    this.currentTab = tab
    this.scrollToTop()
  }
})
