"use strict";

const container = document.querySelector(".container");
const input_container = document.querySelector(".input-container");
const working_container = document.querySelector(".working-container");
const btn_delete = document.querySelector(".btn-delete");
const calculator = document.querySelector(".calculator");

container.addEventListener("click", function (e) {
  if (!e.target.closest(".btn")) return;
  const key = e.target;
  const keyValue = e.target.textContent;
  //  console.log(keyValue)
  const displayValue = input_container.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  if (type === "number") {
    if (displayValue === "0" || previousKeyType === "operator") {
      input_container.textContent = keyValue;
    } else {
      input_container.textContent = displayValue + keyValue;
    }
  }

  if (type === "operator") {
    const allKeys = working_container.querySelectorAll(
      '[data-type="operator"]'
    );
    allKeys.forEach((el) => (el.dataset.state = ""));

    key.dataset.state = "selected";

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (keyValue === "=") {
    const secondNumber = +displayValue;
    const firstNumber = +calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    console.log(firstNumber, operator, secondNumber);

    let result = "";
    if (operator === "plus") result = firstNumber + secondNumber;
    if (operator === "minus") result = firstNumber - secondNumber;
    if (operator === "times") result = firstNumber * secondNumber;
    if (operator === "divide") result = firstNumber / secondNumber;

    console.log(result);

    input_container.textContent = result.toFixed(2);
    
  }

  if (keyValue === "reset") {
    if(!keyValue) return
    input_container.textContent = "";
  }
  
  if (keyValue==='del'){
    if(!keyValue) return
    input_container.textContent = input_container.textContent.slice(0, -1)
  }
  calculator.dataset.previousKeyType = type;
});


