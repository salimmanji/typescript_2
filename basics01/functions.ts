function add(n1: number, n2: number): number {
    return n1 + n2;
}

function printResult(num: number) {
    console.log('Result: ' + num);
}

printResult(add(5, 12));

let someValue: undefined; // not very useful...

function printResult2(num: number): undefined {
    console.log('Result: ' + num);
    return; // return without an action value
}

// Functions as Types
let combinedValues: (a: number, b: number) => number;
combinedValues = add;
console.log(combinedValues(8, 8));
// combinedValues = printResult2;
// console.log(combinedValues(8, 8));

//Function Types and Callbacks
function addAndHandle(n1: number, n2: number, callback: (a: number) => void) {
    const result = n1 + n2;
    callback(result);
}

addAndHandle(10, 20, (result) => {console.log(result)});

