import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import useTimelineStore from '../../store/timelineStore';
import { TimelineEvent, TimelineNode, TimelineEdge } from '../../types/types';

const nodeTypes = {
  decision: ({ data }: { data: TimelineEvent }) => (
    <div className="p-4 bg-blue-100 border-2 border-blue-500 rounded">
      <h3 className="font-bold">{data.title}</h3>
      <p className="text-sm">{data.description}</p>
    </div>
  ),
  event: ({ data }: { data: TimelineEvent }) => (
    <div className="p-4 bg-green-100 border-2 border-green-500 rounded">
      <h3 className="font-bold">{data.title}</h3>
      <p className="text-sm">{data.description}</p>
      <p className="text-xs text-gray-500">{data.timestamp}</p>
    </div>
  ),
  consequence: ({ data }: { data: TimelineEvent }) => (
    <div className="p-4 bg-yellow-100 border-2 border-yellow-500 rounded">
      <h3 className="font-bold">{data.title}</h3>
      <p className="text-sm">{data.description}</p>
      <p className="text-xs">Probability: {data.probability}%</p>
    </div>
  ),
};

export const TimelineFlow: React.FC = () => {
  const timelineEvents = useTimelineStore((state) => state.timelineEvents);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const createNodesAndEdges = useCallback((events: TimelineEvent[]) => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    let yOffset = 0;

    events.forEach((event, index) => {
      const node: TimelineNode = {
        id: event.id,
        type: event.type,
        data: event,
        position: { x: 250, y: yOffset }
      };
      newNodes.push(node);
      yOffset += 150;

      if (event.parentId) {
        const edge: TimelineEdge = {
          id: `${event.parentId}-${event.id}`,
          source: event.parentId,
          target: event.id,
          type: 'timeline'
        };
        newEdges.push(edge);
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [setNodes, setEdges]);

  React.useEffect(() => {
    createNodesAndEdges(timelineEvents);
  }, [timelineEvents, createNodesAndEdges]);

  return (
    <div className="w-2/3 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

