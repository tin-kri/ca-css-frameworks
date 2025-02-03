// ./src/main.js
import './style.css'
import { mobileNavigation } from './mobileNav'
import { onRegisterFormSubmit } from './js/handlers.js'
import { onLoginFormSubmit } from './js/handlers.js'

import { API_SOCIAL_POSTS } from './js/constants.js'
import { addToLocalStorage } from './js/utils.js'
import { getFromLocalStorage } from './js/utils.js'
import { API_KEY } from './js/constants.js'

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

const displayFeed = document.getElementById('card-container')

// fetch posts from api
// use auth access token
// display posts

async function fetchPosts() {
    try {
        const accessToken = getFromLocalStorage('accessToken')
        console.log(accessToken)
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

function generatePosts(posts) {
  
}

async function main() {
    const posts = await fetchPosts()
    generatePosts(posts)
    console.log(posts)
}

main()
