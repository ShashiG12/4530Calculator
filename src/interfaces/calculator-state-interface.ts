export interface ICalculatorState {
  addNumber(c: ICalculatorModel): void;
  addOperator(c: ICalculatorModel): void;
  addAction(c: ICalculatorModel): void;
  display(): void;
}
