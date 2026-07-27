const display = document.getElementById("display");

const operators = ["+", "-", "*", "/", "%"];

function addToDisplay(val) {
  if (display.value === "Error") {
    display.value = "";
  }

  const last = display.value.slice(-1);

  if (val === ".") {
    const parts = display.value.split(/[\+\-\*\/%]/);

    const currentNumber = parts[parts.length - 1];

    if (currentNumber.includes(".")) {
      return;
    }
  }

  if (operators.includes(last) && operators.includes(val)) {
    display.value = display.value.slice(0, -1);
  }

  display.value += val;
}
function calculate() {
  try {
    if (display.value.trim() === "") return;

    const result = eval(display.value);

    if (!isFinite(result)) {
      display.value = "Error";

      setTimeout(() => {
        display.value = "";
      }, 1200);

      return;
    }

    display.value = result;
  } catch {
    display.value = "Error";

    setTimeout(() => {
      display.value = "";
    }, 1200);
  }
}

function clearDisplay() {
  display.value = "";
}

function Backspace() {
  display.value = display.value.slice(0, -1);
}
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    addToDisplay(e.key);
  }

  if (["+", "-", "*", "/", "%", "."].includes(e.key)) {
    addToDisplay(e.key);
  }

  if (e.key === "Enter") {
    e.preventDefault();
    calculate();
  }

  if (e.key === "Backspace") {
    Backspace();
  }

  if (e.key === "Delete" || e.key === "Escape") {
    clearDisplay();
  }
});
