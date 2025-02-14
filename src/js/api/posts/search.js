import { API_SOCIAL_POSTS_SEARCH, API_KEY } from '../../utils/constants.js'
import { getFromLocalStorage } from '../../utils/storage.js'

export async function searchPosts(query) {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        
        const fetchOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Noroff-API-Key': API_KEY,
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(`${API_SOCIAL_POSTS_SEARCH}?q=${encodeURIComponent(query)}`, fetchOptions)
        const json = await response.json()

        return json.data
    } catch (error) {
        console.log('error searching posts:', error)
        return null
    }
}