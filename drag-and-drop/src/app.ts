// Project Type
enum ProjectStatus {
    Active,
    Finished
}

class Project {
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {

    }
}

// Project State Managment
type Listener = (items: Project[]) => void;

class ProjectState {
    private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {

    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState;
        return this.instance;
    }

    addListener(listenerFN: Listener) {
        this.listeners.push(listenerFN);
    }

    addProject(title: string, description: string, numPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numPeople, ProjectStatus.Active)
        this.projects.push(newProject);
        for (const listenerFN of this.listeners) {
            listenerFN(this.projects.slice()); // copy of the array, not original
        }
    }
}

const projectState = ProjectState.getInstance(); // global constant

// Validation Logic
interface Validatable { //describes a validatable obj
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) { // Gets a validatable object, which follows the structure above
    let isValid = true;
    if (validatableInput.required) { // check to see if we have a required property, and the value msut be required
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') { // ensure the value is a string
        isValid = isValid && validatableInput.value.trim().length >= validatableInput.minLength; // ensure the value is longer than minLength
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') { // ensure the value is a string
        isValid = isValid && validatableInput.value.trim().length <= validatableInput.maxLength; // ensure the value is longer than minLength
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') { // check numbers
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}

// autobind decorator
// function autobind(target: any, methodName: string, descriptor: PropertyDescriptor) { // unused params, change to _
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value // store original method
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() { // getter executed when we access the function
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

// ProjectList Class 
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement; // Template to hold content, typecast
        this.hostElement = <HTMLDivElement>document.getElementById('app')!; // Reference of where we want to render the template content
        this.assignedProjects = [];

        const importedHTMLContent = document.importNode(this.templateElement.content, true);
        this.element = importedHTMLContent.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;

        projectState.addListener((projects: Project[]) => {
            const filteredProjects = projects.filter(prj => {
            if (this.type === 'active') {
                return prj.status === ProjectStatus.Active;
            }
            return prj.status === ProjectStatus.Finished;
        })
            this.assignedProjects = filteredProjects;
            this.renderProjects();
        });

        this.attach();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const proItems of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = proItems.title;
            listEl.appendChild(listItem);
        }
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';

    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement; // Template to hold content, typecast
        this.hostElement = <HTMLDivElement>document.getElementById('app')!; // Reference of where we want to render the template content

        const importedHTMLContent = document.importNode(this.templateElement.content, true);
        this.element = importedHTMLContent.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private gatherUserInput(): [string, string, number] | void {
        const userTitle = this.titleInputElement.value;
        const userDescription = this.descriptionInputElement.value;
        const userPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: userTitle,
            required: true,
        }
        const descValidatable: Validatable = {
            value: userDescription,
            required: true,
            minLength: 5
        }
        const peopleValidatable: Validatable = {
            value: +userPeople, // convert to number
            required: true,
            min: 1,
            max: 5
        }

        if (
            !validate(titleValidatable) ||
            !validate(descValidatable) ||
            !validate(peopleValidatable)
            ) {
            alert('Invalid input, please try again');
            return;
        } else {
            return [userTitle, userDescription, +userPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)){ // in vanilla JS, if this is an array, we have our tuple
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        };
    }

    private configure() {
         this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const functionPrjList = new ProjectList('finished');