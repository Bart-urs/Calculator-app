const buttons = document.querySelectorAll('.buttons button');
const display = document.querySelector('.display');

let firstNumber = '';
let secondNumber = '';
let operation = null;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  if (a === 0 || b === 0) {
    return 0;
  } else {
    return a * b;
  }
}

function divide(a, b) {
  if (a === 0) {
    return 0;
  } else if (b === 0) {
    return 'Error: Division by zero';
  } else {
    return a / b;
  }
}

buttons.forEach(button => {
  button.addEventListener('click', function() {
    const buttonText = this.textContent;

    if (!isNaN(buttonText)) {
      if (operation === null) {
        if (!(firstNumber === '0' && buttonText === '0')) {
          firstNumber += buttonText;
        }
        display.textContent = firstNumber;
        display.textContent = display.textContent.slice(0, 14);
      } else {
        if (!(secondNumber === '0' && buttonText === '0')) {
          secondNumber += buttonText;
        }
        display.textContent = firstNumber + ' ' + operation + ' ' + secondNumber;
        display.textContent = display.textContent.slice(0, 14);
      }
    } else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
      if (firstNumber !== '') {
        operation = buttonText;
        display.textContent = firstNumber + ' ' + operation;
        display.textContent = display.textContent.slice(0, 14);
      }
    } else if (buttonText === '=') {
      if (firstNumber === '' || (secondNumber === '' && operation !== null)) {
        display.textContent = 'Error: Invalid operation';
        firstNumber = '';
        secondNumber = '';
        operation = null;
      } else {
        let result;
        if (operation === '+') {
          result = add(Number(firstNumber), Number(secondNumber));
        } else if (operation === '-') {
          result = subtract(Number(firstNumber), Number(secondNumber));
        } else if (operation === '*') {
          result = multiply(Number(firstNumber), Number(secondNumber));
        } else if (operation === '/') {
          result = divide(Number(firstNumber), Number(secondNumber));
        }
        display.textContent = `${firstNumber} ${operation} ${secondNumber} = ${result}`;
        display.textContent = display.textContent.slice(0, 14);
        firstNumber = String(result);
        secondNumber = '';
        operation = null;
      }
    } else if (buttonText === 'C') {
      firstNumber = '';
      secondNumber = '';
      operation = null;
      display.textContent = '0';
      display.textContent = display.textContent.slice(0, 14);
    } else if (buttonText === '√') {
      let number = operation === null ? firstNumber : secondNumber;
      let result = Math.sqrt(Number(number));
      display.textContent = result;
      display.textContent = display.textContent.slice(0, 14);
      if (operation === null) {
        firstNumber = String(result);
      } else {
        secondNumber = String(result);
      }
    } else if (buttonText === '%') {
      let number = operation === null ? firstNumber : secondNumber;
      let result = Number(number) / 100;
      display.textContent = result;
      display.textContent = display.textContent.slice(0, 14);
      if (operation === null) {
        firstNumber = String(result);
      } else {
        secondNumber = String(result);
      }
    } else if (buttonText === '.') {
      if (operation === null) {
        if (!firstNumber.includes('.')) {
          firstNumber += buttonText;
        }
      } else {
        if (!secondNumber.includes('.')) {
          secondNumber += buttonText;
        }
      }
      display.textContent = firstNumber + (operation ? ' ' + operation + ' ' + secondNumber : '');
      display.textContent = display.textContent.slice(0, 14);
    }
  });
});