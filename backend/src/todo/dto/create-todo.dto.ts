import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/\S/, {
        message: 'Title must not be empty or whitespace',
    })
    title!: string;
}