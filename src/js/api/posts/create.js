import { API_SOCIAL_POSTS } from '../../utils/constants'
import { getFromLocalStorage } from '../../utils/storage'
import { API_KEY } from '../../utils/constants'
import { showNotification } from '../../utils/notifications.js'

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