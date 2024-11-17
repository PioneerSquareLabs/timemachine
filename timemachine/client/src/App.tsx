import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Timeline Decision Visualization</h1>
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Choice Input */}
          <div className="col-span-4 bg-card rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Make a Choice</h2>
            {/* Choice form will go here */}
          </div>

          {/* Right Panel - Timeline Visualization */}
          <div className="col-span-8 bg-card rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Timeline View</h2>
            {/* React Flow component will go here */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
