let expression = "";

const displayExpressionElement = document.getElementById("expression");

const calculatorButtonWrapper = document.getElementById(
  "calculator-button-wrapper"
);

calculatorButtonWrapper.querySelectorAll("p").forEach(button => {
  button.addEventListener("click", getButtonInput);
});

function getButtonInput(e) {
  if (this.dataset.type === "evaluate") {
    evaluateExpression(expression);
  } else if (this.dataset.type === "clear") {
    updateExpression("");
    updateDisplay("");
  } else if (this.dataset.type === "delete") {
    let newExpression = expression.slice(0, -1);
    updateExpression(newExpression);
    updateDisplay(newExpression);
  } else {
    expression += this.textContent;
    displayExpressionElement.textContent = expression;
  }
}

function evaluateExpression(expression) {
  if (checkMalformedExpression(expression)) {
    console.log("malformed expression");
    return;
  }

  let operatorsStack = [];
  let operandsStack = [];

  let operands = expression.match(/[0-9]+/g).map(operand => parseInt(operand));
  let operators = expression.match(/[+-/*]/g);

  operands.forEach(operand => {
    operandsStack.push(operand);
    // if there are operators left to look at
    // do this
    if (operators.length > 0) {
      let currOperator = operators.shift();
      while (!checkPrecedence(currOperator, peekStack(operatorsStack))) {
        let operand2 = operandsStack.pop();
        let operand1 = operandsStack.pop();
        let eval = evalOperands(operand1, operand2, operatorsStack.pop());
        operandsStack.push(eval);
      }
      operatorsStack.push(currOperator);
    }
  });

  console.log(`Operators Stack: ${operatorsStack}`);
  console.log(`Operands Stack: ${operandsStack}`);

  while (operatorsStack.length > 0) {
    let operand2 = operandsStack.pop();
    let operand1 = operandsStack.pop();
    let eval = evalOperands(operand1, operand2, operatorsStack.pop());
    operandsStack.push(eval);
  }

  console.log(`Answer: ${operandsStack[0]}`);
}

function checkMalformedExpression(expression) {
  return (
    expression.charAt(0).match(/[+-/*]/) ||
    expression.charAt(expression.length - 1).match(/[+-/*]/) ||
    expression.match(/[+-/*]{2,}/g)
  );
}

function evalOperands(operand1, operand2, operator) {
  switch (operator) {
    case "+":
      return add(operand1, operand2);
      break;
    case "-":
      return subtract(operand1, operand2);
      break;
    case "*":
      return multiply(operand1, operand2);
      break;
    case "/":
      return divide(operand1, operand2);
      break;
    default:
      break;
  }
}

function checkPrecedence(op1, op2) {
  if (op1 === "+" || op1 === "-") {
    if (op2 === "*" || op2 === "/") {
      return false;
    } else if (op2 === "+" || op2 === "-") {
      return true;
    }
  } else if (op1 === "*" || op1 === "/") {
    if (op2 === "+" || op2 === "-") {
      return true;
    } else if (op2 === "*" || op2 === "/") {
      return false;
    }
  }

  return true;
}

function peekStack(stack) {
  return stack.length > 0 ? stack[stack.length - 1] : null;
}

function updateExpression(input) {
  expression = input;
}

function updateDisplay(newExpression) {
  displayExpressionElement.textContent = newExpression;
}

function add(operand1, operand2) {
  return operand1 + operand2;
}

function subtract(operand1, operand2) {
  return operand1 - operand2;
}

function multiply(operand1, operand2) {
  return operand1 * operand2;
}

function divide(operand1, operand2) {
  return operand1 / operand2;
}

// Operator is the function that will be called on
// operand1 and operand2
function operate(operator, operand1, operand2) {
  return operator(operand1, operand2);
}
