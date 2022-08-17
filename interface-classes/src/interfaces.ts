interface Person {
    name: string;
    age: number;

    greet(phrase: string): void;
}

let user1: Person;

user1 = {
    name: "James",
    age: 33,
    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
};

user1.greet('Hi there, I am');

interface Named {
    readonly name: string;
}

interface Greetable extends Named{
    greet(phrase: string): void;
}

// Person2 now needs everything from Greetable interface, as well as the Named interface
class Person2 implements Greetable {
    name: string;
    age: number = 30;
    constructor(n:string) {
        this.name = n;
    }

    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
};

let user2: Greetable;
user2 = new Person2('James');
console.log(user2);

type AddFn = (a:number, b: number) => number;
let add: AddFn;
add = (n1: number, n2: number) => {
    return n1 + n2;
}

interface AddFn2 {
    (a: number, b: number): number;
}
let add2 = (n1: number, n2: number) => {
    return n1 + n2;
}

// Optional Parameters and Properties
interface Named2 {
    readonly name?: string;
    outputName?: string;
}

interface Greetable2 extends Named2{
    greet(phrase: string): void;
}

class Person3 implements Greetable2 {
    name?: string;
    age: number = 30;
    constructor(n?:string) {
        if (n) {
            this.name = n;
        }
    }

    greet(phrase: string) {
        if(this.name) {
            console.log(phrase + ' ' + this.name);
        } else {
            console.log('Hi!');
        }
    }
};

const user3 = new Person3();
console.log(user3);