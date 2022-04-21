import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  Injectable,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, Object.assign({}, value));
    const errors = await validate(object, { skipMissingProperties: false });
    if (errors.length > 0) {
      const msg = errors.map((error) => {
        for (const name in error.constraints) {
          if (error.constraints.hasOwnProperty(name)) {
            const element = error.constraints[name];

            console.log("error =>", element);
            return element;
          }
        }
      });
      throw new BadRequestException(msg);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
