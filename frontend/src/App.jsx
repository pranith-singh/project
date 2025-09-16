import { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi';
import TodoItem from './components/TodoItem';
import './index.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text) return;
    const res = await createTodo({ text });
    setTodos([...todos, res.data]);
    setText('');
  };

  const toggleTodo = async (todo) => {
    const res = await updateTodo(todo._id, { completed: !todo.completed });
    setTodos(todos.map(t => t._id === todo._id ? res.data : t));
  };

  const removeTodo = async (todo) => {
    await deleteTodo(todo._id);
    setTodos(todos.filter(t => t._id !== todo._id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 flex-1 mr-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 rounded" onClick={addTodo}>Add</button>
      </div>
      <div>
        {todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} onToggle={toggleTodo} onDelete={removeTodo}/>
        ))}
      </div>
    </div>
  );
}
