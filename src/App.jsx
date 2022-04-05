import { useState } from 'react';
import './assets/css/reset.css';
import Todo from './components/Todo/Todo';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Todo />
    </div>
  )
}

export default App
