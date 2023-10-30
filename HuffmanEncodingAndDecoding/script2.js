function huffman_decode(encodedString, encodingMap) {
    let decodedString = "";
    let currentCode = "";

    for (const bit of encodedString) {
        currentCode += bit;
        for (const [char, code] of encodingMap) {
            if (currentCode === code) {
                decodedString += char;
                currentCode = "";
                break;
            }
        }
    }

    return decodedString;
}

const decodeButton = document.getElementById("decodeButton");
decodeButton.addEventListener("click", function () {
    const encodedText = document.getElementById("encodedText").value;
    const huffmanDataText = document.getElementById("huffmanData").value;

    const encodingLines = huffmanDataText.split('\n');
    const encodingMap = new Map();

    for (const line of encodingLines) {
        const match = line.match(/'(.*)': '(.*)'/);
        if (match && match.length === 3) {
            const char = match[1];
            const code = match[2];
            encodingMap.set(char, code);
        }
    }

    const result = huffman_decode(encodedText, encodingMap);

    const decodedDiv = document.getElementById("decodedResult");
    decodedDiv.innerHTML = `<strong>Раскодированная строка:</strong><br>${result}`;

    const errorOutput = document.getElementById("errorOutput");
    errorOutput.innerText = "";
});

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", function () {
    const decodedDiv = document.getElementById("decodedResult");
    decodedDiv.innerHTML = "";

    const errorOutput = document.getElementById("errorOutput");
    errorOutput.innerText = "";
});
