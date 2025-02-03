import { registerUser } from './api/auth/register'
import { loginUser } from './api/auth/login'

export function onRegisterFormSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formFields = Object.fromEntries(formData)
    registerUser(formFields)
    console.log(formFields)
}

export function onLoginFormSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formFields = Object.fromEntries(formData)
    loginUser(formFields)
}
