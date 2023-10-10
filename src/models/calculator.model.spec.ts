import { CalculatorModel } from './calculator.model';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ActionKeys } from '../enums/action-keys.enum';

describe('CalculatorModel', (): void => {

  let calculator: ICalculatorModel;

  beforeEach((): void => {
    calculator = new CalculatorModel();
  });

  it('should contain a CalculatorModel class that implements ICalculatorModel', (): void => {

    expect(calculator).toBeDefined();

  });

  it('should have an empty display on init', (): void => {
    // Act
    const displayValue: string = calculator.display();

    // Assert
    expect(displayValue).toEqual('');

  });

  it('should display `1` when the `1` key is pressed', (): void => {
    // Act
    calculator.pressNumericKey(NumericKeys.ONE);
    const displayValue: string = calculator.display();

    // Assert
    expect(displayValue).toEqual('1');

  });

  it('should display `2` when the `2` key is pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('2');

  });

  it('should display `98` when the `9` key is pressed followed by the `8` key', (): void => {
    calculator.pressNumericKey(NumericKeys.NINE);
    calculator.pressNumericKey(NumericKeys.EIGHT);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('98');

  });

  it('should display `+` when the `+` key is pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('+');
  });

  it('should display `-` when the `-` key is pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('-');
  });

  it('should display `*` when the `*` key is pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.MULT);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('*');
  });

  it('should display `/` when the `/` key is pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.DIV);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('/');
  });

  it('should display `2+3` when the `2` key is pressed followed by the `+` then `3`', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('2+3');
  });

  it('should display `2-3` when the `2` key is pressed followed by the `-` then `3`', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('2-3');
  });

  it('should display `2*3` when the `2` key is pressed followed by the `*` then `3`', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.THREE);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('2*3');
  });

  it('should display `2/3` when the `2` key is pressed followed by the `/` then `3`', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.THREE);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('2/3');
  });

  it('should display `5` when the `2+3=` keys have been pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('5');
  });

  it('should display `-1` when the `2-3=` keys have been pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('-1');
  });

  it('should display `6` when the `2*3=` keys have been pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('6');
  });

  it('should display `3` when the `6/2=` keys have been pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.SIX);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('3');
  });

  it('multiple operations: should display `4` when the `2+3-1=` keys have been pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('4');
  });

  it('multiple operations: should display `1` when the `2*3/6=` keys have been pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.SIX);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('1');
  });

  it('CalculatorModel should display `5` when equals is clicked on `15 - 10`', (): void => {
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.FIVE);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.ZERO);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('5');
  });

  it('CalculatorModel should display `12` when equals is clicked on `144 / 12`', (): void => {
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('12');
  });

  it('should display `14` when equals is clicked on `2 + 3 * 4`', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();
    expect(displayValue).toEqual('14');
  });

});
