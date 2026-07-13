import Header from './components/Header';
import TodoList from './components/TodoList';
import { useEffect, useState } from 'react';
import type { Todo, CreateTodoRequest, UpdateTodoRequest, TodoSuggestion } from './types/todo';
import { todoService } from './services/todo.service';
import AiPanel from './components/AiPanel';
import './App.css';


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [suggestions, setSuggestions] = useState<TodoSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleGenerateSuggestions = async (prompt: string) => {
    try {
      setIsGenerating(true);
      const generatedTodos = await todoService.generate(prompt);
      setSuggestions(generatedTodos);
    } catch (error) {
        console.error(error);
    } finally {
        setIsGenerating(false);
    }
  };
  const handleImportSelected = async (
        suggestions: TodoSuggestion[],
    ) => {
        setIsCreating(true);
        try {
          const createdTodos = await Promise.all(
            suggestions.map((suggestion) =>
              todoService.create({
                title: suggestion.title,
              }),
            ),
          );
        
          setTodos((prevTodos) => [...prevTodos, ...createdTodos]);
          setSuggestions((prevSuggestions) =>
            prevSuggestions.filter(
              (suggestion) =>
                !suggestions.some(
                  (selected) => selected.title === suggestion.title,
                ),
            ),
          );
        } catch (error) {
            console.error(error);
        } finally {
            setIsCreating(false);
        }
    };


  return (
    <main className="container">
      <Header/>

      <section className="card">
        <AiPanel 
        onGenerate={handleGenerateSuggestions} 
        isGenerating={isGenerating} 
        suggestions={suggestions}
        onImportSelected={handleImportSelected} 
        isCreating={isCreating} />
      </section>

      <section className="card">
        <TodoList 
        todos={todos} 
        onUpdate={handleUpdateTodo} 
        onRemove={handleRemoveTodo} 
        actionState={actionState} 
        onCreate={handleCreateTodo} 
        isCreating={isCreating} />  
      </section>

    </main>
  );
}

export default App;