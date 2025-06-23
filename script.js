let firstOperand = "";
let secondOperand = "";
let operator = "";

function setInputValue(value) {
  const input = document.querySelector(".calc-numbers");
  input.value = value;
}

function clear() {
  firstOperand = "";
  secondOperand = "";
  operator = "";
  setInputValue("0");
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
    default:
      break;
  }

  return result;
}

function clickOperators(id) {
  let equation;
  switch (id) {
    case "plus":
      operator = "+";
      equation = `${firstOperand} ${operator}`;
      setInputValue(equation);
      break;
    case "minus":
      operator = "-";
      equation = `${firstOperand} ${operator}`;
      setInputValue(equation);
      break;
    case "division":
      operator = "/";
      equation = `${firstOperand} ${operator}`;
      setInputValue(equation);
      break;
    case "multiply":
      operator = "x";
      equation = `${firstOperand} ${operator}`;
      setInputValue(equation);
      break;
    case "equal":
      let result = calculate();
      
      if (result) {
        equation = `${firstOperand} ${operator} ${secondOperand} = ${result}`;
        setInputValue(equation);
      }
      break;
    default:
      break;
  }
}

function attachClickEventToCalculatorButtons() {
  const numbers = Array.from(document.querySelectorAll(".number"));

  numbers.forEach((number) => {
    number.addEventListener("click", function (e) {
      const target = e.target;
      const id = target.getAttribute("id");
      clickNumbers(id);
    });
  });

  const operators = Array.from(document.querySelectorAll(".operator"));

  operators.forEach((operator) => {
    operator.addEventListener("click", function (e) {
      const target = e.target;
      const id = target.getAttribute("id");
      clickOperators(id);
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
    });
  });
}

attachClickEventToCalculatorButtons();
