// ./src/main.js
// import { setupCounter } from "./assets/js/counter";
// import viteLogo from "/vite.svg";
// import javascriptLogo from "./assets/img/javascript.svg";
import './style.css'
import { mobileNavigation } from './mobileNav'
import { API_AUTH_REGISTER } from '../src/js/constants/constants'

// import { registerForm } from './js/api/auth/register'
// import { registerUser } from './js/api/auth/register'
// import { onRegisterFormSubmit } from './js/api/auth/register'

mobileNavigation()
// registerForm()
// registerUser()

document.querySelector('#landing-page').innerHTML = `
  <div >
     <h1 class=" text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
  </div>
`
const registerForm = document.querySelector('#register-form')

async function registerUser(userDetails) {
    try {
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(API_AUTH_REGISTER, fetchOptions)
    } catch (error) {
        console.log('there is an error', error)
    }
}

// handler
function onRegisterFormSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formFields = Object.fromEntries(formData)
    registerUser(formFields)
    console.log(formFields)
}

registerForm.addEventListener('submit', onRegisterFormSubmit)
