import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  static COUNTER = 0;
  constructor() {
    ErrorsInterceptor.COUNTER++;
  }
  intercept(context: ExecutionContext, call: CallHandler): Observable<any> {
    return call.handle();
  }
}
