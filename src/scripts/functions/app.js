import MainController from "./controllers/MainController";

export default function startApp() {
  const myController = new MainController();
  myController.initialize();
}
