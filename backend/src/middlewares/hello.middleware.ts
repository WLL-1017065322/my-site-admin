import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HelloMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('req.body',req.body);
    next();
  }
}
