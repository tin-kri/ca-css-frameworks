// ./src/main.js
import './style.css'
import { mobileNavigation } from './mobileNav'
import { onRegisterFormSubmit } from './js/handlers.js'

mobileNavigation()

document.querySelector('#landing-page').innerHTML = `
  <div >
     <h1 class=" text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
  </div>
`

// Gets the form element
const registerForm = document.querySelector('#register-form')
if (registerForm) {
    registerForm.addEventListener('submit', onRegisterFormSubmit)
    console.log('Register form listener added successfully')
} else {
    console.error('Could not find form with ID "register-form"')
}
