import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';
import { submitFormHandler } from "./js/formHandler.js";

document
  .getElementById("url-form")
  .addEventListener("submit", submitFormHandler);

export { submitFormHandler };
