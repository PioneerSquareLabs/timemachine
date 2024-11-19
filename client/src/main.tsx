import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChoicePanel } from './components/ChoicePanel/ChoicePanel';
import { TimelineFlow } from './components/TimelineFlow/TimelineFlow';
import './index.css';

const App = () => {
  return (
    <div className="flex h-screen">
      <ChoicePanel />
      <TimelineFlow />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

