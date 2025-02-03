import { registerUser } from './api/auth/register'

export function onRegisterFormSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formFields = Object.fromEntries(formData)
    registerUser(formFields)
    console.log(formFields)
}
