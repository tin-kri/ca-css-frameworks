
import { API_SOCIAL_POSTS, API_KEY } from '../../utils/constants.js'
import { getFromLocalStorage } from '../../utils/storage.js'

export async function updatePost(postId, updateData) {
    const accessToken = getFromLocalStorage('accessToken')
    
    if (!accessToken) {
        throw new Error('No access token found')
    }

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Noroff-API-Key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update post')
        }

        return data
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}