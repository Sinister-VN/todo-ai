import { useState } from "react";
import type { CreateTodoRequest } from "../types/todo";

interface TodoInputProps {
  onCreate: (request: CreateTodoRequest) => Promise<void>;
  isCreating: boolean;
}

function TodoInput({ onCreate, isCreating }: TodoInputProps) {
  const [todo, setTodo] = useState("");

  const handleCreateTodo = async () => {
    if (isCreating) return;
    if (!todo.trim()) return;

    try {
      await onCreate({ title: todo.trim() });

      setTodo("");
    } catch (error) {
      console.error(error);
    } 
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          style={{ width: "100%", border: "none", background: "transparent" }}
          placeholder="Add new todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreateTodo();
          }
        }}
        disabled={isCreating}
      />
      </td>
      <td></td>
      <td>
      <button onClick={handleCreateTodo} disabled={isCreating}>
        {isCreating ? "Adding..." : "Add"}
      </button>
      </td>
    </tr>
  );
}
export default TodoInput;
