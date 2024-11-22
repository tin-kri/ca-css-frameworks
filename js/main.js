import "/style.css";
import { mobileNavigation } from "../js/mobileNav.js";

mobileNavigation();

document.querySelector("#landing-page").innerHTML = `
  <div >
     <h1 class=" text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
  </div>
`;
