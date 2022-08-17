const add = (n1: number, n2: number) => n1 + n2;

const printOutput = (output: string | number) => {
    console.log(output);
};

const printOutput2: (a: number | string) => void = output => console.log(output);

const button = document.querySelector('button');
if (button) {
    button.addEventListener('click', event => console.log(event));
}


//Default Function Parameters
const multiply = (n1: number, n2: number = 1) => n1 * n2;
console.log(multiply(2));


const divide = (n1: number, n2: number) =>  n1 / n2;

printOutput(add(5, 2));


const hobbies = ['sports', 'cooking'];

console.log(hobbies[0]);

const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies);

const otherHobbies = ['Jumping', ...hobbies, ...activeHobbies];

console.log(otherHobbies)


const person = {
    name: 'Abc',
    age: 30,
};

const copiedPerson = person;

copiedPerson.age = 99;

console.log(person);
console.log(copiedPerson);

copiedPerson.age = 13;

console.log(person);
console.log(copiedPerson);

const copiedPerson2 = {... person};

copiedPerson2.age = 45;


const combine = (...numbers: number[]) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};

const addedNums = combine(5, 10, 2.3, 7.6);

console.log(addedNums);

//Use with Tuples
const combine2 = (...numbers: [number, number, number]) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};

console.log(combine2(3, 1.2, 5))


//Array destructuring
const hobby1 = hobbies[0];
const hobby2 = hobbies[1];
const [ hobby3, hobby4, ...remainingHobbies ] = hobbies;

//Object destructuring
const person3 = {
    firstName: 'Abc',
    age: 30,
};

const { firstName, age } = person3;

const { firstName:userName, age:userAge } = person3;
console.log(userAge);