export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-2 my-2 rounded">
      <span
        className={todo.completed ? "line-through text-gray-400" : ""}
        onClick={() => onToggle(todo)}
      >
        {todo.text}
      </span>
      <button className="bg-red-500 text-white px-2 rounded" onClick={() => onDelete(todo)}>
        Delete
      </button>
    </div>
  );
}
