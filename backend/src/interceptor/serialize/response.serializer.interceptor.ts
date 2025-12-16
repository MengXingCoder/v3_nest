// src/interceptors/response.serializer.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * 深度序列化响应数据拦截器
 * 将返回值通过 JSON.parse(JSON.stringify(data)) 转为 plain object，
 * 从而去除 TypeORM 实体代理、循环引用等问题，确保前端能收到完整嵌套结构。
 */
@Injectable()
export class ResponseSerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 如果是 undefined/null，直接返回（避免 JSON.stringify(null) 变成 "null" 字符串）
        if (data === undefined || data === null) {
          return data;
        }

        try {
          // 深度序列化：去代理 + 展开所有嵌套对象
          return JSON.parse(JSON.stringify(data));
        } catch (error) {
          // 如果序列化失败（比如有函数、Symbol、循环引用等），原样返回
          console.warn('Response serialization failed:', error);
          return data;
        }
      }),
    );
  }
}
