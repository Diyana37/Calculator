function attachClickEventToCalculatorButtons() {
  const numbers = Array.from(document.querySelectorAll(".number"));

  numbers.forEach((number) => {
    number.addEventListener("click", function (e) {
      const target = e.target;
      const id = target.getAttribute("id");
      console.log(`number ${id}`);
    });
  });

  const operators = Array.from(document.querySelectorAll(".operator"));

  operators.forEach((operator) => {
    operator.addEventListener("click", function (e) {
      const target = e.target;
      const id = target.getAttribute("id");
      console.log(`operator ${id}`);
    });
  });

  const actions = Array.from(document.querySelectorAll(".action"));

  actions.forEach((action) => {
    action.addEventListener("click", function (e) {
      const target = e.target;
      const id = target.getAttribute("id");
      console.log(`action ${id}`);
    });
  });
}

attachClickEventToCalculatorButtons();