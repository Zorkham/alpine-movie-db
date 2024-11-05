import 'phosphor-icons'

import Alpine from 'alpinejs'
import { feedback } from './stores/feedback'
import { navigation } from './components/navigation'
import persist from '@alpinejs/persist'
import { planner } from './components/planner'

// Register Alpine plugins
Alpine.plugin(persist)

// Register Alpine stores
Alpine.store('feedback', feedback)

// Register Alpine components
Alpine.data('navigation', navigation)
Alpine.data('planner', planner)

// Extend the Window interface to include Alpine
declare global {
  interface Window {
    Alpine: typeof Alpine
  }
}

// Expose Alpine globally to avoid TypeScript errors and for console access
window.Alpine = Alpine

// Start Alpine.js
Alpine.start()
