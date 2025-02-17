import { API_SOCIAL_POSTS, API_KEY } from "../../utils/constants";
import { getFromLocalStorage } from "../../utils/storage";

export async function getPostsByTag(tag = '') {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        const params = new URLSearchParams()

        if (tag) {
            params.append('_tag', tag)
        }

        const fetchOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Noroff-API-Key': API_KEY,
                'Content-Type': 'application/json',
            }
        }

        // Fix: Use params.toString() to properly format the query parameters
        const response = await fetch(`${API_SOCIAL_POSTS}?${params.toString()}`, fetchOptions)
        const json = await response.json()

        console.log('API URL:', `${API_SOCIAL_POSTS}?${params.toString()}`) // Debug log
        return json.data

    } catch (error) {
        console.log('error filtering posts:', error)
        return null
    }
}