import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { AiService } from './ai.service';

@Module({
  providers: [TodoService, AiService],
  controllers: [TodoController]
})
export class TodoModule {}
