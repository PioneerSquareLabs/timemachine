'use client'

import { useState } from 'react'
import ReactFlow, { 
  Background, 
  Controls, 
  Edge,
  Node,
  Position,
  MarkerType 
} from 'reactflow'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from 'lucide-react'
import 'reactflow/dist/style.css'

// Custom Node Component
function TimelineNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg border bg-card text-card-foreground">
      <h3 className="font-semibold">{data.label}</h3>
      <p className="text-sm text-muted-foreground">{data.description}</p>
    </div>
  )
}

const nodeTypes = {
  timelineNode: TimelineNode,
}

export default function Component() {
  const [loading, setLoading] = useState(false)
  const [timeRange, setTimeRange] = useState('days')
  const [eventType, setEventType] = useState('personal')
  const [initialConditions, setInitialConditions] = useState('')
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  // Function to generate timeline using OpenAI
  const generateTimeline = async () => {
    setLoading(true)
    try {
      // This would be your actual API call to OpenAI
      // For demo, creating mock data
      const mockNodes: Node[] = [
        {
          id: '1',
          type: 'timelineNode',
          position: { x: 0, y: 0 },
          data: { 
            label: 'Initial State',
            description: initialConditions 
          }
        },
        {
          id: '2',
          type: 'timelineNode',
          position: { x: 200, y: -50 },
          data: { 
            label: 'Positive Outcome',
            description: 'Things go well' 
          }
        },
        {
          id: '3',
          type: 'timelineNode',
          position: { x: 200, y: 50 },
          data: { 
            label: 'Negative Outcome',
            description: 'Challenges arise' 
          }
        },
        {
          id: '4',
          type: 'timelineNode',
          position: { x: 400, y: -50 },
          data: { 
            label: 'Final State A',
            description: 'Success achieved' 
          }
        },
        {
          id: '5',
          type: 'timelineNode',
          position: { x: 400, y: 50 },
          data: { 
            label: 'Final State B',
            description: 'Alternative path' 
          }
        },
      ]

      const mockEdges: Edge[] = [
        {
          id: 'e1-2',
          source: '1',
          target: '2',
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed },
        },
        {
          id: 'e1-3',
          source: '1',
          target: '3',
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed },
        },
        {
          id: 'e2-4',
          source: '2',
          target: '4',
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed },
        },
        {
          id: 'e3-5',
          source: '3',
          target: '5',
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed },
        },
      ]

      setNodes(mockNodes)
      setEdges(mockEdges)
    } catch (error) {
      console.error('Error generating timeline:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Input Pane */}
      <div className="w-96 p-6 border-r">
        <h1 className="text-2xl font-bold mb-6">TimeMachine</h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Time Range</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="weeks">Weeks</SelectItem>
                <SelectItem value="months">Months</SelectItem>
                <SelectItem value="years">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Event Type</Label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="experiment">Thought Experiment</SelectItem>
                <SelectItem value="funny">Funny</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Initial Conditions</Label>
            <Textarea 
              placeholder="Describe your starting point..."
              value={initialConditions}
              onChange={(e) => setInitialConditions(e.target.value)}
              className="h-32"
            />
          </div>

          <Button 
            className="w-full" 
            onClick={generateTimeline}
            disabled={loading || !initialConditions}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Timeline...
              </>
            ) : (
              'Generate Timeline'
            )}
          </Button>
        </div>
      </div>

      {/* Right Timeline Pane */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background"
        >
          <Background />
          <Controls />
        </ReactFlow>
        
        {/* Time Axis */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-muted/50 backdrop-blur-sm border-t flex items-center px-6">
          <div className="flex-1 flex justify-between">
            {timeRange === 'years' ? (
              <>
                <span>2024</span>
                <span>2025</span>
                <span>2026</span>
                <span>2027</span>
                <span>2028</span>
                <span>2029</span>
              </>
            ) : (
              <>
                <span>Start</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>End</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}