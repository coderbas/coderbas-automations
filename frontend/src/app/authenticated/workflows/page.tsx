'use client';

import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';

import StepSidebar from '../../components/StepSidebar';
import WorkflowStep from '../../components/WorkflowStep';
import StepConfigurator from '../../components/StepConfigurator';

type WorkflowStepType = {
  id: string;
  type: 'email' | 'delay' | 'notify';
  config: Record<string, any>;
};

export default function WorkflowBuilder() {
  const [steps, setSteps] = useState<WorkflowStepType[]>([]);
  const [selectedStep, setSelectedStep] = useState<WorkflowStepType | null>(null);

  const addStep = (type: WorkflowStepType['type']) => {
    const newStep = { id: uuidv4(), type, config: {} };
    setSteps((prev) => [...prev, newStep]);
  };

  const handleReorder = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = steps.findIndex((s) => s.id === active.id);
      const newIndex = steps.findIndex((s) => s.id === over.id);
      setSteps(arrayMove(steps, oldIndex, newIndex));
    }
  };

  const saveWorkflow = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      name: 'My Workflow',
      steps,
    };

    const res = await fetch('/api/workflows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log('Workflow saved:', result);
  };

  const handleStepUpdate = (updatedStep: WorkflowStepType) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === updatedStep.id ? updatedStep : step))
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <StepSidebar onAddStep={addStep} />

      {/* Builder Area */}
      <div className="flex-1 p-6 overflow-auto bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Workflow Builder</h2>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleReorder}>
          <SortableContext items={steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  onClick={() => setSelectedStep(step)}
                  className="bg-white border p-4 rounded shadow cursor-pointer"
                >
                  <WorkflowStep step={step} />
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <button
          onClick={saveWorkflow}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Save Workflow
        </button>
      </div>

      {/* Config Modal */}
      {selectedStep && (
        <StepConfigurator
          step={selectedStep}
          onClose={() => setSelectedStep(null)}
          onSave={(updatedStep) => {
            handleStepUpdate(updatedStep);
            setSelectedStep(null);
          }}
        />
      )}
    </div>
  );
}
