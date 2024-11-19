export interface Choice {
  id: string;
  title: string;
  description: string;
  parameters: string[];
  duration: string;
}

export interface TimelineEvent {
  id: string;
  type: 'decision' | 'event' | 'consequence';
  title: string;
  description: string;
  timestamp: string;
  parentId?: string;
  probability?: number;
}

export interface TimelineState {
  choices: Choice[];
  timelineEvents: TimelineEvent[];
  isLoading: boolean;
  error: string | null;
  addChoice: (choice: Choice) => void;
  updateChoice: (index: number, choice: Choice) => void;
  removeChoice: (index: number) => void;
  setTimelineEvents: (events: TimelineEvent[]) => void;
  generateTimeline: (choices: Choice[]) => Promise<void>;
  clearTimeline: () => void;
  reset: () => void;
}

export interface TimelineNode {
  id: string;
  type: 'decision' | 'event' | 'consequence';
  data: TimelineEvent;
  position: { x: number; y: number };
}

export interface TimelineEdge {
  id: string;
  source: string;
  target: string;
  type: 'timeline' | 'cause-effect';
}

