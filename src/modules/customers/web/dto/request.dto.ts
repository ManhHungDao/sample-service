import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerRequestDto {
  
}

export class UpdateCustomerRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
