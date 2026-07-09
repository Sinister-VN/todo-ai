import { useState } from "react";

interface TodoInputProps {
  onAddTodo: (todo: string) => void;
}

function TodoInput({ onAddTodo }: TodoInputProps) {
  const [todo, setTodo] = useState("");

  const handleAddTodo = () => {
    if (!todo.trim()) return;

    onAddTodo(todo);
    setTodo("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>
        Add
      </button>
    </div>
  );
}

export default TodoInput;
