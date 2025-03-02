import { API_SOCIAL_POSTS, API_KEY } from '../../utils/constants.js'
import { getFromLocalStorage } from '../../utils/storage.js'

export async function fetchSinglePost(postId) {
    const accessToken = getFromLocalStorage('accessToken')
    
    try {
        const url = `${API_SOCIAL_POSTS}/${postId}?_author=true&_comments=true&_reactions=true`
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Noroff-API-Key': API_KEY
            }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch post')
        }

        return await response.json()
    } catch (error) {
        console.error('Error fetching post:', error)
        throw error
    }
}