import { Log } from './print-enuns';

export class Logger {
  moment = require('moment');

  print(message: string) {
    console.log(
      `[${this.moment().format('yyyy-MM-DD:hh:mm:ss')}] [${
        Log.INFO
      }]: ${message}`,
    );
  }

  printError(message: string) {
    console.log(
      `[${this.moment().format('yyyy-MM-DD:hh:mm:ss')}] [${
        Log.ERROR
      }]: ${message}`,
    );
  }

  printWarn(message: string) {
    console.log(
      `[${this.moment().format('yyyy-MM-DD:hh:mm:ss')}] [${
        Log.WARN
      }]: ${message}`,
    );
  }
}
