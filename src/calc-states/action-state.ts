/* eslint-disable complexity */
import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorState } from '../interfaces/calculator-state-interface';
import { NumberState } from './number-state';
import { OperatorState } from './operator-state';

export class ActionState implements ICalculatorState {

  public constructor(private c: CalculatorModel) {}

  // adds another number to the buffer
  public pressNumber(key: NumericKeys): void {
    this.c.addChar(key);
    this.c.changeState(new NumberState(this.c));
  }

  // adds an operator to the buffer
  public pressOperator(key: OperatorKeys): void {
    this.c.addChar(key);
    this.c.changeState(new OperatorState(this.c));
  }

  // does clear and '.' but not = equals because '1 = =' or '=' or '1. =' doesn't make sense
  public pressAction(key: ActionKeys): void {
    switch (key) {
      case ActionKeys.CLEAR:
        this.c.clear(); // stays in same state
        break;
      case ActionKeys.DOT:
        this.c.addChar('.');
        break;
      default:
        break;
    }
  }

  public display(): void {
    this.c.display();
  }

}
