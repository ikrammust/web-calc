const calc = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    secondNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calc.displayNumber;
}

function clearCalc() {
    calc.displayNumber = '0';
    calc.operator = null;
    calc.firstNumber = null;
    calc.secondNumber = null;
    calc.waitingForSecondNumber = false;
}

function inverseCalc() {
    if (calc.displayNumber === '0') {
        return;
    } else {
        calc.displayNumber = calc.displayNumber * -1;
    }
}

function handleOperator(operator) {
    if (!calc.waitingForSecondNumber) {
        calc.operator = operator;
        calc.waitingForSecondNumber = true;
        calc.firstNumber = calc.displayNumber;
    } else {
        alert("Operator sudah di tetapkan");
    }
}

function inputDigit(digit) {
    if (calc.waitingForSecondNumber && calc.firstNumber === calc.displayNumber) {
        calc.displayNumber = digit;
    } else {
        if (calc.displayNumber === '0') {
            calc.displayNumber = digit;
        } else {
            calc.displayNumber += digit;
        }
    }
}

function performCalc() {
    if (calc.firstNumber == null || calc.operator == null) {
        alert("Anda belum menentukan operator");
        return;
    }

    let result = 0
    calc.secondNumber = calc.displayNumber;
    if (calc.operator === "+") {
        result = parseInt(calc.firstNumber) + parseInt(calc.displayNumber);
    } else {
        result = parseInt(calc.firstNumber) - parseInt(calc.displayNumber);
    }

    // object yang akan di kirim sebagai argumen putHistory()
    const history = {
        firstNumber: calc.firstNumber,
        operator: calc.operator,
        secondNumber: calc.secondNumber,
        result: result
    }
    putHistory(history);
    calc.displayNumber = result;
    renderHistory();
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function (event) {

        // mendapatkan objek
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalc();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseCalc();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalc();
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}