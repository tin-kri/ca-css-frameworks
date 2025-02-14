import { API_AUTH_LOGIN } from '../../utils/constants.js'
import { addToLocalStorage } from '../../utils/storage.js'

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
        
        if (response.ok) {
            const accessToken = json.data.accessToken
            addToLocalStorage('accessToken', accessToken)
            window.location.replace('/feed/index')
            return json.data
        } else {
            throw new Error(json.message || 'Failed to login')
        }
    } catch (error) {
        console.log('Login error:', error)
        throw error // Re-throw to handle in the form handler
    }
}