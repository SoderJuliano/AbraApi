import { BadRequestException } from '@nestjs/common';
import { Logger } from './logger';

export class Validator {
  mongoose = require('mongoose');
  idIsValid(id: string) {
    if (!this.mongoose.Types.ObjectId.isValid(id)) {
      Logger.printError(`Invalid id: ${id}`);
      throw new BadRequestException('Invalid id');
    }
    Logger.print(`The id ${id} is an valid objectId.`);
  }
}
