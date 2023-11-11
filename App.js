import { useState } from 'react'
import './App.css'

function App() {
  // Your app code will go here
 const [todos, setTodos] = useState([])
 const [newTodo, setNewTodo] = useState('');
 const [updating, setUpdating] = useState(false); 

function addTodo() {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, update: false }])
      setNewTodo('')
    }
  }

  function updateTodo(id, newText) {
    setTodos(todos.map(todo => (todo.id === id ? {...todo, text: newText } : todo)))
  }
//started autofill
  function toggleTodo(id) {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
}

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
}

function toggleUpdating(id) {
  setUpdating(!updating)
  setTodos(todos.map(todo => (todo.id === id ? { ...todo, updating: !todo.updating } : todo)))
}

  return (
    <div className="App">
      <h1>React To-Do App</h1>
      <input
        type="text"
        placeholder="Add a new to-do"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        onKeyDown={e => (e.key === 'Enter' ? addTodo() : null)}
      />
      <ul>
        {todos.map(todo => (
          <li className="todo-item"  key={todo.id} >
            <div className="input-group">
            <input
              type="checkbox"
              disabled={todo.updating && updating ? true : false}
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.updating && updating ? (
              <input
                type="text"
                value={todo.text}
                onChange={e => updateTodo(todo.id, e.target.value)}
                onKeyDown={e => (e.key === 'Enter' ? toggleUpdating(todo.id) : null)}
              />
            ) : (
              <div 
                className='todo-item__text'
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              >
                {todo.text}
              </div>
            )
            }
            </div>
            <div className="btn-group">
              <button 
                disabled={(todo.updating && updating) || todo.completed ? true : false} 
                onClick={() => toggleUpdating(todo.id)}
              >
                Edit
              </button>
              <button 
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

} //closing of the app function

export default App
