import { useState, useRef, useEffect } from 'react';
import { FiMoreVertical, FiEdit3, FiTrash2 } from 'react-icons/fi';
import styles from './TaskCard.module.css';
import { useTaskStore } from '../store/useTaskStore';
import TaskFormModal from './TaskFormModal';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { columns, moveTaskLeft, moveTaskRight } = useTaskStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentIndex = columns.findIndex((col) => col.id === task.columnId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === columns.length - 1;

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <div
        className={styles.taskCard}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('taskId', task.id);
          e.dataTransfer.setData('fromColumnId', task.columnId);
        }}
      >
        <div className={styles.taskHeader}>
          <div style={{ position: 'relative' }} ref={menuRef}>
            <FiMoreVertical
              className={styles.dragIcon}
              size={18}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ cursor: 'pointer' }}
            />
            {isMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '0',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  zIndex: 10,
                  minWidth: '150px',
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    setIsMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  <FiEdit3 size={14} />
                  Редактировать
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  <FiTrash2 size={14} />
                  Удалить
                </button>
              </div>
            )}
          </div>
          <h4 className={styles.taskTitle}>{task.title}</h4>
        </div>
        <p className={styles.taskDescription}>{task.description}</p>

        <div className={styles.taskActions}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => setIsEditing(true)}
            title="Редактировать"
          >
            <FiEdit3 size={14} />
          </button>
          <button
            type="button"
            className={styles.actionButton}
            disabled={isFirst}
            onClick={() => moveTaskLeft(task.id)}
            title="Переместить влево"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.actionButton}
            disabled={isLast}
            onClick={() => moveTaskRight(task.id)}
            title="Переместить вправо"
          >
            →
          </button>
        </div>
      </div>

      {isEditing && <TaskFormModal task={task} onClose={() => setIsEditing(false)} />}
    </>
  );
};

export default TaskCard;