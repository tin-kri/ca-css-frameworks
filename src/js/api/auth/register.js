import { API_AUTH_REGISTER } from '../../constants/constants.js'

// export function registerForm() {
//     const registerForm = document.querySelector('#register-form')

//     registerForm.addEventListener('submit', function () {
//         console.log('well hello there')
//     })
// // }

// export async function registerUser(userData) {
//     try {
//         const fetchOptions = {
//             method: 'POST',
//             body: 'JSON.stringify(userData)',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         }
//         const response = await fetch(API_AUTH_REGISTER, fetchOptions)
//         console.log(response)
//     } catch (error) {
//         console.log('Something went wrong with fetch'), error
//     }
// }

// export function onRegisterFormSubmit(event) {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const formFields = Object.fromEntries(formData)
//     registerUser(formFields)
// }
