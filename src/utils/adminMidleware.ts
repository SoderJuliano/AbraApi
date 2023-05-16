import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.get('Authorization');
    if(token != "Bearer admin"){
      console.log(`Incoming request for admin route from ${req.headers.referer}`);
      console.log(`Called in ${req.protocol}://${req.get('Host')}${req.originalUrl}`);
      console.log(`The token I got was ${token}`);
      throw new UnauthorizedException("Your not an administrator")
    }
    next();
  }
}
