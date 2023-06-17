import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from './logger';
var MD5 = require('crypto-js/md5');

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    const token = req.get('Authorization');

    Logger.print(`Incoming request for admin route from ${req.headers.referer}`);
    Logger.print(`Called in ${req.protocol}://${req.get('Host')}${req.originalUrl}`);
    
    if (MD5(token).toString() != 'yourTokenGoesHere:)') {
      Logger.printWarn(
        `Token not matching. The token I got was ${token}`,
      );
      throw new UnauthorizedException('You are not an administrator');
    }
    
    next();
  }
}
