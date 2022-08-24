// Component Base Class
//export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateID: string,
    hostElementID: string,
    insertAtStart: boolean,
    newElementID?: string
  ) {
    this.templateElement = document.getElementById(
      templateID
    )! as HTMLTemplateElement; // Template to hold content, typecast
    this.hostElement = <T>document.getElementById(hostElementID)!; // Reference of where we want to render the template content

    const importedHTMLContent = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedHTMLContent.firstElementChild as U;
    if (newElementID) {
      this.element.id = newElementID;
    }
    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
