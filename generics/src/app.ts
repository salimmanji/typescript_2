// const names = ['Anna', 'Max'];

// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('This is done!');
//     }, 2000);
// });

// promise.then(data => {
//     data.split(' ');
// })

//Generic Functions
function merge(objA: object, objB: object) {
    return Object.assign(objA, objB);
}

console.log(merge({name: 'joe'}, {age: 30}));

const mergedObj = merge({name: 'Max'}, {age: 99});
//console.log(mergedObj.age);



function merge2<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObj2 = merge2({name: 'Abc', hobbies: ['Sports']}, {age: 262});
console.log(mergedObj2.age);



// Working with Constraints
function merge3<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}
const mergedObj3 = merge3({name: 'Def', hobbies: ['Cooking']}, {age: 32});
console.log(mergedObj3.age);


// Another Generic Function
interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = "got not value";
    if (element.length == 1) {
        descriptionText = `Got 1 value`;
    } else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements`;
    }
    return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(['Cooking', 'Sports']));
console.log(countAndDescribe([]));



// Keyof constraint
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}

console.log(extractAndConvert({name: 'Max'}, 'name'));


// Generic Classes
class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
const unionStorage = new DataStorage<number | string>();

const maxObj = {name: 'Max'};
//const objStorage = new DataStorage<object>();
//objStorage.addItem(maxObj);
//objStorage.addItem({name: 'Manu'});
// ... some code
//objStorage.removeItem({name: 'Max'}); //new object, not the original value passed in to create
//console.log(objStorage.getItems());

// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());


// Generic Utility Types

// Partial
interface CourseGoal {
    title: string;
    description: string;
    compleUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.compleUntil = date;
    return courseGoal as CourseGoal;
}

// Readonly types
const names: Readonly<string[]> = ['Max', 'Anna'];
//names.push('Manu');
//names.pop();

// Generics vs Unions
// class DataStorage2{
//     private data: string[] | number[] | boolean[] [] = [];

//     addItem(item: string | number | boolean) {
//         this.data.push(item);
//     }

//     removeItem(item: string | number | boolean) {
//         if (this.data.indexOf(item) === -1) {
//             return;
//         }
//         this.data.splice(this.data.indexOf(item), 1);
//     }

//     getItems() {
//         return [...this.data];
//     }
// }