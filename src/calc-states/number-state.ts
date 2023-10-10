import { NumericKeys } from '../enums/numeric-keys.enum';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { ICalculatorState } from '../interfaces/calculator-state-interface';

export class NumberState implements ICalculatorState {
  private static theInstance: NumberState;

  private constructor(private c: ICalculatorModel) {
  }

  public static instance(c: ICalculatorModel): NumberState {
    if (NumberState.theInstance === undefined) {
      NumberState.theInstance = new NumberState(c);
    }
    this.c = c;
    return NumberState.theInstance;
  }

  public pressNumber(key: NumericKeys): void {
    this.c.addChar(key);
  }

  public pressOperator(c: ICalculatorModel): void {
    this.c.addChar(key);
    this.c.changeState(OperatorState.instance(this.c));
  }

  public pressAction(c: ICalculatorModel): void {
    this.c.addChar(key);
    this.c.changeState(ActionState.instance(this.c));
  }

  public display(): void {
    this.c.display();
  }

}
