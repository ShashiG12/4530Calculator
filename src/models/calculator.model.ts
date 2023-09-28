
import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';

export class CalculatorModel implements ICalculatorModel {

  private _buffer: string = '';

  public pressNumericKey(key: NumericKeys): void {
    this._buffer += key;
  }

  public pressOperatorKey(key: OperatorKeys): void {
    this._buffer += key;
  }

  public pressActionKey(key: ActionKeys): void {
    switch (key) {
      case ActionKeys.CLEAR:
        this._buffer = '';
        break;
      case ActionKeys.DOT:
        this._buffer = '.';
        break;
      case ActionKeys.EQUALS:
        
        break;
      default:
        break;
    }
  }

  public display(): string {
    return this._buffer;
  }

  private operation(num1: String, operator: String, num2: String): String {
    const first: number  = Number(num1);
    const second: number = Number(num2);
    switch (operator) {
      case '+':
        return String(first + second);
      case '-':
        return String(first - second);
      case '*':
        return String(first * second);
      case '/':
        return String(first / second);
      default:
        break;
    }
  }

}
