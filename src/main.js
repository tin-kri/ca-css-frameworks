// ./src/main.js
// import { setupCounter } from "./assets/js/counter";
// import viteLogo from "/vite.svg";
// import javascriptLogo from "./assets/img/javascript.svg";
import "./style.css";
import { mobileNavigation } from "./mobileNav";

mobileNavigation();

document.querySelector("#landing-page").innerHTML = `
  <div >
     <h1 class=" text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
  </div>
`;

// setupCounter(document.querySelector("#counter"));
