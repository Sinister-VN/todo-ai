import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}
    
    async findAll() {
        return this.prisma.todo.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
