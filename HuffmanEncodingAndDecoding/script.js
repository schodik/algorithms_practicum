function huffman_encode(input) {
    const frequencyMap = new Map();
    for (const char of input) {
        if (frequencyMap.has(char)) {
            frequencyMap.set(char, frequencyMap.get(char) + 1);
        } else {
            frequencyMap.set(char, 1);
        }
    }

    const heap = new MinHeap();

    for (const [char, frequency] of frequencyMap) {
        heap.insert({ char, frequency });
    }

    while (heap.size() > 1) {
        const left = heap.extractMin();
        const right = heap.extractMin();
        const newNode = { char: null, frequency: left.frequency + right.frequency, left, right };
        heap.insert(newNode);
    }

    const root = heap.extractMin();

    const encodingMap = {};
    function buildEncodingMap(node, encoding = '') {
        if (node.char) {
            encodingMap[node.char] = encoding;
        } else {
            buildEncodingMap(node.left, encoding + '0');
            buildEncodingMap(node.right, encoding + '1');
        }
    }
    buildEncodingMap(root);

    let encodedString = '';
    for (const char of input) {
        encodedString += encodingMap[char];
    }

    return {
        uniqueChars: frequencyMap.size,
        encodedSize: encodedString.length,
        encodingMap,
        encodedString,
    };
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    insert(node) {
        this.heap.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const element = this.heap[index];
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (element.frequency >= parent.frequency) {
                break;
            }
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
        }
    }

    extractMin() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown();
        }
        return min;
    }

    sinkDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            const leftChildIdx = 2 * index + 1;
            const rightChildIdx = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.heap[leftChildIdx];
                if (leftChild.frequency < element.frequency) {
                    swap = leftChildIdx;
                }
            }

            if (rightChildIdx < length) {
                rightChild = this.heap[rightChildIdx];
                if (
                    (swap === null && rightChild.frequency < element.frequency) ||
                    (swap !== null && rightChild.frequency < leftChild.frequency)
                ) {
                    swap = rightChildIdx;
                }
            }

            if (swap === null) {
                break;
            }

            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
}

const encodeButton = document.getElementById("encodeButton");
encodeButton.addEventListener("click", function() {
    const inputText = document.getElementById("inputText").value;
    const result = huffman_encode(inputText);

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        Уникальных символов: ${result.uniqueChars}<br>
        Размер закодированной строки (в битах): ${result.encodedSize}<br>
        <hr>
        <strong>Таблица кодирования:</strong><br>
    `;

    for (const [char, code] of Object.entries(result.encodingMap)) {
        resultDiv.innerHTML += `'${char}': '${code}'<br>`;
    }

    resultDiv.innerHTML += `<hr><strong>Закодированная строка:</strong><br>${result.encodedString}`;
});

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", function() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
});


