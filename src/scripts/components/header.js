import "styles/header.css";

export default class Header {
  constructor(parentElement, headerTitleContent) {
    this.parent = parentElement;
    this.header = document.createElement("header");

    this.headerTitle = document.createElement("h1");
    this.headerTitle.textContent = headerTitleContent;

    this.header.appendChild(this.headerTitle);
    this.parent.appendChild(this.header);
  }
}
