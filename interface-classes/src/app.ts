const button = document.querySelector('button');

button?.addEventListener('click', () => console.log('Clicked!'));

class Department {
    name: string;

    constructor(n: string) {
        this.name = n;
    }

    describe(this: Department) {
        console.log(`Department: ${this.name}`);
    }
}

const acct = new Department('Accounting');
console.log(acct);

acct.describe();

const acctCopy = { name: 's', describe: acct.describe };
acctCopy.describe();