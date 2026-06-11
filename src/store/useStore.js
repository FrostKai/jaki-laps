import { create } from 'zustand'

const useStore = create((set) => ({
  isLoaded: false,
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  activeWorld: 'foundation',
  setActiveWorld: (world) => set({ activeWorld: world }),
  uiVisible: true,
  setUiVisible: (visible) => set({ uiVisible: visible }),
}))

export default useStore
