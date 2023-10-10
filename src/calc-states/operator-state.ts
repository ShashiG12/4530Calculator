import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { ICalculatorState } from '../interfaces/calculator-state-interface';

export class OperatorState implements ICalculatorState {
  private static theInstance: OperatorState;

  private constructor(private c: ICalculatorModel) {}

  public static instance(c: ICalculatorModel): OperatorState {
    if (OperatorState.theInstance === undefined) {
      OperatorState.theInstance = new OperatorState(c);
    }
    return OperatorState.theInstance;
  }

  public addNumber(): void {
    this.c.changeState(NumberState.instance(this.c));
  }

  public addOperator(): void {}

  public addAction(): void {
    this.c.changeState(ActionState.instance(this.c));
  }

  public display(): void {
    this.c.display();
  }

}
