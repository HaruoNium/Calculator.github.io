let currentInput = '0';
let operator = null;
let previousInput = '0';

function updateDisplay() {
    document.getElementById('display').textContent = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousInput = '0';
    updateDisplay();
}

function inputDigit(digit) {
    if (currentInput === '0' && digit !== '.') {
        currentInput = digit.toString();
    } else {
        currentInput += digit.toString();
    }
    updateDisplay();
}

function addDecimalPoint() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function toggleSign() {
    currentInput = (-parseFloat(currentInput)).toString();
    updateDisplay();
}

function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

function operate(nextOperator) {
    if (operator !== null) {
        calculate();
    }
    previousInput = currentInput;
    currentInput = '0';
    operator = nextOperator;
}

function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current !== 0) {
                result = prev / current;
            } else {
                result = 'Error';
            }
            break;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '0';
    updateDisplay();
}

// Event listeners for keyboard support
document.addEventListener('keydown', (event) => {
    const { key } = event;
    if (!isNaN(key) || key === '.') {
        inputDigit(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        operate(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    }
});
