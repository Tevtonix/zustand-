import { useTaskStore } from '../store/useTaskStore';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { columns, moveTaskLeft, moveTaskRight } = useTaskStore();

  const currentIndex = columns.findIndex((col) => col.id === task.columnId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === columns.length - 1;

  const buttonStyle: React.CSSProperties = {
    background: 'none',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '2px 8px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#333',
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    opacity: 0.4,
    cursor: 'not-allowed',
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '4px',
        padding: '8px',
        marginBottom: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        cursor: 'grab',
      }}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', task.id);
        e.dataTransfer.setData('fromColumnId', task.columnId);
      }}
    >
      <h4 style={{ margin: '0 0 4px' }}>{task.title}</h4>
      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
        {task.description}
      </p>
      <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
        <button
          type="button"
          style={isFirst ? disabledButtonStyle : buttonStyle}
          disabled={isFirst}
          onClick={() => moveTaskLeft(task.id)}
          title="Переместить влево"
        >
          ←
        </button>
        <button
          type="button"
          style={isLast ? disabledButtonStyle : buttonStyle}
          disabled={isLast}
          onClick={() => moveTaskRight(task.id)}
          title="Переместить вправо"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default TaskCard;