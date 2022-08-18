// Intersecting types
type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'ABC',
    privileges: ['create-server'],
    startDate: new Date(),
}

type Combinable = string | number; // union type
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // intersection of the two above union types means Universal types must be a number

function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}


// Type Guards
type UnknownEmployee = Employee | Admin; // either an Employee or an Admin

// Can't use typeof, need stricter checks
function printEmployeeInfo(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);
    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate);
    }
}

printEmployeeInfo(e1);


// Instance of
class Car {
    drive() {
        console.log('Driving...');
    }
}

class Truck {
    drive() {
        console.log('Driving a truck...');
    }
    loadCargo(amount: number,) {
        console.log('Loading cargo... ' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if ('loadCargo' in vehicle) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

function useVehicle2(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle2(v1);
useVehicle2(v2);



// Discriminated Union
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird': 
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
        console.log('Moving with speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 30});



// Type Casting threeway
const p = document.querySelector('#message-output') as HTMLInputElement;
const i = <HTMLInputElement>document.querySelector('#user-input')!;

i.value = 'Hi there!';
p.innerHTML = 'Hi there!';

const userInputElement = document.getElementById('another-input');
if (userInputElement) {
    (userInputElement as HTMLInputElement).value = 'Hello!';
}



// Index Properties
interface ErrorContainer { // {email: 'not a valid email, username: 'Must start with a char}
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Must start with a capital character!',
};



// Function Overloads
function add2(a: number, b: number): number;
function add2(a: string, b: string): string;
function add2(a: number, b: string): number
function add2(a: string, b: number): number
function add2(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add2(1,5);
const result2 = add2('Abc ', 'Def');
result2.split(' ');


// Optional Chaining
const fetchedUserData = {
    id: 'u1',
    name: 'Abc',
    job: { title: 'CEO', description: 'My own company.'}
};

console.log(fetchedUserData.job.title);

const fetchedUserData2 = {
    id: 'u1',
    name: 'Abc',
    //job: { title: 'CEO', description: 'My own company.'}
};

// console.log(fetchedUserData2?.job?.title);



// Nullish Coalescing
const userInput = null;

const storedData =  userInput ?? 'DEFAULT';
console.log(storedData);