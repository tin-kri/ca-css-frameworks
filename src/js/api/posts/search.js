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

        const response = await fetch(`${API_SOCIAL_POSTS_SEARCH}?q=${(query)}`, fetchOptions)
        const json = await response.json()

        return json.data
    } catch (error) {
        console.log('error searching posts:', error)
        return null
    }
}

// js/api/posts/search.js
// import { API_SOCIAL_POSTS_SEARCH, API_KEY } from '../../utils/constants.js'
// import { getFromLocalStorage } from '../../utils/storage.js'

// export async function searchPosts(query) {
//     try {
//         console.log('Starting search with query:', query) // Debug log

//         const accessToken = getFromLocalStorage('accessToken')
//         if (!accessToken) {
//             console.error('No access token found') // Debug log
//             return null
//         }

//         console.log('API URL:', `${API_SOCIAL_POSTS_SEARCH}?q=${encodeURIComponent(query)}`) // Debug log
        
//         const fetchOptions = {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'X-Noroff-API-Key': API_KEY,
//                 'Content-Type': 'application/json',
//             }
//         }

//         console.log('Fetch options:', { 
//             url: API_SOCIAL_POSTS_SEARCH,
//             headers: fetchOptions.headers 
//         }) // Debug log

//         const response = await fetch(
//             `${API_SOCIAL_POSTS_SEARCH}?q=${encodeURIComponent(query)}`, 
//             fetchOptions
//         )

//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}))
//             console.error('Search API error:', {
//                 status: response.status,
//                 statusText: response.statusText,
//                 errorData
//             })
//             throw new Error(`Search failed: ${response.statusText}`)
//         }

//         const json = await response.json()
//         console.log('Search results:', json) // Debug log

//         if (!json.data) {
//             console.warn('No data property in response') // Debug log
//             return []
//         }

//         return json.data
//     } catch (error) {
//         console.error('Error searching posts:', error)
//         throw error // Throw the error to handle it in the UI
//     }
// }