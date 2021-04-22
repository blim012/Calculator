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
    //precondition where this is only called when full eq
    const op1 = parseFloat(input.op1);
    const op2 = parseFloat(input.op2);
    const result = operate(op1, op2, input.operator);

    input.op1 = result;
    input.op2 = '';
    input.operator = ''; //may not be needed
    console.log(input);
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
    //check to see if it'll get too long here
    console.log('input: ' + numString);
    input.currentNum += numString;
    console.log('currentNum: ' + input.currentNum);
}

function operatorInput(operator)
{
    if(input.currentNum === '') return;
    input.op1 === '' ? input.op1 = input.currentNum : input.op2 = input.currentNum; 
    input.currentNum = '';

    if(isFullEquation())
    {
        equal();
    }

    input.operator = operator;
    console.log(input.operator);
}

function isFullEquation()
{
    if(input.op1 != '' && input.op2 != '' && input.operator != '') return true;
    return false;
}

function printCurrentNum()
{
    console.log(input.currentNum);
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
            default:
        }
    }
}

document.addEventListener('DOMContentLoaded', () =>
{
    document.addEventListener('keydown', (e) =>
    {
        checkKeyboardInput(e.key);
    });
});