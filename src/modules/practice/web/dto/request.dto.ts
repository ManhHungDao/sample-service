import { IsNotEmpty, IsString } from "class-validator";

export class CreatePracticeRequestDto {
  
}

export class UpdatePracticeRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
