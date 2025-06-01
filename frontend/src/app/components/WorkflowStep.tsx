import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaTrash } from 'react-icons/fa';

export default function WorkflowStep({ step, onClick, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  const statusColor = step.configured ? 'text-green-500' : 'text-yellow-500';
  const statusText = step.configured ? 'Configured' : 'Not configured';

  const icons = {
    email: '📧',
    delay: '⏱️',
    notify: '🔔',
    condition: '🧠',
    loop: '🔁',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded shadow p-4 border-l-4 border-blue-400 mb-4 flex justify-between items-center hover:shadow-md"
      onClick={() => onClick(step)}
    >
      <div>
        <div className="flex items-center space-x-2 text-lg font-semibold capitalize">
          <span>{icons[step.type]}</span>
          <span>{step.type}</span>
        </div>
        <p className={`text-sm ${statusColor}`}>⚠ {statusText}</p>
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent triggering onClick
          onDelete(step.id);
        }}
        className="text-red-500 hover:text-red-700"
        title="Delete Step"
      >
        <FaTrash />
      </button>
    </div>
  );
}
