/* eslint-disable complexity */
import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorState } from '../interfaces/calculator-state-interface';
import { ActionState } from './action-state';
import { NumberState } from './number-state';

export class OperatorState implements ICalculatorState {

  public constructor(private c: CalculatorModel) {}

  // adds another number to the buffer
  public pressNumber(key: NumericKeys): void {
    this.c.addChar(key);
    this.c.changeState(new NumberState(this.c));
  }

  // no need to add another operator to the operator '1 + +'
  public pressOperator(key: OperatorKeys): void {}

  // does 'clear' and '.' but not '=' equals we '1 + =' doesn't make sense
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
      default:
        break;
    }
  }

  public display(): void {
    this.c.display();
  }

}
