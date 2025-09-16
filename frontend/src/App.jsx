import { useState, useEffect } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api/todoApi";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Load todos when app starts
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    const todo = await addTodo({ title: newTodo, completed: false });
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const handleToggle = async (id, completed) => {
    const updated = await updateTodo(id, { completed: !completed });
    setTodos(todos.map((t) => (t._id === id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">✅ My Todo App</h1>
      
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="border p-2 rounded"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={() => handleToggle(todo._id, todo.completed)}
            onDelete={() => handleDelete(todo._id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
