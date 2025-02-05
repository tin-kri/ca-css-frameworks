// src/js/api/posts/create.js
// Endpoint /social/posts

import { API_SOCIAL_POSTS } from '../../constants'
import { getFromLocalStorage } from '../../utils'

// {
//     "title": "string", // Required
//     "body": "string", // Optional
//     "tags": ["string"], // Optional
//     "media": {
//       "url": "https://url.com/image.jpg",
//       "alt": "string"
//     } // Optional
//   }

const blogPostForm = document.getElementById('create-post-form')

getElementById('post-title')
getElementById('post-text')

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
        const json = await response.json()

        return json
        
    } catch (error) {
        console.log('error creating post')
    }
}
