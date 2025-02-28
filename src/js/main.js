// // ./src/main.js
// import '../style.css'
// import { mobileNavigation } from './handlers/nav.js'
// import { setupAuthHandlers } from './handlers/auth/handlers.js'
// import { fetchPosts } from './api/posts/fetch.js'
// import { PostsUI } from './ui/posts.js'
// import { SearchHandler } from './handlers/posts/searchHandler.js'
// import { FilterHandler } from './handlers/posts/filterHandler.js'
// import { SortHandler } from './handlers/posts/sortHandler.js'
// import { LoggedInUserPostsUI } from './ui/usersPostsFeed.js'

// mobileNavigation()

// document.querySelector('#landing-page').innerHTML = `
//   <div>
//      <h1 class="text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
//   </div>
// `

// // login and register
// if (
//     document.querySelector('#login-form') ||
//     document.querySelector('#register-form')
// ) {
//     setupAuthHandlers()
// }

// // Combined initialization function
// async function initializeApp() {
//     const container = document.getElementById('card-container')
//     if (!container) return

//     try {
//         // Create single PostsUI instance
//         const postsUI = new PostsUI(container)

//         // Initialize all handlers with the same PostsUI instance
//         new SearchHandler(postsUI)
//         new FilterHandler(postsUI)
//         const sortHandler = new SortHandler(postsUI)

//         // Fetch and render initial posts
//         const posts = await fetchPosts()
//         if (posts) {
//             postsUI.render(posts)
//         }

//         // Apply initial sort
//         sortHandler.sortPosts('recent')
//     } catch (error) {
//         console.error('Failed to initialize app:', error)
//         container.innerHTML = `
//             <div class="text-red-600 text-center py-4">
//                 Failed to load posts. Please try again later.
//             </div>
//         `
//     }
// }

// // Profile user posts

// const userPostsContainer = document.querySelector('.posts-section > div')
// if (userPostsContainer) {
//     const userPostsUI = new LoggedInUserPostsUI(userPostsContainer)
// }

// // Single DOMContentLoaded listener
// document.addEventListener('DOMContentLoaded', initializeApp, { once: true })


// ./src/main.js
import '../style.css'
import { mobileNavigation } from './handlers/nav.js'
import { setupAuthHandlers } from './handlers/auth/handlers.js'
import { fetchPosts } from './api/posts/fetch.js'
import { PostsUI } from './ui/posts.js'
import { SearchHandler } from './handlers/posts/searchHandler.js'
import { FilterHandler } from './handlers/posts/filterHandler.js'
import { SortHandler } from './handlers/posts/sortHandler.js'
import { LoggedInUserPostsUI } from './ui/usersPostsFeed.js'

// Initialize mobile navigation
mobileNavigation()

// Handle landing page
const landingPage = document.querySelector('#landing-page')
if (landingPage) {
    landingPage.innerHTML = `
        <div>
            <h1 class="text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
        </div>
    `
}

// Handle auth pages
if (
    document.querySelector('#login-form') ||
    document.querySelector('#register-form')
) {
    setupAuthHandlers()
}

// Feed page initialization
async function initializeFeedPage() {
    console.log('Initializing feed page...') // Debug log

    const container = document.getElementById('card-container')
    const searchInput = document.getElementById('search')
    const searchButton = document.getElementById('search-button')

    console.log('Elements found:', { // Debug log
        container: !!container,
        searchInput: !!searchInput,
        searchButton: !!searchButton
    })

    if (!container) {
        console.warn('Card container not found')
        return
    }

    try {
        // Create single PostsUI instance
        const postsUI = new PostsUI(container)

        // Only initialize handlers if we're on the feed page
        if (searchInput && searchButton) {
            console.log('Initializing search handler...') // Debug log
            new SearchHandler(postsUI)
            new FilterHandler(postsUI)
            const sortHandler = new SortHandler(postsUI)

            // Fetch and render initial posts
            const posts = await fetchPosts()
            if (posts) {
                postsUI.render(posts)
            }

            // Apply initial sort
            sortHandler.sortPosts('recent')
        }
    } catch (error) {
        console.error('Failed to initialize feed page:', error)
        container.innerHTML = `
            <div class="text-red-600 text-center py-4">
                Failed to load posts. Please try again later.
            </div>
        `
    }
}

// Profile page initialization
function initializeProfilePage() {
    const userPostsContainer = document.querySelector('.posts-section > div')
    if (userPostsContainer) {
        console.log('Initializing profile page...') // Debug log
        const userPostsUI = new LoggedInUserPostsUI(userPostsContainer)
    }
}

// Page-specific initialization
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname

    console.log('Current path:', currentPath) // Debug log

    if (currentPath.includes('/feed')) {
        initializeFeedPage()
    } else if (currentPath.includes('/profile')) {
        initializeProfilePage()
    }
}, { once: true })