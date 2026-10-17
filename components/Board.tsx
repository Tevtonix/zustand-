import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import styles from './Board.module.css';
import { useTaskStore } from '../store/useTaskStore';
import Column from './Column';

const Board = () => {
  const { tasks, columns, addColumn } = useTaskStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    const title = newTitle.trim();
    if (title) {
      addColumn(title);
      setNewTitle('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
    if (e.key === 'Escape') {
      setIsAdding(false);
      setNewTitle('');
    }
  };

  return (
    <div className={styles.board}>
      {columns.map((column) => {
        const columnTasks = column.taskIds
          .map((id) => tasks[id])
          .filter(Boolean);

        return (
          <Column
            key={column.id}
            column={column}
            tasks={columnTasks}
          />
        );
      })}

      <div style={{ minWidth: '300px' }}>
        {isAdding ? (
          <div
            style={{
              background: '#f4f5f7',
              borderRadius: '8px',
              padding: '12px',
            }}
          >
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Название колонки"
              autoFocus
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px',
                marginBottom: '8px',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={handleAdd}
                style={{
                  padding: '6px 12px',
                  background: '#4a90e2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Добавить
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setNewTitle('');
                }}
                style={{
                  padding: '6px 12px',
                  background: '#fff',
                  color: '#333',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className={styles.addColumnButton}
            onClick={() => setIsAdding(true)}
          >
            <FiPlus size={16} />
            Добавить колонку
          </button>
        )}
      </div>
    </div>
  );
};

export default Board;