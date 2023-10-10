import { ActionKeys } from "../enums/action-keys.enum";
import { NumericKeys } from "../enums/numeric-keys.enum";
import { OperatorKeys } from "../enums/operator-keys.enum";

export interface ICalculatorState {
  pressNumber(key: NumericKeys): void;
  pressOperator(key: OperatorKeys): void;
  pressAction(key: ActionKeys): void;
  display(): void;
}
