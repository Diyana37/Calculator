let firstOperand = "";
let secondOperand = "";
let operator = "";
let operators = [];

const equal = document.querySelector("#equal");
const input = document.querySelector("#input");
const decimalSeparator = document.querySelector("#decimal-separator");

function setInputValue(value) {
  const input = document.querySelector(".calc-numbers");
  input.value = value;
}

function clear() {
  firstOperand = "";
  secondOperand = "";
  operator = "";
  operators = [];
  setInputValue("0");
}

function deleteSymbol() {
  if (secondOperand) {
    secondOperand = secondOperand.slice(0, -1);

    setInputValue(
      `${firstOperand} ${operator}${secondOperand ? ` ${secondOperand}` : ""}`
    );
  } else if (operator) {
    operator = "";
    setInputValue(`${firstOperand}`);
  } else {
    firstOperand = firstOperand.slice(0, -1);
    setInputValue(`${firstOperand ? `${firstOperand}` : "0"}`);
  }
}

function clickNumbers(id) {
  if (operator) {
    secondOperand += id;
    let equation = `${firstOperand} ${operator} ${secondOperand}`;
    setInputValue(equation);
  } else {
    firstOperand += id;
    setInputValue(firstOperand);
  }
}

function clickDecimalSeparator() {
  if (operator) {
    secondOperand += ".";
    let equation = `${firstOperand} ${operator} ${secondOperand}`;
    setInputValue(equation);
  } else {
    firstOperand += ".";
    setInputValue(firstOperand);
  }
}

function calculate() {
  let result;

  switch (operator) {
    case "+":
      result = Number(firstOperand) + Number(secondOperand);
      break;
    case "-":
      result = Number(firstOperand) - Number(secondOperand);
      break;
    case "/":
      if (Number(secondOperand) === 0) {
        alert("You cannot divide by zero!");
      } else {
        result = Number(firstOperand) / Number(secondOperand);
      }
      break;
    case "x":
      result = Number(firstOperand) * Number(secondOperand);
      break;
    default:
      break;
  }

  return result;
}

function calculateOperators() {
  let result;
  let localOperator;
  const lastOperator = operators.pop();
  const beforeLastOperator = operators.pop();

  if (lastOperator === beforeLastOperator) {
    localOperator = lastOperator;
  } else {
    localOperator = beforeLastOperator;
  }

  switch (localOperator) {
    case "+":
      result = Number(firstOperand) + Number(secondOperand);
      break;
    case "-":
      result = Number(firstOperand) - Number(secondOperand);
      break;
    case "/":
      if (Number(secondOperand) === 0) {
        alert("You cannot divide by zero!");
      } else {
        result = Number(firstOperand) / Number(secondOperand);
      }
      break;
    case "x":
      result = Number(firstOperand) * Number(secondOperand);
      break;
    default:
      break;
  }

  return result;
}

function performOperations(equation) {
  if (firstOperand && secondOperand) {
    let result = calculateOperators();

    if (result) {
      firstOperand = result;
      secondOperand = "";
      equation = `${firstOperand} ${operator}`;
      operators.push(operator);
      setInputValue(equation);
    }
  } else {
    equation = `${firstOperand} ${operator}`;
    setInputValue(equation);
  }
}

function clickOperators(id) {
  let equation;

  switch (id) {
    case "plus":
      operator = "+";
      operators.push(operator);
      performOperations(equation);
      break;
    case "minus":
      operator = "-";
      operators.push(operator);
      performOperations(equation);
      break;
    case "division":
      operator = "/";
      operators.push(operator);
      performOperations(equation);
      break;
    case "multiply":
      operator = "x";
      operators.push(operator);
      performOperations(equation);
      break;
    case "equal":
      let result = calculate();

      if (result) {
        setInputValue(result.toString());
        firstOperand = result.toString();
        secondOperand = "";
        operator = "";
        operators = [];
      }
      break;
    case "decimal-separator":
      clickDecimalSeparator();
      break;
    default:
      break;
  }
}

function controlEqualState() {
  if (firstOperand && secondOperand) {
    equal.disabled = false;
  } else {
    equal.disabled = true;
  }
}

function controlDecimalSeparatorState() {
  if(operator) {
    if(!secondOperand || secondOperand.includes(".")) {
      decimalSeparator.disabled = true;
    } else {
      decimalSeparator.disabled = false;
    }
  } else {
    if(!firstOperand || firstOperand.includes(".")) {
      decimalSeparator.disabled = true;
    } else {
      decimalSeparator.disabled = false;
    }
  }
}

function attachClickEventToCalculatorButtons() {
  const numbers = Array.from(document.querySelectorAll(".number"));

  numbers.forEach((number) => {
    number.addEventListener("click", function (e) {
      const target = e.target;
      const id = target.getAttribute("id");
      clickNumbers(id);

      controlEqualState();
      controlDecimalSeparatorState();
    });
  });

  const operators = Array.from(document.querySelectorAll(".operator"));

  operators.forEach((operator) => {
    operator.addEventListener("click", function (e) {
      const target = e.target;
      const id = target.getAttribute("id");
      clickOperators(id);

      controlEqualState();
      controlDecimalSeparatorState();
    });
  });

  const actions = Array.from(document.querySelectorAll(".action"));

  actions.forEach((action) => {
    action.addEventListener("click", function (e) {
      const target = e.target;
      const id = target.getAttribute("id");

      if (id === "clear") {
        clear();
      }

      if (id === "delete") {
        deleteSymbol();
      }

      controlEqualState();
      controlDecimalSeparatorState();
    });
  });
}

attachClickEventToCalculatorButtons();
