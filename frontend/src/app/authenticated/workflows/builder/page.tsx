'use client';

import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';

import StepCard from '@/app/components/StepCard';
import StepConfigurator from '@/app/components/StepConfigurator';

type StepType = 'email' | 'delay' | 'notify' | 'loop' | 'condition';

type WorkflowStep = {
  id: string;
  type: StepType;
  config: Record<string, any>;
  configured?: boolean;
};

export default function WorkflowBuilderPage() {
  const [workflowName, setWorkflowName] = useState('');
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);

  const handleAddStep = (type: StepType) => {
    setSteps(prev => [...prev, { id: uuidv4(), type, config: {}, configured: false }]);
  };

  const handleDeleteStep = (id: string) => {
    setSteps(prev => prev.filter(step => step.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = steps.findIndex(step => step.id === active.id);
    const newIndex = steps.findIndex(step => step.id === over.id);
    setSteps(arrayMove(steps, oldIndex, newIndex));
  };

  const handleSubmit = () => {
    const valid = steps.every(step => step.configured);
    if (!valid) {
      alert('⚠️ Some steps are not configured!');
      return;
    }

    console.log('🚀 Submitting workflow:', {
      name: workflowName,
      steps,
    });

    // TODO: send to backend
  };

  const handleStepSave = (updatedStep: WorkflowStep) => {
    setSteps(prev =>
      prev.map(step => (step.id === updatedStep.id ? { ...updatedStep, configured: true } : step))
    );
    setSelectedStep(null);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-3xl font-bold mb-4">Build Your Workflow</h1>

        <input
          type="text"
          placeholder="Workflow name"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        {/* Sortable steps */}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={steps.map(s => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <StepCard
                  key={step.id}
                  step={step}
                  onClick={() => setSelectedStep(step)}
                  onDelete={() => handleDeleteStep(step.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Add Step Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          {(['email', 'delay', 'notify', 'condition', 'loop'] as StepType[]).map(type => (
            <button
              key={type}
              onClick={() => handleAddStep(type)}
              className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
            >
              ➕ Add {type.charAt(0).toUpperCase() + type.slice(1)} Step
            </button>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSubmit}
          className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded"
        >
          Save Workflow
        </button>
      </div>

      {/* Configurator Modal */}
      {selectedStep && (
        <StepConfigurator
          step={selectedStep}
          onClose={() => setSelectedStep(null)}
          onSave={handleStepSave}
        />
      )}
    </div>
  );
}
