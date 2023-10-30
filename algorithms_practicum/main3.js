const inputNumber = document.getElementById("inputNumber");
const calculateButton = document.getElementById("calculateButton");
const clearButton = document.getElementById("clearButton");
const resultsList = document.getElementById("resultsList");

let fibArray = [0, 1];

function fib(n) {
    if (n < 1 || n > 40) {
        return "Введите значение n в диапазоне от 1 до 40";
    }

    if (n <= fibArray.length - 1) {
        return fibArray.slice(0, n + 1);
    }

    for (let i = fibArray.length; i <= n; i++) {
        const nextFib = fibArray[i - 1] + fibArray[i - 2];
        fibArray.push(nextFib);
    }

    return fibArray;
}

calculateButton.addEventListener("click", function() {
    const n = parseInt(inputNumber.value);

    if (!isNaN(n) && n >= 1 && n <= 40) {
        const result = fib(n);

        resultsList.innerHTML = "";

        result.forEach((value, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `fib(${index}) = ${value}`;
            resultsList.appendChild(listItem);
        });
    } else {
        alert("Введите корректное значение n (1-40).");
    }
});

clearButton.addEventListener("click", function() {
    fibArray = [0, 1];
    resultsList.innerHTML = "";
});
