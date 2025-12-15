import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest()
        console.log('拦截器之前', req)
        return next.handle().pipe(
            map((item) => {
                console.log('拦截器数据', item)
                return item
            })
        );
    }
}
