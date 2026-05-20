import { useState, useEffect } from 'react';
import './App.css';

const API = '';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [health, setHealth] = useState({});

  useEffect(() => {
    fetchHealth();
    fetchItems();
  }, []);

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setHealth(data);
    } catch (e) {
      setHealth({ status: 'Backend unreachable', mongo: 'disconnected' });
    }
  };

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/items');
      const data = await res.json();
      setItems(data);
    } catch (e) {}
  };

  const addItem = async () => {
    if (!name) return;
    await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    });
    setName('');
    setDescription('');
    fetchItems();
  };

  const deleteItem = async (id) => {
    await fetch('/api/items/' + id, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div className="App">
      <h1>DevOps 3-Tier App</h1>
      <div className="health">
        <h3>System Health</h3>
        <p>Backend: {health.status}</p>
        <p>MongoDB: {health.mongo}</p>
      </div>
      <div className="form">
        <h3>Add Item</h3>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button onClick={addItem}>Add</button>
      </div>
      <div className="items">
        <h3>Items ({items.length})</h3>
        {items.map(item => (
          <div key={item._id} className="item">
            <strong>{item.name}</strong>
            <p>{item.description}</p>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
