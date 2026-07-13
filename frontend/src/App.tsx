import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { useEffect, useState } from 'react';
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from './types/todo';
import { todoService } from './services/todo.service';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const [actionState, setActionState] = useState<
    Record<number, 'updating' | 'removing' | null>
  >({});

  useEffect(() => {
    // Fetch todos from the backend when the component mounts
    const fetchTodos = async () => {
      try {
        const response = await todoService.getAll();
        setTodos(response);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleUpdateTodo = async (id: number, request: UpdateTodoRequest) => {
    try {
      setActionState((prev) => ({ ...prev, [id]: 'updating' }));
      const updatedTodo = await todoService.update(id, request);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (
          todo.id === id ? 
          {...todo, 
          completed: updatedTodo.completed} : todo))
      );
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setActionState((prev) => ({ ...prev, [id]: null }));
    }
  };
  

  const handleCreateTodo = async (request: CreateTodoRequest) => {
    try {
      setIsCreating(true);
      const newTodo = await todoService.create(request);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const handleRemoveTodo = async (id: number) => {
    try {
      setActionState((prev) => ({ ...prev, [id]: 'removing' }));

      await todoService.remove(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setActionState((prev) => ({ ...prev, [id]: null }));
    }
  };


  return (
    <div>
      <Header title="Todo App" />

      <TodoInput onCreate={handleCreateTodo} isCreating={isCreating} />
      <TodoList todos={todos} onUpdate={handleUpdateTodo} onRemove={handleRemoveTodo} actionState={actionState} />

    </div>
  );
}

export default App;