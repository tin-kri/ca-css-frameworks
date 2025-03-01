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
        
       // src/js/api/auth/login.js
if (response.ok) {
    const accessToken = json.data.accessToken
    addToLocalStorage('accessToken', accessToken)
    
    // Add debug logging
    console.log('Login successful, token stored:', !!accessToken)
    
    // Update the redirect path
    window.location.href = '/feed/'  // or '/feed/index.html'
    return json.data

        } else {
            throw new Error(json.message || 'Failed to login')
        }
    } catch (error) {
        console.log('Login error:', error)
        throw error // Re-throw to handle in the form handler
    }
}