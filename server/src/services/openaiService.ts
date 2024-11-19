import { Configuration, OpenAIApi } from 'openai';
import { Choice, TimelineEvent } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const generatePrompt = (choices: Choice[]): string => {
  const choicesText = choices.map(choice => 
    `Choice: ${choice.title}\nDescription: ${choice.description}\nDuration: ${choice.duration}`
  ).join('\n\n');

  return `Generate a detailed timeline of events based on these choices:\n\n${choicesText}\n\n` +
    'Consider:\n' +
    '1. Realistic probabilities\n' +
    '2. Both positive and negative outcomes\n' +
    '3. Interconnected consequences\n' +
    '4. Time-appropriate developments\n' +
    '5. Domain-specific factors\n\n' +
    'Format the response as a series of events with timestamps, descriptions, and probability percentages.';
};

export const generateTimelineEvents = async (choices: Choice[]): Promise<TimelineEvent[]> => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(choices),
      max_tokens: 1000,
      temperature: 0.7,
    });

    const text = response.data.choices[0]?.text || '';
    return parseOpenAIResponse(text, choices[0].id);
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate timeline events');
  }
};

const parseOpenAIResponse = (text: string, initialChoiceId: string): TimelineEvent[] => {
  const events: TimelineEvent[] = [];
  const lines = text.split('\n').filter(line => line.trim());

  let currentParentId = initialChoiceId;
  
  lines.forEach((line, index) => {
    if (line.includes(':')) {
      const event: TimelineEvent = {
        id: uuidv4(),
        type: index === 0 ? 'decision' : 'event',
        title: line.split(':')[0].trim(),
        description: line.split(':')[1].trim(),
        timestamp: new Date(Date.now() + index * 86400000).toISOString(),
        parentId: currentParentId,
        probability: Math.random() * 100
      };

      events.push(event);
      currentParentId = event.id;
    }
  });

  return events;
};