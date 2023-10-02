
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
        // let currentTotal : number = 0;
        // let index : number = 0
        // let firstNum : string = ''
        // let secondNum : string = ''
        // let operator : string = ''
        // while (this._buffer[index]) {
        //   if (index == 0) {
        //     while (!isNaN(Number(this._buffer[index]))) {
        //       firstNum += this._buffer[index]
        //       index++
        //     }
        //   }
        //   else {
        //     firstNum = String(currentTotal)
        //   }
        //   operator = this._buffer[index]
        //   index++
        //   while (!isNaN(Number(this._buffer[index]))) {
        //     secondNum += this._buffer[index]
        //     index++
        //   }
        //   console.log(this._buffer[index])
        //   switch (operator) {
        //     case '+':
        //       currentTotal += parseInt(firstNum) + parseInt(secondNum)
        //       break;
        //     case '-':
        //       currentTotal += parseInt(firstNum) - parseInt(secondNum)
        //       break;
        //     case '*':
        //       currentTotal += parseInt(firstNum) * parseInt(secondNum)
        //       break;
        //     case '/':
        //       console.log(firstNum, secondNum)
        //       currentTotal += parseInt(firstNum) / parseInt(secondNum)
        //       break;
        //   }
        // }
        // this._buffer = String(currentTotal)
       
      default:
        break;
    }
  }

  public display(): string {
    return this._buffer;
  }

  private hasPrecedence(op1: string, op2: string): boolean {
    const precedenceMap: { [key: string]: number } = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };
    return precedenceMap[op1] <= precedenceMap[op2];
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
