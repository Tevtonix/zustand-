import Board from './components/Board';

function App() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '16px 0',
        }}
      >
        <h1 style={{ margin: 0 }}>TaskFlow</h1>
        <button
          type="button"
          style={{
            padding: '6px 14px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => {}}
        >
          + Добавить задачу
        </button>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
      <Board />
    </div>
  );
}

export default App;