// ./src/main.js
import './style.css'
import { mobileNavigation } from './mobileNav'
import { onRegisterFormSubmit } from './js/handlers.js'
import { onLoginFormSubmit } from './js/handlers.js'
import { fetchPosts } from './js/api/posts/fetch.js'

import { API_SOCIAL_POSTS } from './js/constants.js'
import { addToLocalStorage } from './js/utils.js'
import { getFromLocalStorage } from './js/utils.js'
import { API_KEY } from './js/constants.js'
import { PostRenderer } from './js/posts/postsRenderer.js'

mobileNavigation()

document.querySelector('#landing-page').innerHTML = `
  <div >
     <h1 class=" text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
  </div>
`

// Gets the form element / register
const registerForm = document.querySelector('#register-form')
if (registerForm) {
    registerForm.addEventListener('submit', onRegisterFormSubmit)
    console.log('Register form listener added successfully')
} else {
    // console.error('Could not find form with ID "register-form"')
}

// Gets the form element / login

const loginForm = document.querySelector('#login-form')
if (loginForm) {
    loginForm.addEventListener('submit', onLoginFormSubmit)
    console.log('Login form listener added successfully')
} else {
    // console.error('Could not find form with ID "login-form"')
}

async function displayFeed() {
    const cardContent = document.getElementById('card-container')
    if (cardContent) {
        try {
            // Use your existing fetchPosts function
            const posts = await fetchPosts()
            if (posts) {
                const postRenderer = new PostRenderer(cardContent)
                postRenderer.render(posts)
                // console.log('Posts rendered successfully')
            }
        } catch (error) {
            console.error('Failed to initialize feed:', error)
        }
    }
}

// Shows the feed
displayFeed()



const blogPostForm = document.getElementById('create-post-form')

// getElementById('post-title')
// getElementById('post-text')



