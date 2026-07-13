import type { Todo, UpdateTodoRequest } from "../types/todo";

interface TodoItemProps {
    todo: Todo;
    onUpdate: (id: number, request: UpdateTodoRequest) => Promise<void>;
    onRemove: (id: number) => Promise<void>;
    actionState: Record<number, 'updating' | 'removing' | null>;
}

function TodoItem({ todo, onUpdate, onRemove, actionState }: TodoItemProps) {
    const updatingId = actionState[todo.id] === 'updating';
    const removingId = actionState[todo.id] === 'removing';
    const handleToggle = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        try {
            await onUpdate(todo.id, {
                completed: e.target.checked,
            });
        } catch (error) {
            console.error(error);
        } 
    };

    const handleRemove = async () => {
        try {
            await onRemove(todo.id);
        } catch (error) {
            console.error(error);
        } 
    };

    return (
    <tr>
        <td>{todo.title}</td>
        <td>
            <input
                type="checkbox"
                checked={todo.completed}
                disabled={updatingId}
                onChange={handleToggle}
            />
        </td>
        <td>
            <button onClick={handleRemove} disabled={removingId}>
                {removingId ? "Deleting..." : "Delete"}
            </button>
        </td>
    </tr>
    );
}

export default TodoItem;