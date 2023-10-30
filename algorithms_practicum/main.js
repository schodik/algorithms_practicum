const inputNumber = document.getElementById("inputNumber");
const calculateButton = document.getElementById("calculateButton");
const delall = document.getElementById("delall");
const resultsList = document.getElementById("resultsList");

function fib(n) {
    if (n <= 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}

calculateButton.addEventListener("click", function() {
    const n = parseInt(inputNumber.value);

    if (!isNaN(n) && n >= 1 && n <= 24) {
        const startTime = performance.now();
        const result = fib(n);
        const endTime = performance.now();
        const executionTime = endTime - startTime;

        const listItem = document.createElement("li");
        listItem.textContent = `fib(${n}) = ${result}, время выполнения: ${executionTime.toFixed(2)} мс`;
        
        resultsList.appendChild(listItem);

        inputNumber.value = "";
    } else {
        alert("Введите корректное значение n (1-24).");
    }
});

delall.addEventListener("click", function() {
    resultsList.innerHTML = "";
});

