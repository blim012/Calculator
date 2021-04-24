const input = {op1: '', op2: '', operator: '', currentNum: ''};

function add(op1, op2)
{
    return op1 + op2;
}

function subtract(op1, op2)
{
    return op1 - op2;
}

function multiply(op1, op2)
{
    return op1 * op2;
}

function divide(op1, op2)
{
    if(op2 == 0) return 'OOPS';
    return op1 / op2;
}

function equal()
{
    if(!isFullEquation()) return;
    const op1 = parseFloat(input.op1);
    const op2 = parseFloat(input.op2);
    let result = operate(op1, op2, input.operator);

    if(result === 'OOPS')
    {
        allClear();
        updateDisplay('Just Don\'t');
        return;
    }
    if(isMaxLength(result.toString())) result = numberToExponential(result.toString()); 

    input.op1 = result.toString(); 
    input.op2 = '';
    input.operator = ''; 

    updateDisplay(result);
}

function operate(op1, op2, operator)
{
    let result;
    switch(operator)
    {
        case '+':
            result = add(op1, op2);
            break;

        case '-':
            result = subtract(op1, op2);
            break;

        case '*':
            result = multiply(op1, op2);
            break;

        case '/':
            result = divide(op1, op2);
            break;

        default:
            result = 'OOPS';
    }

    return result;
}

function numberInput(numString)
{
    if(isMaxLength(input.currentNum)) return;

    //Delete op1 if an operator was not selected after '=',
    //which starts a new equation instead of using previous result
    if(input.op1 != '' && input.operator === '') input.op1 = '';
    
    input.currentNum === '0' ? input.currentNum = numString : input.currentNum += numString;
    updateDisplay(input.currentNum);
}

function decimalInput()
{
    if(isMaxLength(input.currentNum)) return;

    if(input.currentNum.indexOf('.') === -1)
    {
        if(input.currentNum === '') input.currentNum = '0';
        input.currentNum += '.';    
    } 
    updateDisplay(input.currentNum);
}

function operatorInput(operator)
{
    setOperand();
    equal();
    input.operator = operator;
}

function toggleSign()
{
    //If a user flips the sign of a result of an equation
    if(input.op1 != '' && input.operator === '')
    {
        if(input.op1.indexOf('-') === -1)
        {
            if(isMaxLength(input.op1)) return; 
            input.op1 = `-${input.op1}`;
        }
        else input.op1 = input.op1.slice(1);
        updateDisplay(input.op1);
    }
    else if(input.currentNum != '')
    {
        if(input.currentNum.indexOf('-') === -1)
        {
            if(isMaxLength(input.currentNum)) return;
            input.currentNum = `-${input.currentNum}`;
        }
        else input.currentNum = input.currentNum.slice(1);
        updateDisplay(input.currentNum);
    }
}

function clear()
{
    input.currentNum = '';
    updateDisplay(input.currentNum);
}

function allClear()
{
    for(let key in input)
    {
        input[key] = '';
    }
    updateDisplay(input.currentNum);
}

function setOperand()
{
    if(input.currentNum === '') return;
    input.op1 === '' ? input.op1 = input.currentNum : input.op2 = input.currentNum; 
    input.currentNum = '';
}

function isMaxLength(numString)
{
    if(numString.length >= 10) return true; 
    return false;
}

function isFullEquation()
{
    if(input.op1 != '' && input.op2 != '' && input.operator != '') return true;
    return false;
}

function numberToExponential(numString)
{
    numString = parseFloat(numString).toExponential();
    if(numString.length > 10) numString = parseFloat(numString).toExponential(3);
    return numString;
}

function checkKeyboardInput(key)
{
    if(!isNaN(key) && !isNaN(parseFloat(key)))
    {
        numberInput(key);
    }
    else 
    {
        switch(key)
        {
            case '+':
            case '-':
            case '*':
            case '/':
                operatorInput(key);
                break;

            case '=':
            case 'Enter':
                setOperand();
                equal();
                break;

            case '.':
                decimalInput();
                break;

            case 'Escape':
                allClear();
                break;

            case 'Backspace':
            case 'c':
                clear();
            default:
        }
    }
}

function updateDisplay(numString)
{
    const screen = document.querySelector('#screen');
    screen.textContent = numString;
}

document.addEventListener('DOMContentLoaded', () =>
{  
    const decimalButton = document.querySelector('#decimal');
    const signButton = document.querySelector('#sign');
    const clearButton = document.querySelector('#clear');
    const clearAllButton = document.querySelector('#all-clear');
    const equalButton = document.querySelector('#equal');
    const grid = document.querySelector('#grid');
    const numberButtonList = grid.querySelectorAll('.number');
    const operatorButtonList = grid.querySelectorAll('.operator');

    signButton.addEventListener('click', toggleSign);
    decimalButton.addEventListener('click', decimalInput);
    clearButton.addEventListener('click', clear);
    clearAllButton.addEventListener('click', allClear);
    equalButton.addEventListener('click', () =>
    {
        setOperand();
        equal();
    });

    numberButtonList.forEach((numberButton) => 
    {
        numberButton.addEventListener('click', () => numberInput(numberButton.value));
    });

    operatorButtonList.forEach((operatorButton) => 
    {
        operatorButton.addEventListener('click', () => operatorInput(operatorButton.value));
    });

    document.addEventListener('keydown', (e) =>
    {
        checkKeyboardInput(e.key);
    });
});