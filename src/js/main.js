// // ./src/main.js
// import '../style.css'
// import { mobileNavigation } from './handlers/nav.js'
// import { onRegisterFormSubmit } from './handlers.js'
// import { onLoginFormSubmit } from './handlers.js'
// import { fetchPosts } from './api/posts/fetch.js'
// import { PostRenderer } from './posts/postsRenderer.js'
// import { setUpPostForm } from './ui/posts.js'

// mobileNavigation()

// document.querySelector('#landing-page').innerHTML = `
//   <div >
//      <h1 class=" text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
//   </div>
// `

// // Gets the form element / register
// const registerForm = document.querySelector('#register-form')
// if (registerForm) {
//     registerForm.addEventListener('submit', onRegisterFormSubmit)
//     console.log('Register form listener added successfully')
// } else {
//     // console.error('Could not find form with ID "register-form"')
// }

// // Gets the form element / login

// const loginForm = document.querySelector('#login-form')
// if (loginForm) {
//     loginForm.addEventListener('submit', onLoginFormSubmit)
//     console.log('Login form listener added successfully')
// } else {
//     // console.error('Could not find form with ID "login-form"')
// }

// async function displayFeed() {
//     const cardContent = document.getElementById('card-container')
//     if (cardContent) {
//         try {
//             const posts = await fetchPosts()
//             if (posts) {
//                 const postRenderer = new PostRenderer(cardContent)
//                 postRenderer.render(posts)
//                 // console.log('Posts rendered successfully')
//             }
//         } catch (error) {
//             console.error('Failed to initialize feed:', error)
//         }
//     }
// }

// // feed
// displayFeed()

// document.addEventListener('DOMContentLoaded', () => {
//     setUpPostForm()
// })


// js/main.js
import '../style.css'
import { mobileNavigation } from './handlers/nav.js'
import { onRegisterFormSubmit } from './api/auth/handlers.js'
import { onLoginFormSubmit } from './api/auth/handlers.js'
import { fetchPosts } from './api/posts/fetch.js'
import { PostRenderer } from './posts/postsRenderer.js'
import { setUpPostForm } from './ui/posts.js'

// Navigation is needed on all pages
mobileNavigation()

// Get the current page path
const currentPath = window.location.pathname

// Initialize landing page content if element exists
const landingPage = document.querySelector('#landing-page')
if (landingPage) {
    landingPage.innerHTML = `
        <div>
            <h1 class="text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
        </div>
    `
}

// Initialize auth-related functionality only on the index page
if (currentPath.includes('index.html') || currentPath === '/') {
    // Register form setup
    const registerForm = document.querySelector('#register-form')
    if (registerForm) {
        registerForm.addEventListener('submit', onRegisterFormSubmit)
        console.log('Register form listener added successfully')
    }

    // Login form setup
    const loginForm = document.querySelector('#login-form')
    if (loginForm) {
        loginForm.addEventListener('submit', onLoginFormSubmit)
        console.log('Login form listener added successfully')
    }
}

// Initialize feed-related functionality only on the feed page
if (currentPath.includes('feed')) {
    async function displayFeed() {
        const cardContent = document.getElementById('card-container')
        if (cardContent) {
            try {
                const posts = await fetchPosts()
                if (posts) {
                    const postRenderer = new PostRenderer(cardContent)
                    postRenderer.render(posts)
                }
            } catch (error) {
                console.error('Failed to initialize feed:', error)
            }
        }
    }

    // Initialize feed
    displayFeed()

    // Set up post form only on feed page
    document.addEventListener('DOMContentLoaded', () => {
        setUpPostForm()
    })
}