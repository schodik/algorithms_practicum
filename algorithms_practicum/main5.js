const inputNumber = document.getElementById("inputNumber");
const calculateButton = document.getElementById("calculateButton");
const clearButton = document.getElementById("clearButton");
const resultDiv = document.getElementById("result");

function fib_eo(n) {
    if (n <= 0) {
        return "even";
    }

    let a = 0;
    let b = 1;

    for (let i = 2; i <= n; i++) {
        const nextFib = (a + b) % 10;
        a = b;
        b = nextFib;
    }

    return b % 2 === 0 ? "even" : "odd";
}

calculateButton.addEventListener("click", function() {
    const n = parseInt(inputNumber.value);

    if (!isNaN(n)) {
        const result = fib_eo(n);
        resultDiv.textContent = `Четность числа Фибоначчи F(${n}) по последней цифре: ${result}`;
    } else {
        alert("Введите корректное значение n.");
    }
});

clearButton.addEventListener("click", function() {
    resultDiv.textContent = "";
});
