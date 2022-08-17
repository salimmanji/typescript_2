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
    protected employees: string[] = [];

    constructor(private readonly id: string, public name: string) {
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

class ITDepartment extends Department2 {
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }
}

const ITdept = new ITDepartment('d2', ['Max']);
console.log(ITdept);

//Shorthand
class AccountingDepartment extends Department2 {
    constructor(id: string, private reports: string[]) {
        super(id, 'IT');
    }

    addReport(report: string) {
        this.reports.push(report);
    }

    printReports() {
        console.log(this.reports);
    }
}

const acct2 = new AccountingDepartment('d3', []);

acct2.addReport('Something went Wrong');
acct2.printReports();

//Protected Modifier
class HRDepartment extends Department2 {
    constructor(id: string, private reports: string[]) {
        super(id, 'IT');
    }

    addEmployee(name: string): void {
        if (name === 'Max') {
            console.log("No Max's allowed!");
            return;
        }
        this.employees.push(name);
    }

    addReport(report: string) {
        this.reports.push(report);
    }

    printReports() {
        console.log(this.reports);
    }
}

const hrDept = new HRDepartment('d3', []);
hrDept.addEmployee('Max');
hrDept.addEmployee('Jimmy');
hrDept.printEmployeeInformation();

//Getters and Setters
class CEODepartment extends Department2 {
    private lastReport: string;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No Report Found');
    }
    
    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
    }

    constructor(id: string, private reports: string[]) {
        super(id, 'IT');
        this.lastReport = reports[0];
    }

    addEmployee(name: string): void {
        if (name === 'Max') {
            console.log("No Max's allowed!");
            return;
        }
        this.employees.push(name);
    }

    addReport(report: string) {
        this.reports.push(report);
        this.lastReport = report;
    }

    printReports() {
        console.log(this.reports);
    }
}

const ceo = new CEODepartment('d4', []);
ceo.addReport('abc');
console.log(ceo.mostRecentReport);
ceo.mostRecentReport = '';
console.log(ceo.mostRecentReport);
ceo.mostRecentReport = 'now this is the most recent report';
console.log(ceo.mostRecentReport);
