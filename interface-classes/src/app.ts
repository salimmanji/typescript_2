const button = document.querySelector('button');

button?.addEventListener('click', () => console.log('Clicked!'));

class Department {
    private name: string;
    private employees: string[] = [];

    constructor(n: string) {
        this.name = n;
    }

    describe(this: Department) {
        console.log(`Department: ${this.name}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

const acct = new Department('Accounting');

acct.addEmployee('Max');
acct.addEmployee('Anna');

// acct.employees[2] = 'Joe';

acct.describe();
acct.printEmployeeInformation();

// const acctCopy = { name: 's', describe: acct.describe };
// acctCopy.describe();

class Department2 {
    private employees: string[] = [];

    constructor(private id: string, public name: string) {
    }

    describe(this: Department2) {
        console.log(`Department: (${this.id}) ${this.name}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

const marketing = new Department2('d1', 'Marketing');
marketing.describe();