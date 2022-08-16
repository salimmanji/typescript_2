// const person: {
//     name: string;
//     age: number;
// } = { Redundant
const person = {
    name: 'Joe',
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
    name: 'Joe',
    age: 300,
    hobbies: ['Sports', 'Cooking'],
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
    name: 'Joe',
    age: 300,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author'],
};

person3.role.push('admin');
//person3.role[1] = 10;
// ^ This can still be done, since the array is expecting either of the two types
// ... so, Tuple!

//person.role = []; can't be an empty array, needs to be a tuple




