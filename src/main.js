// ./src/main.js
import './style.css'
import { mobileNavigation } from './mobileNav'
import { onRegisterFormSubmit } from './js/handlers.js'
import { onLoginFormSubmit } from './js/handlers.js'

mobileNavigation()

document.querySelector('#landing-page').innerHTML = `
  <div >
     <h1 class=" text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
  </div>
`

// Gets the form element / register
const registerForm = document.querySelector('#register-form')
if (registerForm) {
    registerForm.addEventListener('submit', onRegisterFormSubmit)
    console.log('Register form listener added successfully')
} else {
    console.error('Could not find form with ID "register-form"')
}

// Gets the form element / login

const loginForm = document.querySelector('#login-form')
if (loginForm) {
    loginForm.addEventListener('submit', onLoginFormSubmit)
    console.log('Login form listener added successfully')
} else {
    console.error('Could not find form with ID "login-form"')
}

// add in error checking

// function addToLocalStorage(key, value) {
//     localStorage.setItem(key, value)
// }

// function getFromLocalStorage(key) {
//     return localStorage.getItem(key)
// }
