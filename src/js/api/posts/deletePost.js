import { API_SOCIAL_POSTS, API_KEY } from '../../utils/constants.js'
import { getFromLocalStorage } from '../../utils/storage.js'

export async function deletePost(postId) {
    const accessToken = getFromLocalStorage('accessToken')
    
    if (!accessToken) {
        throw new Error('No access token found')
    }

    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Noroff-API-Key': API_KEY,
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error('Failed to delete post')
    }

    return true
}