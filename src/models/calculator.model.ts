import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { CalcAction } from '../calc-states/action-state';
import { CalcNumber } from '../calc-states/action-state';
import { CalcOperator } from '../calc-states/action-state';
import { ICalculatorState } from '../interfaces/calculator-state-interface';

export class CalculatorModel implements ICalculatorModel {

  private _buffer: string = '';
  private state: ICalculatorState;

  public constructor() {
    this.state = CalcAction.instance(this);
  }

  public changeState(c: ICalculatorState): void {
    this.state = c;
    this.display();
  }

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
        // uses Shunting yard Algorithm found here:
        // https://en.wikipedia.org/wiki/Shunting_yard_algorithm#The_algorithm_in_detail

        // create list for operators and operands
        const operators: string[] = [];
        const operands: number[] = [];

        // iterate through buffer
        for (let i = 0; i < this._buffer.length; i++) {
          // intialize current character variable
          const char = this._buffer[i];
          // if character is an operator, calculate higher precedence operations
          // in the lists
          if (char === '+' || char === '-' || char === '*' || char === '/') {
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
                operands.push(firstOperand / secondOperand);
              }
            }
            operators.push(char);
            // if char is a number, get all the digits and add it to operands
          } else if (!isNaN(Number(char))) {
            let currentDigit = char;
            while (i + 1 < this._buffer.length && !isNaN(Number(this._buffer[i + 1]))) {
              i++;
              currentDigit += this._buffer[i];
            }
            operands.push(parseFloat(currentDigit));
          }
        }

        // evaluate remaining operations and operands
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
        this._buffer = String(operands[0]);
        break;
      default:
        break;
    }
  }

  public display(): string {
    return this._buffer;
  }

  // determine if operator has precedence over another
  private hasPrecedence(op1: string, op2: string): boolean {
    // use a dict to map values to each operator to determine
    // precedence
    const precedenceDict: { [key: string]: number } = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
    };
    return precedenceDict[op1] <= precedenceDict[op2];
  }

}
