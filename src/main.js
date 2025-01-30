// ./src/main.js
// import { setupCounter } from "./assets/js/counter";
// import viteLogo from "/vite.svg";
// import javascriptLogo from "./assets/img/javascript.svg";
import './style.css'
import { mobileNavigation } from './mobileNav'
import { registerFrom } from './js/api/auth/register'
import { registerUser } from './js/api/auth/register'
import { onRegisterFormSubmit } from './js/api/auth/register'

mobileNavigation()
registerFrom()
registerUser()
registerFrom.addEventListener('submit', onRegisterFormSubmit)

document.querySelector('#landing-page').innerHTML = `
  <div >
     <h1 class=" text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
  </div>
`
