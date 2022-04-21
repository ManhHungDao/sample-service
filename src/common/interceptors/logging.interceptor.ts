import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  static COUNTER = 0;
  constructor() {
    LoggingInterceptor.COUNTER++;
  }
  intercept(context: ExecutionContext, call: CallHandler): Observable<any> {
    return call.handle();
  }
}
