import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { ICalculatorState } from '../interfaces/calculator-state-interface';

export class ActionState implements ICalculatorState {
  private static theInstance: ActionState;

  private constructor(private c: ICalculatorModel) {}

  public static instance(c: ICalculatorModel): ActionState {
    if (ActionState.theInstance === undefined) {
      ActionState.theInstance = new ActionState(c);
    }
    this.c = c;
    return ActionState.theInstance;
  }

  public pressNumber(): void {
    this.c.changeState(NumberState.instance(this.c));
  }

  public pressOperator(): void {
    this.c.changeState(OperatorState.instance(this.c));
  }

  public pressAction(): void {}

  public display(): void {
    this.c.display();
  }

}
