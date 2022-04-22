import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeRequestDto {
  
}

export class UpdateEmployeeRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
