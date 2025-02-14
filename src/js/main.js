// ./src/main.js
import '../style.css'
import { mobileNavigation } from './handlers/nav.js'
import { setupAuthHandlers } from './handlers/auth/handlers.js'
import { fetchPosts } from './api/posts/fetch.js'
import { PostsUI } from './ui/posts.js'

mobileNavigation()

document.querySelector('#landing-page').innerHTML = `
  <div >
     <h1 class=" text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
  </div>
`
// login and register
if (document.querySelector('#login-form') || document.querySelector('#register-form')) {
    setupAuthHandlers()
}


// Posts setup
async function initializePosts() {
    const container = document.getElementById('card-container')
    if (!container) return

    try {
        const posts = await fetchPosts()
        if (posts) {
            const postsUI = new PostsUI(container)
            postsUI.render(posts)
        }
    } catch (error) {
        console.error('Failed to initialize feed:', error)
    }
}

// Initialize posts when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePosts)