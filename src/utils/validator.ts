import { BadRequestException } from '@nestjs/common';
import { Logger } from './logger';

export class Validator {
  mongoose = require('mongoose');
  logger = new Logger();
  idIsValid(id: string) {
    if (!this.mongoose.Types.ObjectId.isValid(id)) {
      this.logger.printError(`Invalid id: ${id}`);
      throw new BadRequestException('Invalid id');
    }
    this.logger.print(`The id ${id} is an valid objectId.`);
  }
}
