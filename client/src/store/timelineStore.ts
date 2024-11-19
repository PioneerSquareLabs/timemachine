import create from 'zustand';
import { TimelineState, Choice, TimelineEvent } from '../types/types';
import { generateTimeline } from '../services/openaiService';

const useTimelineStore = create<TimelineState>((set) => ({
  choices: [],
  timelineEvents: [],
  isLoading: false,
  error: null,

  addChoice: (choice: Choice) => set((state) => ({
    choices: [...state.choices, choice]
  })),

  updateChoice: (index: number, choice: Choice) => set((state) => ({
    choices: state.choices.map((c, i) => i === index ? choice : c)
  })),

  removeChoice: (index: number) => set((state) => ({
    choices: state.choices.filter((_, i) => i !== index)
  })),

  setTimelineEvents: (events: TimelineEvent[]) => set({
    timelineEvents: events
  }),

  generateTimeline: async (choices: Choice[]) => {
    set({ isLoading: true, error: null });
    try {
      const events = await generateTimeline(choices);
      set({ timelineEvents: events, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred', isLoading: false });
    }
  },

  clearTimeline: () => set({
    timelineEvents: [],
    error: null
  }),

  reset: () => set({
    choices: [],
    timelineEvents: [],
    isLoading: false,
    error: null
  })
}));

export default useTimelineStore;

