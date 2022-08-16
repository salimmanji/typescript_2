// unknown

let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Hello';
if (typeof userInput === 'string') {
    userName = userInput;
}

// never intended to return
function generateError(message: string, code: number): never {
    throw {
        message: message,
        errorCode: code,
    };
}

const abc = generateError('An error has occured!', 500);
console.log(abc);

