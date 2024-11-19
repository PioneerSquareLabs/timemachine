import axios from 'axios';
import { Choice, TimelineEvent } from '../types/types';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const generateTimeline = async (choices: Choice[]): Promise<TimelineEvent[]> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-timeline`, { choices });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to generate timeline');
    }
    throw error;
  }
};

