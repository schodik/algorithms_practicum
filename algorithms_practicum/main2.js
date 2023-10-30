const inputNumber = document.getElementById("inputNumber");
const calculateButton = document.getElementById("calculateButton");
const clearButton = document.getElementById("clearButton");
const resultsList = document.getElementById("resultsList");

function fib(n) {
    if (n <= 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        let a = 0;
        let b = 1;
        let result = 0;
        for (let i = 2; i <= n; i++) {
            result = a + b;
            a = b;
            b = result;
        }
        return result;
    }
}

calculateButton.addEventListener("click", function() {
    const n = parseInt(inputNumber.value);

    if (!isNaN(n) && n >= 1 && n <= 32) {
        const result = fib(n);

        const listItem = document.createElement("li");
        listItem.textContent = `fib(${n}) = ${result}`;

        resultsList.appendChild(listItem);

        inputNumber.value = "";
    } else {
        alert("Введите корректное значение n (1-32).");
    }
});

clearButton.addEventListener("click", function() {
    resultsList.innerHTML = "";
});
