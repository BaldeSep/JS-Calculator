let expression = "";

const displayExpressionElement = document.getElementById("expression");

const calculatorButtonWrapper = document.getElementById(
  "calculator-button-wrapper"
);

calculatorButtonWrapper.querySelectorAll("p").forEach(button => {
  button.addEventListener("click", getButtonInput);
});

function getButtonInput(e) {
  if (this.dataset.type === "clear") {
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
