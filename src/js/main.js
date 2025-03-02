import '../style.css'
import { mobileNavigation } from './handlers/nav.js'
import { setupAuthHandlers } from './handlers/auth/handlers.js'
import { fetchPosts } from './api/posts/fetch.js'
import { PostsUI } from './ui/posts.js'
import { SearchHandler } from './handlers/posts/searchHandler.js'
import { FilterHandler } from './handlers/posts/filterHandler.js'
import { LoggedInUserPostsUI } from './ui/usersPostsFeed.js'
import { SinglePostUI } from './ui/singlePosts.js'
import { hideNav } from './ui/hideNav.js'

mobileNavigation()

hideNav()

document.querySelector('#landing-page').innerHTML = `
  <div>
     <h1 class="text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
  </div>
`

// login and register
if (
    document.querySelector('#login-form') ||
    document.querySelector('#register-form')
) {
    setupAuthHandlers()
}

// Initialize different pages based on their containers
async function initializeApp() {
    // Feed page initialization
    const feedContainer = document.getElementById('card-container')
    if (feedContainer) {
        try {
            const postsUI = new PostsUI(feedContainer)
            new SearchHandler(postsUI)
            new FilterHandler(postsUI)
            const posts = await fetchPosts()
            if (posts) {
                postsUI.render(posts)
            }
        } catch (error) {
            console.error('Failed to initialize feed:', error)
            feedContainer.innerHTML = `
                <div class="text-red-600 text-center py-4">
                    Failed to load posts. Please try again later.
                </div>
            `
        }
    }

    // Single post page initialization
    const singlePostContainer = document.getElementById('post-container')
    if (singlePostContainer) {
        console.log('Initializing single post view')
        new SinglePostUI(singlePostContainer)
    }

    // Profile user posts initialization
    const userPostsContainer = document.querySelector('.posts-section > div')
    if (userPostsContainer && !singlePostContainer) {
        // Only initialize if we're not on single post page
        const userPostsUI = new LoggedInUserPostsUI(userPostsContainer)
    }
}

// Single DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', initializeApp, { once: true })
