import type { TodoSuggestion } from '../types/todo';

interface AiSuggestionItemProps {
  suggestion: TodoSuggestion;
  isSelected: boolean;
  onToggleSelect: (title: string) => void;
}

function AiSuggestionItem({ suggestion, isSelected, onToggleSelect }: AiSuggestionItemProps) {
    const priorityLabel: Record<number, string> = {
        1: "High",
        2: "Medium",
        3: "Low",
    };
  return (
    <div className={`ai-suggestion-item ${isSelected ? 'selected' : ''}`}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(suggestion.title)}
      />
      <h3>{suggestion.title}</h3>
      <p>{suggestion.reason}</p>
      <p>Priority: {priorityLabel[suggestion.priority] ?? 'Unknown'}</p>
    </div>
  );
}

export default AiSuggestionItem;

