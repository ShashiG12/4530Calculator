/* eslint-disable complexity */
import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorState } from '../interfaces/calculator-state-interface';
import { ActionState } from './action-state';
import { OperatorState } from './operator-state';

export class NumberState implements ICalculatorState {

  public constructor(private c: CalculatorModel) {}

  // adds another number to the buffer
  public pressNumber(key: NumericKeys): void {
    this.c.addChar(key);
  }

  // adds an operator to the buffer
  public pressOperator(key: OperatorKeys): void {
    this.c.addChar(key);
    this.c.changeState(new OperatorState(this.c));
  }

  // does some calculation based on action key
  public pressAction(key: ActionKeys): void {
    switch (key) {
      case ActionKeys.CLEAR:
        this.c.clear();
        this.c.changeState(new ActionState(this.c));
        break;
      case ActionKeys.DOT:
        this.c.addChar('.');
        this.c.changeState(new ActionState(this.c));
        break;
      case ActionKeys.EQUALS:
      // uses Shunting yard Algorithm found here:
      // https://en.wikipedia.org/wiki/Shunting_yard_algorithm#The_algorithm_in_detail

        // create list for operators and operands
        const operators: string[] = [];
        const operands: number[] = [];

        // iterate through buffer
        for (let i: number = 0; i < this.c.display().length; i++) {
        // intialize current character variable
          const char = this.c.display()[i];
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
            while (i + 1 < this.c.display().length && !isNaN(Number(this.c.display()[i + 1]))) {
              i++;
              currentDigit += this.c.display()[i];
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
        this.c.clear();
        this.c.addChar(String(operands[0]));
        this.c.changeState(new NumberState(this.c)); // goes back to the number state
        break;
      default:
        break;
    }
  }

  public display(): void {
    this.c.display();
  }

}
