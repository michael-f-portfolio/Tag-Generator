import Header from "components/header";
import Footer from "components/footer";
import MainContent from "../../components/mainContent";
import MainModel from "../../models/MainModel";

export default class MainController {
  constructor() {
    this.body = document.querySelector("body");
    this.mainModel = new MainModel("My Main Content");
    this.copyrightInfo = "Copyright © 2024 Michael F.";
    this.copyrightSource = "https://github.com/michael-f-portfolio";
  }

  initialize() {
    // Initialize Views
    this.header = new Header(this.body, "My Template Header Title");
    this.mainContent = new MainContent(this.body, this.mainModel.content);
    this.footer = new Footer(
      this.body,
      this.copyrightInfo,
      this.copyrightSource
    );

    // Initialize Binders
    this.mainContent.bindUpdateContent(this.handleUpdateContent);
    this.mainModel.bindContentChange(this.onContentChange);
  }

  onContentChange = (content) => {
    this.mainContent.displayContent(content);
  };

  handleUpdateContent = (content) => {
    this.mainModel.editContent(content);
  };
}
