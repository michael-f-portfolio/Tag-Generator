import "styles/footer.css";
import sourceLogoPNG from "../../assets/imgs/github-mark.png";

export default class Footer {
  constructor(parentElement, sourceTextContent, sourceHref) {
    this.parent = parentElement;
    this.footer = document.createElement("footer");

    this.sourceContainer = document.createElement("div");
    this.sourceContainer.classList.add("sourceContainer");

    this.sourceLink = document.createElement("a");
    this.sourceLink.target = "_blank";
    this.sourceLink.textContent = sourceTextContent;
    this.sourceLink.href = sourceHref;

    this.sourceLogo = document.createElement("img");
    this.sourceLogo.src = sourceLogoPNG;
    this.sourceLink.appendChild(this.sourceLogo);

    this.sourceContainer.appendChild(this.sourceLink);
    this.footer.appendChild(this.sourceContainer);
    this.parent.appendChild(this.footer);
  }
}
