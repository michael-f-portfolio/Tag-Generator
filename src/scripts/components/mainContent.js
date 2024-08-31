import "styles/mainContent.css";

export default class MainContent {
  constructor(parentElement, content) {
    this.parent = parentElement;

    this.mainContentContainer = document.createElement("div");
    this.mainContentContainer.id = "main-content-container";

    this.contentDisplay = document.createElement("h2");
    this.contentDisplay.textContent = content;

    this.mainContentContainer.appendChild(this.contentDisplay);

    this.form = document.createElement("form");
    this.form.id = "main-model-form";

    this.textInput = document.createElement("input");
    this.textInput.type = "text";
    this.textInput.placeholder = "Update Main Content...";

    this.formSubmitButton = document.createElement("button");
    this.formSubmitButton.type = "submit";
    this.formSubmitButton.textContent = "Submit";

    this.form.append(this.textInput, this.formSubmitButton);
    this.mainContentContainer.appendChild(this.form);

    this.parent.appendChild(this.mainContentContainer);
  }

  displayContent(content) {
    this.contentDisplay.textContent = content;
  }

  bindUpdateContent(handler) {
    this.formSubmitButton.addEventListener("click", (event) => {
      event.preventDefault();
      handler(this.textInput.value);
    });
  }
}
