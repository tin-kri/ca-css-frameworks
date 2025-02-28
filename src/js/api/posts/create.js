import { API_SOCIAL_POSTS } from '../../utils/constants'
import { getFromLocalStorage } from '../../utils/storage'
import { API_KEY } from '../../utils/constants'


export async function createPost(postData) {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        console.log('post data:', JSON.stringify(postData))

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
        const json = await response.json()

        return json
    } catch (error) {
        console.log('error creating post', error)
    }
}
