import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TodoSuggestion } from './types/todo-suggestion.interface';
import { TODO_GENERATION_PROMPT } from './prompts/todo-generation.prompt';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService {
  private readonly ai: GoogleGenAI;
  private readonly model: string;
  private readonly logger = new Logger(AiService.name);
  constructor(private configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>('GEMINI_API_KEY');

    this.model =
      this.configService.get<string>('GEMINI_MODEL') ?? 'gemini-2.5-flash';

    this.ai = new GoogleGenAI({
      apiKey,
    });
  }

  async generateTodo(prompt: string): Promise<TodoSuggestion[]> {
    try {
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: `${TODO_GENERATION_PROMPT}\n\nUser request:\n${prompt}`,
      });

      const rawText = response.text;

      if (!rawText) {
        throw new Error('Gemini returned an empty response.');
      }

      const parsed = JSON.parse(rawText) as TodoSuggestion[];

      let todos = parsed
        .filter((item) => item.title && item.title.trim() !== '')
        .map((item) => ({
          title: item.title.trim(),
          reason: (item.reason ?? '').trim(),
          priority: Number(item.priority) || 1,
        }));

      const seen = new Set<string>();

      todos = todos.filter((todo) => {
        const key = todo.title.toLowerCase();

        if (seen.has(key)) {
          return false;
        }

        seen.add(key);
        return true;
      });

      todos = todos.map((todo) => ({
        ...todo,
        priority: Math.min(3, Math.max(1, todo.priority)),
      }));

      todos.sort((a, b) => a.priority - b.priority);

      return todos.slice(0, 8);
    } catch (error) {
      this.logger.error(error instanceof Error ? error.stack : String(error));

      throw new InternalServerErrorException(
        'Unable to generate todo suggestions.',
      );
    }
  }
}
