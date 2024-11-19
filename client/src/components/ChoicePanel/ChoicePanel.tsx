import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useTimelineStore from '../../store/timelineStore';
import { Choice } from '../../types/types';

export const ChoicePanel: React.FC = () => {
  const { choices, addChoice, updateChoice, removeChoice, generateTimeline, isLoading } = useTimelineStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleAddChoice = () => {
    if (choices.length < 3) {
      const newChoice: Choice = {
        id: uuidv4(),
        title: '',
        description: '',
        parameters: [],
        duration: ''
      };
      addChoice(newChoice);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (choices.length > 0) {
      await generateTimeline(choices);
    }
  };

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-1/3'} bg-white shadow-lg`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
      >
        {isCollapsed ? '→' : '←'}
      </button>
      
      {!isCollapsed && (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <h2 className="text-2xl font-bold mb-6">Timeline Choices</h2>
          
          {choices.map((choice, index) => (
            <div key={choice.id} className="space-y-4 p-4 border rounded">
              <input
                type="text"
                placeholder="Choice Title"
                value={choice.title}
                onChange={(e) => updateChoice(index, { ...choice, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={choice.description}
                onChange={(e) => updateChoice(index, { ...choice, description: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Timeline Duration"
                value={choice.duration}
                onChange={(e) => updateChoice(index, { ...choice, duration: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeChoice(index)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          
          {choices.length < 3 && (
            <button
              type="button"
              onClick={handleAddChoice}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Choice
            </button>
          )}
          
          <button
            type="submit"
            disabled={isLoading || choices.length === 0}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {isLoading ? 'Generating...' : 'Generate Timeline'}
          </button>
        </form>
      )}
    </div>
  );
};

