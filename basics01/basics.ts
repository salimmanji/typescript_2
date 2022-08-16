function add (n1: number, n2: number, showResult: boolean) {
    console.log(typeof(n1));
    if(showResult) {
        console.log(n1+n2);
    } else {
        return 'Answer = ' + (n1 + n2);
    }
}

const number1:number = 5; // redundant, unless instantiated but not initialized... let number1:number; number1 =5;
const number2 = 3.4;
const printResult = false;


const result = add(number1, number2, printResult);
console.log(result);

