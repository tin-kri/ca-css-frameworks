import { registerUser } from '../../api/auth/register.js'
import { loginUser } from '../../api/auth/login.js'

export function setupAuthHandlers() {
    // Register form handler
    const registerForm = document.querySelector('#register-form')
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault()
            try {
                const formData = new FormData(event.target)
                const formFields = Object.fromEntries(formData)
                await registerUser(formFields)
                // Optionally redirect or show success message
                alert('Registration successful! Please log in.')
                event.target.reset()
            } catch (error) {
                alert('Registration failed: ' + error.message)
            }
        })
    }

    // Login form handler
    const loginForm = document.querySelector('#login-form')
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault()
            try {
                const formData = new FormData(event.target)
                const formFields = Object.fromEntries(formData)
                await loginUser(formFields)
                // Redirect is handled in loginUser
            } catch (error) {
                alert('Login failed: ' + error.message)
            }
        })
    }
}