import { IsNotEmpty, IsString } from "class-validator";

export class CreateSurveyRequestDto {
  @IsString()
  owner: string;
  
}

export class UpdateSurveyRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
