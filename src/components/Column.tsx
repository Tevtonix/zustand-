import type { Column as ColumnType, Task } from '../types';
import TaskCard from './TaskCard';
import { useTaskStore } from '../store/useTaskStore';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

const Column = ({ column, tasks }: ColumnProps) => {
  const { moveTask, removeColumn } = useTaskStore();
  const isEmpty = tasks.length === 0;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const fromColumnId = e.dataTransfer.getData('fromColumnId');
    if (taskId && fromColumnId !== column.id) {
      moveTask(taskId, fromColumnId, column.id);
    }
  };

  return (
    <div
      style={{
        background: '#f0f2f5',
        borderRadius: '8px',
        padding: '12px',
        minWidth: '250px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <h3 style={{ margin: 0, textAlign: 'center', color: '#333', flex: 1 }}>
          {column.title}
        </h3>
        <button
          type="button"
          title={isEmpty ? 'Удалить колонку' : 'Колонка содержит задачи'}
          disabled={!isEmpty}
          onClick={() => removeColumn(column.id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: isEmpty ? 'pointer' : 'not-allowed',
            opacity: isEmpty ? 1 : 0.3,
            fontSize: '18px',
            padding: '4px 8px',
            borderRadius: '4px',
            color: '#c0392b',
            transition: 'opacity 0.2s',
          }}
        >
          
        </button>
      </div>

      <div style={{ flex: 1 }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;