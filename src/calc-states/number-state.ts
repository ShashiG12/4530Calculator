import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { ICalculatorState } from '../interfaces/calculator-state-interface';

export class NumberState implements ICalculatorState {
  private static theInstance: NumberState;

  private constructor(private c: ICalculatorModel) {}

  public static instance(c: ICalculatorModel): NumberState {
    if (NumberState.theInstance === undefined) {
      NumberState.theInstance = new NumberState(c);
    }
    return NumberState.theInstance;
  }

  public addNumber(c: ICalculatorModel): void {
    this.c = c;
  }

  public addOperator(c: ICalculatorModel): void {
    this.c = c;
    this.c.changeState(OperatorState.instance(this.c));
  }

  public addAction(c: ICalculatorModel): void {
    this.c = c;
    this.c.changeState(ActionState.instance(this.c));
  }

  public display(): void {
    this.c.display();
  }

}
