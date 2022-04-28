import { IsNotEmpty, IsString } from "class-validator";

export class CreateSurveyRequestDto {
  @IsString()
  cusId: string;
  empId: string;
}

export class UpdateSurveyRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
