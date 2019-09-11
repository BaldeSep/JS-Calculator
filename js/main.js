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
