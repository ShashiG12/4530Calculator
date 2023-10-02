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
        const operators: string[] = [];
        const operands: number[] = [];
        let currentOperand: string = '';

        for (let i = 0; i < this._buffer.length; i++) {
          const char = this._buffer[i];
          if (char === '+' || char === '-' || char === '*' || char === '/') {
            // Handle operators
            while (operators.length > 0 && this.hasPrecedence(char, operators[operators.length - 1])) {
              const operator = operators.pop();
              const secondOperand = operands.pop();
              const firstOperand = operands.pop();
              if (operator === '+') {
                operands.push(firstOperand + secondOperand);
              } else if (operator === '-') {
                operands.push(firstOperand - secondOperand);
              } else if (operator === '*') {
                operands.push(firstOperand * secondOperand);
              } else if (operator === '/') {
                if (secondOperand === 0) {
                  // Handle division by zero error.
                  this._buffer = 'Error';
                  return;
                }
                operands.push(firstOperand / secondOperand);
              }
            }
            operators.push(char);
          } else if (!isNaN(Number(char))) {
            // Handle operands
            currentOperand += char;
          }

          if (currentOperand !== '') {
            operands.push(parseFloat(currentOperand));
            currentOperand = '';
          }
        }

        while (operators.length > 0) {
          const operator = operators.pop();
          const secondOperand = operands.pop();
          const firstOperand = operands.pop();
          if (operator === '+') {
            operands.push(firstOperand + secondOperand);
          } else if (operator === '-') {
            operands.push(firstOperand - secondOperand);
          } else if (operator === '*') {
            operands.push(firstOperand * secondOperand);
          } else if (operator === '/') {
            operands.push(firstOperand / secondOperand);
          }
        }
        this._buffer = String(operands[0])
      default:
        break;
    }
  }

  public display(): string {
    return this._buffer;
  }

  private hasPrecedence(op1: string, op2: string): boolean {
    const precedenceDict: { [key: string]: number } = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };
    return precedenceDict[op1] <= precedenceDict[op2];
  }

}
