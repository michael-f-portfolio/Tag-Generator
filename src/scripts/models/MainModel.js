export default class MainModel {
  constructor(content) {
    this.content = content;
  }

  editContent(content) {
    this.content = content;
    this.onContentChanged(content);
  }

  bindContentChange(callback) {
    this.onContentChanged = callback;
  }
}
