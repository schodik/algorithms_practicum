const inputNumber = document.getElementById("inputNumber");
const calculateButton = document.getElementById("calculateButton");
const clearButton = document.getElementById("clearButton");
const resultDiv = document.getElementById("result");

function fib(n) {
    if (n < 0 || n > 64) {
        return "Введите значение n в диапазоне от 0 до 64";
    }

    const sqrt5 = Math.sqrt(5);
    const phi = (1 + sqrt5) / 2;
    const psi = (1 - sqrt5) / 2;

    const fibN = Math.round((Math.pow(phi, n) - Math.pow(psi, n)) / sqrt5);

    return fibN;
}

calculateButton.addEventListener("click", function() {
    const n = parseInt(inputNumber.value);

    if (!isNaN(n)) {
        const result = fib(n);
        resultDiv.textContent = `fib(${n}) = ${result}`;
    } else {
        alert("Введите корректное значение n.");
    }
});

clearButton.addEventListener("click", function() {
    resultDiv.textContent = "";
});
