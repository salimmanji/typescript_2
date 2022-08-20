//Decorators
function Logger(constructor: Function) {
    console.log('Logging...');
    console.log(constructor);
}

@Logger
class Person {
    name = 'Max';

    constructor() {
        console.log('Creating person...');
    }
}

const pers = new Person();
console.log(pers);



// Decorator Factory
function Logger2(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

@Logger2('Logging-Person')
class Person2 {
    name = 'Max';

    constructor() {
        console.log('Creating person...');
    }
}

const pers2 = new Person2();
console.log(pers2);


// More Useful Decorators
function Logger3(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function withTemplate(template: string, hookId: string) {
    return function(constructor: any) {
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}

@withTemplate('<h1>My Person Object</h1>', 'app')
class Person3 {
    name = 'Max';

    constructor() {
        console.log('Creating person...');
    }
}

const pers3 = new Person3();
console.log(pers3);

// Multiple Decorators
function Logger4(logString: string) {
    console.log('Logger Factory');
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function withTemplate4(template: string, hookId: string) {
    console.log('Template Factory');
    return function(constructor: any) {
        console.log('Rendering Template4...')
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}

@Logger4('Logging... Logger 4')
@withTemplate4('<h1>My Person Object</h1>', 'app')
class Person4 {
    name = 'Max';

    constructor() {
        console.log('Creating person...');
    }
}

const pers4 = new Person4();
console.log(pers4);


// Property Decorators
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property Decorator');
    console.log(target, propertyName)
}

class Product {
    @Log
    title: string;
    private _price: number;

    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error ('Price must be greater than 0');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    getPriceWithTax(tax: number) {
        return this._price * (1 + tax);
    }
}

// Accessor and Function Decorators
// Property Decorator
function Log2(target: any, propertyName: string | Symbol) {
    console.log('Property Decorator');
    console.log(target, propertyName)
}

// Accessor Decorator
function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor Decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// Method Decorator
function Log4(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Method Decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// Param Decorator
function Log5(target: any, name: string | Symbol, position: number) {
    console.log('Param Decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product2 {
    @Log2
    title: string;
    private _price: number;

    @Log3
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error ('Price must be greater than 0');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log4
    getPriceWithTax(@Log5 tax: number) {
        return this._price * (1 + tax);
    }
}


// Returning a Class in a Class Decorator
function withTemplate2(template: string, hookId: string) {
    console.log('Template Factory');
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any) {
                super();
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    };
}

@Logger4('Logging... Logger 4')
@withTemplate2('<h1>My Person Object</h1>', 'app')
class Person5 {
    name = 'Max';

    constructor() {
        console.log('Creating person...');
    }
}

const pers5 = new Person4();
console.log(pers5);


// Autobind Decorator
//function Autobind(target: any, methodName: string | Symbol | number, descriptor: PropertyDescriptor) {
function Autobind(_: any, _2: string | Symbol | number, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return adjustedDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button');
//button?.addEventListener('click', p.showMessage.bind(p));
button?.addEventListener('click', p.showMessage);


// Decorators for Validation
interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]; // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    };
}

function Validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) { // Nothing to validate
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch(validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;
    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if (!Validate(createdCourse)) {
        alert('Invalid Input!');
        return;
    }

    console.log(createdCourse);
});