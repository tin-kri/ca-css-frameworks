import { API_SOCIAL_PROFILES, API_KEY } from '../../utils/constants.js'
import { getFromLocalStorage } from '../../utils/storage.js'

/**
 * Decodes a JWT token to extract the payload data
 * 
 * @private
 * @param {string} token - The JWT token to decode
 * @returns {Object|null} The decoded token payload as an object, or null if decoding fails
 */
function decodeToken(token) {
    try {
        const payload = token.split('.')[1]
        const decoded = JSON.parse(atob(payload))
        return decoded
    } catch (error) {
        console.error('Error decoding token:', error)
        return null
    }
}

/**
 * Fetches posts created by the currently authenticated user
 * 
 * This function retrieves the access token from local storage, decodes it to get
 * the user's name, and then makes an API request to fetch all posts created by that user.
 * If any step fails (no token, invalid token, API error), it returns an empty array.
 *
 * @async
 * @returns {Promise<Array>} An array of post objects belonging to the authenticated user,
 * or an empty array if the request fails for any reason
 * 
 * @example
 * // Example usage in a profile page
 * async function displayUserPosts() {
 *   const userPosts = await fetchUserPosts();
 *   
 *   if (userPosts.length === 0) {
 *     showEmptyState("You haven't created any posts yet");
 *   } else {
 *     renderPosts(userPosts);
 *   }
 * }
 * 
 * @example
 * // Example with error handling
 * try {
 *   const posts = await fetchUserPosts();
 *   renderPostsToDOM(posts);
 * } catch (error) {
 *   showErrorMessage("Could not load your posts at this time");
 * }
 */
export async function fetchUserPosts() {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        if (!accessToken) {
            console.error('No access token found')
            return []
        }

        // Decode the token to get user info
        const userData = decodeToken(accessToken)

        if (!userData || !userData.name) {
            console.error('No user name found in token')
            return []
        }

        const fetchOptions = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Noroff-API-Key': API_KEY,
                'Content-Type': 'application/json'
            },
        }
        
        // Use the name from the decoded token
        const response = await fetch(`${API_SOCIAL_PROFILES}/${userData.name}/posts`, fetchOptions)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const json = await response.json()
        return json.data

    } catch (error) {
        console.log('Error fetching user posts:', error)
        return []
    }
}