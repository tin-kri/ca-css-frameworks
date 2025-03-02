import { API_SOCIAL_POSTS, API_KEY } from '../../../shared/utils/constants.js'
import { getFromLocalStorage } from '../../../shared/utils/storage.js'
import { showNotification } from '../../../shared/utils/notifications.js'
/**
 * Creates a new post using the social API
 * @param {Object} postData - The data for the post to create
 * @param {string} postData.title - The title of the post
 * @param {string} postData.body - The content of the post
 * @param {string[]} [postData.tags] - Optional tags for the post
 * @returns {Promise<Object>} The created post data
 * @throws {Error} If the post creation fails
 */
export async function createPost(postData) {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        
        const fetchOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Noroff-API-Key': API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }

        const response = await fetch(API_SOCIAL_POSTS, fetchOptions)
        
        if (!response.ok) {
            throw new Error('Failed to create post')
        }

        const json = await response.json()
        showNotification('Post created successfully', 'success')
        return json
    } catch (error) {
        console.error('Error creating post:', error)
        showNotification('Failed to create post', 'error')
        throw error
    }
}