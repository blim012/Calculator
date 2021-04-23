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
    const result = operate(op1, op2, input.operator);

    result === 'OOPS' ? input.op1 = '' : input.op1 = result.toString(); 
    input.op2 = '';
    input.operator = ''; 
    console.log(input);

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

    console.log(result);
    return result;
}

function numberInput(numString)
{
    //Delete op1 if an operator was not selected after '=',
    //which starts a new equation instead of using previous result
    if(input.op1 != '' && input.operator === '') input.op1 = '';
    
    console.log('input: ' + numString);
    input.currentNum === '0' ? input.currentNum = numString : input.currentNum += numString;
    console.log('currentNum: ' + input.currentNum);
    updateDisplay(input.currentNum);
}

function decimalInput()
{
    if(input.currentNum.indexOf('.') === -1)
    {
        if(input.currentNum === '') input.currentNum = '0';
        input.currentNum += '.';    
    } 
    console.log('currentNum: ' + input.currentNum);
    updateDisplay(input.currentNum);
}

function operatorInput(operator)
{
    setOperand();
    equal();
    
    input.operator = operator;
    console.log(input.operator);
}

function toggleSign()
{
    //If a user flips the sign of a result of an equation
    if(input.op1 != '' && input.operator === '')
    {
        input.op1.indexOf('-') === -1 ? 
            input.op1 = `-${input.op1}` :
            input.op1 = input.op1.slice(1);
        
        updateDisplay(input.op1);
    }
    else if(input.currentNum != '')
    {
        input.currentNum.indexOf('-') === -1 ? 
            input.currentNum = `-${input.currentNum}` :
            input.currentNum = input.currentNum.slice(1);
        
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

function isFullEquation()
{
    if(input.op1 != '' && input.op2 != '' && input.operator != '') return true;
    console.log('nope');
    return false;
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

/*
TODO::
    - Prevent numbers from being too long and stay in display
    - Center the display text
    - update README
*/