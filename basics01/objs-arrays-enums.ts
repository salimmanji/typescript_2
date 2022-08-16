// const person: {
//     name: string;
//     age: number;
// } = { Redundant
const person = {
  name: "Joe",
  age: 300,
};

console.log(person);

// property nickname does not exist console.log(person.nickname);
console.log(person.name);

// const product = {
//     id: 'abc1',
//     price: 12.99,
//     tags: ['great-offer', 'hot-and-new'],
//     details: {
//       title: 'Red Carpet',
//       description: 'A great carpet - almost brand-new!'
//     }
//   }

// {
//     id: string;
//     price: number;
//     tags: string[];
//     details: {
//       title: string;
//       description: string;
//     }

const person2 = {
  name: "Joe",
  age: 300,
  hobbies: ["Sports", "Cooking"],
};

//let favoriteActivities: string[];
let favoriteActivities: any[]; //any type

for (const hobby of person2.hobbies) {
  console.log(hobby.toUpperCase());
}

const person3: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: "Joe",
  age: 300,
  hobbies: ["Sports", "Cooking"],
  role: [2, "author"],
};

person3.role.push("admin");
//person3.role[1] = 10;
// ^ This can still be done, since the array is expecting either of the two types
// ... so, Tuple!

//person.role = []; can't be an empty array, needs to be a tuple

//Enums
//specific identfiers/global constants
// role: admin 0, read only 1, author 2

//const ADMIN = 'ADMIN';

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {
  ADMIN = 5,
  READ_ONLY,
  AUTHOR,
}

const person4 = {
  name: "Joe",
  age: 300,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

if (person4.role === Role.AUTHOR) {
  console.log("is author");
} else if (person4.role === Role.ADMIN) {
  console.log("is admin");
}

for (const e in Role) {
    console.log(e + " - " + Role[e]);
}

let anyThing: any = 'abc';
anyThing = 124;
anyThing = [54 , 'abc', true];


