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
}

function decimalInput()
{
    if(input.currentNum.indexOf('.') === -1)
    {
        if(input.currentNum === '') input.currentNum = '0';
        input.currentNum += '.';    
    } 
    console.log('currentNum: ' + input.currentNum);
}

function operatorInput(operator)
{
    setOperand();
    equal();
    
    input.operator = operator;
    console.log(input.operator);
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
                break;

            case '=':
            case 'Enter':
                setOperand();
                equal();
                break;

            case '.':
                decimalInput();
                break;
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

/*
TODO::
    - Prevent leading 0's in operands
    - implement decimals numbers
    - implement clear (AC and/or C, where AC clears everything in the input obj, and
                       C clears only the currentNum)
    - implement calculator UI
    - implement calculator input/output display
        - Prevent numbers from being too long and stay in display
    - implement calculator button listeners
    - implement negatives
        - Make it a toggle that just appends '-' to the beginning of the string?
        - Alternatively, since we're already checking for '-' in our operator check,
          maybe it's better to just add a boolean in our input?
        - One second thought, maybe don't allow negatives via keyboard, but allow it 
          on the UI buttons instead, and use the first implementation mentioned here
*/