// Drag & Drop Interfaces
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void; // signal browser/JS that the thing we're dragging over is a valid drag target - permit drop
    dropHandler(event: DragEvent): void; // React to drop handler - handle the drop and update data/UI
    dragLeaveHandler(event: DragEvent): void; // visual feedback when user drags over the box, or revert our visual update if cancelled
}

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
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFN: Listener<T>) {
        this.listeners.push(listenerFN);
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState;
        return this.instance;
    }

    addProject(title: string, description: string, numPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numPeople, ProjectStatus.Active)
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) { // if the project exists, and is not null && the old status differs from the new status
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
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

// Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateID: string, hostElementID: string, insertAtStart: boolean, newElementID?: string) {
        this.templateElement = document.getElementById(templateID)! as HTMLTemplateElement; // Template to hold content, typecast
        this.hostElement = <T>document.getElementById(hostElementID)!; // Reference of where we want to render the template content

        const importedHTMLContent = document.importNode(this.templateElement.content, true);
        this.element = importedHTMLContent.firstElementChild as U;
        if (newElementID) {
            this.element.id = newElementID;
        }
        this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

// ProjectItem Class
class ProjectItem extends Component <HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} persons`;
        }
    }

    constructor(hostID: string, project: Project) {
        super('single-project', hostID, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent): void {
        console.log('DragEnd');
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragstart', this.dragEndHandler);
    }

    renderContent(): void {
        this.element.querySelector('h2')!.textContent =  this.project.title; // element is the rendered li element
        this.element.querySelector('h3')!.textContent =  this.persons + ' assigned.'; 
        this.element.querySelector('p')!.textContent =  this.project.description; 
    }
}


// ProjectList Class 
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') { // is dataTransfer available, is the data of text/plain format?
            event.preventDefault(); //
            const listEL = this.element.querySelector('ul')!;
            listEL.classList.add('droppable');
        } 
    }

    @autobind
    dropHandler(event: DragEvent): void {
        const projID = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projID, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }

    @autobind
    dragLeaveHandler(_: DragEvent): void {
        const listEL = this.element.querySelector('ul')!;
        listEL.classList.remove('droppable');
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
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
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';

    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const proItems of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, proItems); // this.element.id refers to the section, not the UL.
        }
    }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    renderContent(): void {
        
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
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const functionPrjList = new ProjectList('finished');