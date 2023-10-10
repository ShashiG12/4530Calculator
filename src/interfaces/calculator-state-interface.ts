export interface ICalculatorState {
  pressNumber(c: ICalculatorModel): void;
  pressOperator(c: ICalculatorModel): void;
  pressAction(c: ICalculatorModel): void;
  display(): void;
}
