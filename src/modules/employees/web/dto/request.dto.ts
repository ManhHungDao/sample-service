import { IsString, IsNotEmpty } from "class-validator";
export class CreateEmpoyeeRequestDto {}
export class UpdateEmpoyeeRequestDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
