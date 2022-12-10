import {evaluate} from 'mathjs';

export function evaluateCalculator(value) {
  let evaluateCount = '';
  try {
    evaluateCount = evaluate(value);
    if (evaluateCount === undefined || Number.isNaN(evaluateCount)) {
      // wyświietlenie błędu
    }
  } catch (error) {
    return undefined;
  }

  return evaluateCount;
}

export function test() {
  //
}
