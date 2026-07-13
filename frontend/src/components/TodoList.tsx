import TodoItem from './TodoItem';
import type { CreateTodoRequest, Todo, UpdateTodoRequest} from "../types/todo";
import TodoInput from './TodoInput';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, request: UpdateTodoRequest) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
  actionState: Record<number, 'updating' | 'removing' | null>;
  onCreate: (request: CreateTodoRequest) => Promise<void>;
  isCreating: boolean;
}

function TodoList({ todos, onUpdate, onRemove, actionState, onCreate, isCreating }: TodoListProps) {
  return (
    <div className="todo-list">
      <h2>Your Todos</h2>
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
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onUpdate={onUpdate} 
            onRemove={onRemove} 
            actionState={actionState} />
        ))}

          <TodoInput onCreate={onCreate} isCreating={isCreating} />
      </tbody>
      </table>
    </div>
    
  );
}

export default TodoList;
