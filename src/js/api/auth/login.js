import { API_AUTH_LOGIN } from '../../constants.js'
import { addToLocalStorage } from '../../utils.js'
import { getFromLocalStorage } from '../../utils.js'

export async function loginUser(userDetails) {
    try {
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(API_AUTH_LOGIN, fetchOptions)
        const json = await response.json()
        const accessToken = json.data.accessToken
        addToLocalStorage('accessToken', accessToken)
        console.log(json)
    } catch (error) {
        console.log('there is an error with logging in', error)
    }
}

// function addToLocalStorage(key, value) {
//     localStorage.setItem(key, value)
// }

// function getFromLocalStorage(key) {
//     return localStorage.getItem(key)
// }
// moved to utils.js