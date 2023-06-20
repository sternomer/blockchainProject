import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      setBlocks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const mineBlock = async () => {
    console.log('hiiiiiiiiiiiiiiiiiii');
    try {
      const response = await axios.post('http://localhost:3000/', { data: 'Block Data' });
      setBlocks(prevBlocks => [...prevBlocks, response.data]);
      console.log('hiiii');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Blockchain App</h1>
      <button onClick={mineBlock}>Mine Block</button>
      <h2>Blocks:</h2>
      <ul>
        {blocks.map(block => (
          <li key={block.index}>
            <p>Index: {block.index}</p>
            <p>Timestamp: {block.timestamp}</p>
            <p>Data: {block.data}</p>
            <p>Hash: {block.hash}</p>
            <p>Previous Hash: {block.previousHash}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;