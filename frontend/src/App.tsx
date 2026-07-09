import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { useState } from 'react';
import type { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleAddTodo = (todo: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title: todo,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }
  return (
    <div>
      <Header title="Todo App" />

      <TodoInput onAddTodo={handleAddTodo} />
      
      <TodoList todos={todos} />

      

    </div>
  );
}

export default App;