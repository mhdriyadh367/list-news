import { defineStore } from 'pinia'

export const useSegmentStore = defineStore({
  id: 'segment',
  state: () => ({
    segment: null
  }),
  getters: {
    getSegment: (state) => state.segment
  },
  actions: {
    setSegment(segment) {
      this.segment = segment
    }
  }
})
