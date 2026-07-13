import type { TodoSuggestion } from '../types/todo';
import AiSuggestionItem from './AiSuggestionItem';

interface AiSuggestionListProps {
  suggestions: TodoSuggestion[];
  selectedTitles: Set<string>;
  onToggleSelect: (title: string) => void;
}

function AiSuggestionList({ suggestions, selectedTitles, onToggleSelect }: AiSuggestionListProps) {
    if (suggestions.length === 0) {
        return <p>No AI suggestions yet. Please enter a prompt and generate suggestions.</p>;
    }

  return (
    <div className="ai-suggestion-list">
        {suggestions.map((suggestion) => (
              <AiSuggestionItem 
                key={suggestion.title} 
                suggestion={suggestion} 
                isSelected={selectedTitles.has(suggestion.title)}
                onToggleSelect={onToggleSelect}
          />
        ))}
    </div>
  );
}

export default AiSuggestionList;