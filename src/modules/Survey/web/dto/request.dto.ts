import { IsNotEmpty, IsString } from "class-validator";

export class CreateSurveyRequestDto {
  
}

export class UpdateSurveyRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
