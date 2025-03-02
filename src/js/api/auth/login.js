/**
 * Authenticates a user by sending login credentials to the API
 * 
 * This function sends the provided user details to the authentication endpoint,
 * processes the response, and handles the login flow. On successful login,
 * it stores the access token in local storage and redirects to the feed page.
 *
 * @async
 * @param {Object} userDetails - The user's login credentials
 * @param {string} userDetails.email - The user's email address (must be a Noroff email)
 * @param {string} userDetails.password - The user's password
 * 
 * @returns {Promise<Object>} The user data returned from the API on successful login
 * 
 * @throws {Error} Throws an error if the login request fails, with the error message
 * from the API response or a default message if none is provided
 * 
 * @example
 * // Example usage in a form submit handler
 * try {
 *   const userData = await loginUser({
 *     email: 'student@noroff.no',
 *     password: 'securePassword123'
 *   });
 *   // Login successful, user is redirected automatically
 * } catch (error) {
 *   // Handle login error (e.g., display error message to user)
 *   displayErrorMessage(error.message);
 * }
 */

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