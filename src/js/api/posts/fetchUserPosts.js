// // src/js/api/posts/fetchUserPosts.js
// import { API_SOCIAL_PROFILES, API_KEY } from '../../utils/constants.js'
// import { getFromLocalStorage } from '../../utils/storage.js'

// export async function fetchUserPosts() {
//     try {
//         const accessToken = getFromLocalStorage('accessToken')
//         const user = JSON.parse(localStorage.getItem('user'))
        
//         if (!user || !user.name) {
//             console.error('No user found in localStorage')
//             return []
//         }

//         const fetchOptions = {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 'X-Noroff-API-Key': API_KEY,
//                 'Content-Type': 'application/json'
//             },
//         }
        
//         // Using API_SOCIAL_PROFILES constant
//         const response = await fetch(`${API_SOCIAL_PROFILES}/${user.name}/posts`, fetchOptions)
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`)
//         }
        
//         const json = await response.json()
//         return json.data

//     } catch (error) {
//         console.log('Error fetching user posts:', error)
//         return []
//     }
// }

import { API_SOCIAL_PROFILES, API_KEY } from '../../utils/constants.js'
import { getFromLocalStorage } from '../../utils/storage.js'

function decodeToken(token) {
    try {
        const payload = token.split('.')[1]
        const decoded = JSON.parse(atob(payload))
        return decoded
    } catch (error) {
        console.error('Error decoding token:', error)
        return null
    }
}

export async function fetchUserPosts() {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        if (!accessToken) {
            console.error('No access token found')
            return []
        }

        // Decode the token to get user info
        const userData = decodeToken(accessToken)

        if (!userData || !userData.name) {
            console.error('No user name found in token')
            return []
        }

        const fetchOptions = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Noroff-API-Key': API_KEY,
                'Content-Type': 'application/json'
            },
        }
        
        // Use the name from the decoded token
        const response = await fetch(`${API_SOCIAL_PROFILES}/${userData.name}/posts`, fetchOptions)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const json = await response.json()
        return json.data

    } catch (error) {
        console.log('Error fetching user posts:', error)
        return []
    }
}