function eval() {
    // Do not use eval!!!
    return;
}

const checkString = expr => {
    let strCheck = removeSpaces(expr);
    if(strCheck.includes('/0'))
        throw new Error("TypeError: Division by zero.");
    if(strCheck.split( /\(/g ).length !== strCheck.split( /\)/g ).length)
        throw new Error("ExpressionError: Brackets must be paired");
}

const removeSpaces = expr => {
    return (expr.split("").includes(" ")) ? expr.split(" ").join("") : expr;
}

const getArrayOfNumbersAndSigns = expr => {
    if (!expr.split('').includes(' ')) 
        expr = expr.split('').join(' ');
    let arr = expr.split(" ");
    while (arr.includes("")) 
        arr.splice(arr.indexOf(""), 1);
        return arr;
}

function expressionCalculator(expr) {
    checkString(expr);

    let numbers = [];
    let signs = [];
    let operations = {
        "+": (a, b) => +a + +b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    }
    let priorities = {"+": 1, "-": 1, "*": 2, "/": 2};

    let a, b, manipulation;
    let arr = getArrayOfNumbersAndSigns(expr);

    arr.forEach(el => {
        if(/\d/.test(el))
            numbers.push(el);
        else if(el === ")") {
            while(signs[signs.length-1] !== "(") {
                b = numbers.pop();
                a = numbers.pop();
                manipulation = signs.pop();
                numbers.push(operations[manipulation](a, b));
            }
            signs.pop();
        }
        else if(signs.length === 0 || el === "(" || priorities[signs[signs.length-1]] < priorities[el] || signs[signs.length-1] === "(")
            signs.push(el);
        else {
            while(priorities[signs[signs.length-1]] >= priorities[el]) {
                b = numbers.pop();
                a = numbers.pop();
                manipulation = signs.pop();
                numbers.push(operations[manipulation](a, b));
            }
            signs.push(el);
        }
    }
    );

    while(signs.length !== 0) {
        b = numbers.pop();
        a = numbers.pop();
        manipulation = signs.pop();
        numbers.push(operations[manipulation](a, b));
    }
    return numbers.pop();
}

module.exports = {
    expressionCalculator
}