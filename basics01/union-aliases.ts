//Union type
function add(n1: number, n2: number) {
  return n1 + n2;
}

function combine(input1: number | string | boolean, input2: number | string) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine("Max", "Anna");
console.log(combinedNames);

// Literal Types
const number2 = 2.8;

function combine2(
  input1: number | string,
  input2: number | string,
  resultConversion: string
) {
  let result;

  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  // if (resultConversion === 'as-number') {
  //     return +result; // same as parseFloat(result);
  // } else {
  //     return result;
  // }
  return result;
}

const converted = combine2(30, 26, "as-number");
console.log(converted);
const converted2 = combine2("30", "26", "as-number");
console.log(converted2);
const converted3 = combine2("Max", "Max", "as-text");
console.log(converted3);

//union type and literal type
//specifically only the two strings 'as-number' or 'as-text'
function combine3(
  input1: number | string,
  input2: number | string,
  resultConversion: "as-number" | "as-text"
) {
  let result;

  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const converted4 = combine3("30", "26", "as-number");
console.log(converted2);
const converted5 = combine3("Max", "Max", "as-text");
console.log(converted3);

// type alias
type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";
function combine4(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;

  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

// Type alias and Object types
// Create your own type
type User = { name: string; age: number };
const u1: User = { name: "Max", age: 30 }; // this works!

function greet(user: { name: string; age: number }) {
  console.log("Hi, I am " + user.name);
}

function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}

// Can simplify code to:
function greet2(user: User) {
  console.log("Hi, I am " + user.name);
}

function isOlder2(user: User, checkAge: number) {
  return checkAge > user.age;
}
