import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from './logger';
var MD5 = require('crypto-js/md5');

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    const log = new Logger();
    const token = req.get('Authorization');

    log.print(`Incoming request for admin route from ${req.headers.referer}`);
    log.print(`Called in ${req.protocol}://${req.get('Host')}${req.originalUrl}`);
    
    if (MD5(token).toString() != 'a0bd7bd00d179057bac549e65265f886') {
      log.printWarn(
        `Token not matching. The token I got was ${token}`,
      );
      throw new UnauthorizedException('Your not an administrator');
    }
    
    next();
  }
}
function printWarn(arg0: string) {
  throw new Error('Function not implemented.');
}

