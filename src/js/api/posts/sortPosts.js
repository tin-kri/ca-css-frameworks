import { API_SOCIAL_POSTS, API_KEY } from '../../utils/constants.js'
import { getFromLocalStorage } from '../../utils/storage.js'

export async function getSortedPosts(sortBy = 'recent') {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        const params = new URLSearchParams()

        // Add sort parameters
        switch(sortBy) {
            case 'popular':
                params.append('_sort', '_count.reactions')
                params.append('_order', 'desc')
                break
            case 'alphabetical':
                params.append('_sort', 'title')
                params.append('_order', 'asc')
                break
            case 'recent':
            default:
                params.append('_sort', 'created')
                params.append('_order', 'desc')
                break
        }

        const fetchOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Noroff-API-Key': API_KEY,
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(`${API_SOCIAL_POSTS}?${params}`, fetchOptions)
        const json = await response.json()

        return json.data
    } catch (error) {
        console.error('Error sorting posts:', error)
        return null
    }
}