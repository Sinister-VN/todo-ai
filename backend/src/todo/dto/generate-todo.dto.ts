import { IsString, IsNotEmpty, Matches } from "class-validator";

export class GenerateTodoDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/\S/, {
        message: 'Prompt must not be empty or whitespace',
    })
    prompt!: string;
}