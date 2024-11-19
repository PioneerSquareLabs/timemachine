import { Request, Response } from 'express';
import { generateTimelineEvents } from '../services/openaiService';
import { Choice, TimelineEvent } from '../types/types';

export const generateTimeline = async (req: Request, res: Response) => {
  try {
    const { choices } = req.body as { choices: Choice[] };
    
    if (!choices || !Array.isArray(choices) || choices.length === 0) {
      return res.status(400).json({ message: 'Invalid choices provided' });
    }

    const timelineEvents = await generateTimelineEvents(choices);
    res.json(timelineEvents);
  } catch (error) {
    console.error('Error generating timeline:', error);
    res.status(500).json({ message: 'Failed to generate timeline' });
  }
};

