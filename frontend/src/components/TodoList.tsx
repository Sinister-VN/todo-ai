import TodoItem from './TodoItem';
import type { Todo, UpdateTodoRequest} from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, request: UpdateTodoRequest) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
  actionState: Record<number, 'updating' | 'removing' | null>;
}

function TodoList({ todos, onUpdate, onRemove, actionState }: TodoListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onRemove={onRemove} actionState={actionState} />
        ))}
      </tbody>
    </table>
  );
}

export default TodoList;
