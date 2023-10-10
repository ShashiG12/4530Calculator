/* eslint-disable complexity */
import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { ActionState } from '../calc-states/action-state';
import { ICalculatorState } from '../interfaces/calculator-state-interface';

export class CalculatorModel implements ICalculatorModel {

  private _buffer: string = '';
  private state: ICalculatorState;

  public constructor() {
    this.state = new ActionState(this);
  }

  public changeState(s: ICalculatorState): void {
    this.state = s;
    this.display();
  }

  public addChar(s: string): void {
    this._buffer += s;
  }

  public clear(): void {
    this._buffer = '';
  }

  public pressNumericKey(key: NumericKeys): void {
    this.state.pressNumber(key);
  }

  public pressOperatorKey(key: OperatorKeys): void {
    this.state.pressOperator(key);
  }

  public pressActionKey(key: ActionKeys): void {
    this.state.pressAction(key);
  }

  public display(): string {
    return this._buffer;
  }

}
