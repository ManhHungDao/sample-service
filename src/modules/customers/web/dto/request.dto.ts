import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerRequestDto {
  
}

export class UpdateCustomerRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class InsertCustomerRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  gmail: string;
  name: string;
  address: string;
}
