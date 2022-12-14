// import Cmp from "./base-component.js"; // Default export, see line 7
import { Component } from "./base-component";
import * as Validation from "../util/validation";
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";

//export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  renderContent(): void {}

  private gatherUserInput(): [string, string, number] | void {
    const userTitle = this.titleInputElement.value;
    const userDescription = this.descriptionInputElement.value;
    const userPeople = this.peopleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: userTitle,
      required: true,
    };
    const descValidatable: Validation.Validatable = {
      value: userDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validation.Validatable = {
      value: +userPeople, // convert to number
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descValidatable) ||
      !Validation.validate(peopleValidatable)
    ) {
      alert("Invalid input, please try again");
      return;
    } else {
      return [userTitle, userDescription, +userPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      // in vanilla JS, if this is an array, we have our tuple
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
