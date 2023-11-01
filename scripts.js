// Create global variables
let buttons = document.querySelectorAll('.button');
let displayElements = document.querySelectorAll('.display div');
let inputList = [];
let currentOperation = null;
let currentOperand = null;
let newCalculation = false;

// Button click handler
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        animateButton(button);
        handleInput(button.querySelector('p').innerText);
    });
});

// Create button click animation
function animateButton(button) {
    button.style.boxShadow = '0 0 2px #000';
    button.style.backgroundColor = '#aaa';
    button.style.transition = '0.3s';
    
    setTimeout(function() {
        button.style.boxShadow = '';
        button.style.backgroundColor = '';
        button.style.transition = '0.3s';
    }, 300);
}

// Processes user input
function handleInput(value) {
    if (isNumber(value) || value === '.') {
        if (newCalculation){
            inputList =[];
            clearDisplay();
            newCalculation = false;
        }
        inputList.push(value);
        shiftValueAndAddNew(value);
    } else if (isOperation(value)) {
        currentOperand = parseFloat(inputList.join(''));
        currentOperation = value;
        inputList = [];
        clearDisplay();
        newCalculation = false;
    } else if (value === 'Bs') {
        inputList.pop();
        unshiftValueAndRemoveLast()
    } else if (value === 'C') {
        inputList = [];
        currentOperation = null;
        currentOperand = null;
        clearDisplay();
    } else if (value === '=') {
        let result = performOperation(
            currentOperand,
            parseFloat(inputList.join('')),
            currentOperation);
        clearDisplay();
        inputList = Array.from(result.toString());
        if (inputList.length > 9) {
            inputList = ['I','D', 'O','N','T','K','N','O','W']
        }
        inputList.reverse()
        for (let i = inputList.length - 1; i >= 0; i--) {
            shiftValueAndAddNew(inputList[i]);
        }
        newCalculation = true;
    }
}

// Checks the number or not
function isNumber(value) {
    return !isNaN(value);
}

//  Checks the mathematical operatio or not
function isOperation(value) {
    return ['+', '-', '*', '/', '%'].includes(value);
}

// Performs mathematical calculations
function performOperation(operand1, operand2, operation) {
    switch(operation) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
        case '%':
            result = getPercentage(operand1, operand2);
            break;
    }
    return Math.round(result * 1000000000000) / 1000000000000;
}

// Clears the display
function clearDisplay() {
    displayElements.forEach(function(num) {
        num.innerText = '';
    });
}

// Displays data
function shiftValueAndAddNew(newVal) {
    for (let i = 0; i < displayElements.length - 1; i++) {
        displayElements[i].innerText = displayElements[i + 1].innerText;

        if (displayElements[i].innerText !== '') {
            applyStylesToDisplay(displayElements[i]);
        }
    }

    displayElements[displayElements.length - 1].innerText = newVal;

    if (displayElements[displayElements.length - 1].innerText !== '') {
        applyStylesToDisplay(displayElements[displayElements.length - 1]);
    }
}

// Cancels last entry
function unshiftValueAndRemoveLast() {
    for (let i = displayElements.length - 1; i > 0; i--) {
        displayElements[i].innerText = displayElements[i - 1].innerText;
    }
    displayElements[0].innerText = '';
}

// Applies styles to display input
function applyStylesToDisplay(element) {
    element.style.transform = 'rotateY(90deg)';
    element.style.transition = '0.3s';
    
    setTimeout(function() {
        element.style.transform = '';
        element.style.transition = '0.3s';
    }, 300);
}

// Returns the percentage of a number
function getPercentage(total, percent) {
    return (total * percent) / 100;
}
