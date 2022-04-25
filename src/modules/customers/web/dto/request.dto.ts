import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerRequestDto {
    @IsNotEmpty()
    name: string;
    email: string;
    phone: string;
    address: string;
}

export class UpdateCustomerRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class InsertCustomerRequestDto {
  // @IsString()
  // @IsNotEmpty()
  name: string;
  email: string;
  phone: string;
  address: string;
}
