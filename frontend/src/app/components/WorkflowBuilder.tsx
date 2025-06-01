'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import StepCard from './StepCard';
import StepConfigurator from './StepConfigurator';

export default function WorkflowBuilder() {
  const [steps, setSteps] = useState<any[]>([]);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);

  const addStep = (type: string) => {
    const newStep = { id: uuidv4(), type, config: {} };
    setSteps((prev) => [...prev, newStep]);
  };

  const removeStep = (id: string) => {
    setSteps((prev) => prev.filter((step) => step.id !== id));
  };
  const handleDeleteStep = (id: string) => {
    setSteps((prev) => prev.filter((step) => step.id !== id));
  };
  
  const updateStep = (updatedStep: any) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === updatedStep.id ? updatedStep : step))
    );
  };

  const saveWorkflow = () => {
    console.log('Saving workflow:', steps);
    alert('Workflow saved!');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Workflow Builder</h1>

      {/* Step Controls */}
      <div className="mb-4 flex gap-4">
        {['email', 'delay', 'notify', 'condition', 'loop'].map((type) => (
          <button
            key={type}
            onClick={() => addStep(type)}
            className="px-4 py-2 rounded text-white font-semibold"
            style={{ backgroundColor: '#6366f1' }}
          >
            + {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
        
        <StepCard
        key={step.id}
        step={step}
        onClick={() => setSelectedStep(step)}
        onDelete={(id) => handleDeleteStep(id)}
      />
      

        ))}
      </div>

      {steps.length > 0 && (
        <button
          onClick={saveWorkflow}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded"
        >
          Save Workflow
        </button>
      )}

      {/* Modal for Step Config */}
      {selectedStepIndex !== null && (
        <StepConfigurator
          step={steps[selectedStepIndex]}
          onClose={() => setSelectedStepIndex(null)}
          onSave={(updatedStep) => {
            updateStep(updatedStep);
            setSelectedStepIndex(null);
          }}
        />
      )}
    </div>
  );
}
