import "./bootstrap.js";
import "./styles/main.css";
import "./calculator-app.js";

const app = document.querySelector("#app");

if (app) {
  const now = new Date().toLocaleString();
  app.insertAdjacentHTML(
    "beforeend",
    `<p class="timestamp">Loaded at: ${now}</p>`
  );
}
