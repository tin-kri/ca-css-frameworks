import { API_SOCIAL_POSTS } from "../../constants"
import { getFromLocalStorage } from "../../utils"
import { API_KEY } from "../../constants"

export async function fetchPosts() {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        // console.log(accessToken)
        const fetchOptions = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Noroff-API-Key': API_KEY,
            },
        }
        const response = await fetch(API_SOCIAL_POSTS, fetchOptions)
        const json = await response.json()
        return json.data
      
    } catch (error) {
        console.log('fetch error:', error)
    }
}