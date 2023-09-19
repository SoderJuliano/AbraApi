import { Log } from './print-enuns';
import moment from 'moment';

export class Logger {

  static print(message: string) {
    console.log(
      `[${moment().format('yyyy-MM-DD:HH:mm:ss')}] [${
        Log.INFO
      }]: ${message}`,
    );
  }

  static printError(message: string) {
    console.log(
      `[${moment().format('yyyy-MM-DD:HH:mm:ss')}] [${
        Log.ERROR
      }]: ${message}`,
    );
  }

  static printWarn(message: string) {
    console.log(
      `[${moment().format('yyyy-MM-DD:HH:mm:ss')}] [${
        Log.WARN
      }]: ${message}`,
    );
  }
}
