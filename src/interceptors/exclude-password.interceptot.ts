import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.removePassword(data)))
  }

  private removePassword(data: any): any {
    if (Array.isArray(data)) {
      // Process each item if data is an array
      return data.map((item) => this.removePassword(item))
    } else if (data && data._doc) {
      // Handle Mongoose documents by accessing the `_doc` property
      return this.removePassword({ ...data._doc })
    } else if (
      typeof data === 'object' &&
      data !== null &&
      !(data instanceof Date)
    ) {
      const newData: any = {}
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (
            key === '_id' &&
            typeof data[key] === 'object' &&
            data[key].toString
          ) {
            // Convert MongoDB ObjectId to string
            newData[key] = data[key].toString()
          } else if (key !== 'password') {
            newData[key] = this.removePassword(data[key])
          }
        }
      }
      return newData
    } else {
      // Return data as is if it's not an object or array
      return data
    }
  }
}
