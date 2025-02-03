import { API_AUTH_REGISTER } from '../../constants.js'

export async function registerUser(userDetails) {
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
