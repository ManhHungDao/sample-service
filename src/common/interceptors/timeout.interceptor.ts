import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  static COUNTER = 0;
  constructor() {
    TimeoutInterceptor.COUNTER++;
  }
  intercept(context: ExecutionContext, call: CallHandler): Observable<any> {
    return call.handle();
  }
}
