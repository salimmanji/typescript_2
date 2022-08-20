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