import { Log } from './print-enuns';
import * as moment from 'moment';

export class Logger {

  static print(message: string) {
    console.log(
      `[${moment().format('yyyy-MM-DD:hh:mm:ss')}] [${
        Log.INFO
      }]: ${message}`,
    );
  }

  static printError(message: string) {
    console.log(
      `[${moment().format('yyyy-MM-DD:hh:mm:ss')}] [${
        Log.ERROR
      }]: ${message}`,
    );
  }

  static printWarn(message: string) {
    console.log(
      `[${moment().format('yyyy-MM-DD:hh:mm:ss')}] [${
        Log.WARN
      }]: ${message}`,
    );
  }
}
