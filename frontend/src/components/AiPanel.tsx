import { useState } from 'react';
import type { TodoSuggestion } from '../types/todo';
import AiSuggestionList from './AiSuggetionList';

interface AiPanelProps {
    onGenerate: (prompt: string) => Promise<void>;
    isGenerating: boolean;
    isCreating: boolean;
    suggestions: TodoSuggestion[];
    onImportSelected: (suggestions: TodoSuggestion[]) => Promise<void>;
}

function AiPanel({ onGenerate, isGenerating, isCreating, suggestions, onImportSelected }: AiPanelProps) {
    const [prompt, setPrompt] = useState('');
    const [selectedTitles, setSelectedTitles] =
        useState<Set<string>>(new Set());

    const handleToggleSelect = (title: string) => {
        setSelectedTitles((prevSelectedTitles) => {
        const newSelectedTitles = new Set(prevSelectedTitles);
        if (newSelectedTitles.has(title)) {
            newSelectedTitles.delete(title);
        } else {
            newSelectedTitles.add(title);
        }
        return newSelectedTitles;
        });
    };

    const handleImportSelected = async () => {
        const selectedSuggestions = suggestions.filter((suggestion) =>
            selectedTitles.has(suggestion.title)
        );
        
        try {
            await onImportSelected(selectedSuggestions);
            setSelectedTitles(new Set());
        } catch (error) {
            console.error(error);
        }
    };

    const handleGenerate = async () => {
        if (isGenerating) return;
        if (!prompt.trim()) return;
        try {
            await onGenerate(prompt.trim());
            setPrompt("");
            setSelectedTitles(new Set());
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <div className="ai-panel">
            <h2>🤖 AI Assistant</h2>
            <div className="ai-input">
                <input
                    type="text"
                    placeholder="Enter a prompt for AI to generate todos..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleGenerate();
                    }
                    }}
                    disabled={isGenerating}
                />
                <button onClick={handleGenerate} disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Generate Suggestions'}
                </button>
            </div>

            <div className="ai-suggestion-list">
                <AiSuggestionList 
                    suggestions={suggestions} 
                    selectedTitles={selectedTitles} 
                    onToggleSelect={handleToggleSelect} />
            </div>

            {selectedTitles.size > 0 && (
                <button onClick={handleImportSelected} disabled={selectedTitles.size === 0 || isCreating}>
                {isCreating ? 'Importing...' : 'Import Selected Todos'}
            </button>
            )}
            
        </div>
    );
}

export default AiPanel;