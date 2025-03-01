// import '../style.css'
// import { mobileNavigation } from './handlers/nav.js'
// import { setupAuthHandlers } from './handlers/auth/handlers.js'
// import { fetchPosts } from './api/posts/fetch.js'
// import { PostsUI } from './ui/posts.js'
// import { SearchHandler } from './handlers/posts/searchHandler.js'
// import { FilterHandler } from './handlers/posts/filterHandler.js'
// import { LoggedInUserPostsUI } from './ui/usersPostsFeed.js'
// import { SinglePostUI } from './ui/singlePosts.js'

// mobileNavigation()

// document.querySelector('#landing-page').innerHTML = `
//   <div>
//      <h1 class="text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
//   </div>
// `
// // Initialize single post if we're on the post page
// const postContainer = document.querySelector('.posts-section > div')
// if (postContainer) {
//     const singlePostUI = new SinglePostUI(postContainer)
// }


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

//         // Fetch and render initial posts
//         const posts = await fetchPosts()
//         if (posts) {
//             postsUI.render(posts)
//         }

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


// src/js/main.js
import '../style.css'
import { mobileNavigation } from './handlers/nav.js'
import { setupAuthHandlers } from './handlers/auth/handlers.js'
import { fetchPosts } from './api/posts/fetch.js'
import { PostsUI } from './ui/posts.js'
import { SearchHandler } from './handlers/posts/searchHandler.js'
import { FilterHandler } from './handlers/posts/filterHandler.js'
import { LoggedInUserPostsUI } from './ui/usersPostsFeed.js'
import { SinglePostUI } from './ui/singlePosts.js'




document.querySelector('#landing-page').innerHTML = `
  <div>
     <h1 class="text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
  </div>
`

mobileNavigation()

console.log('Main.js loaded'); // Debug: Script loaded

// Initialize landing page content
function initializeLandingPage() {
    const landingPage = document.querySelector('#landing-page');
    if (landingPage) {
        landingPage.innerHTML = `
            <div>
                <h1 class="text-red-950 text-center p-10 text-5xl font-bold tracking-wider">Mizioù</h1>
            </div>
        `;
    }
}

// Separate auth setup
function setupAuth() {
    console.log('Checking for auth forms...'); // Debug
    const loginForm = document.querySelector('#login-form');
    const registerForm = document.querySelector('#register-form');
    
    console.log('Forms found:', { 
        login: !!loginForm, 
        register: !!registerForm 
    }); // Debug
    
    if (loginForm || registerForm) {
        console.log('Setting up auth handlers...'); // Debug
        setupAuthHandlers();
        
        // Add test handler for login form
        if (loginForm) {
            console.log('Adding test handler to login form'); // Debug
            loginForm.addEventListener('submit', (e) => {
                console.log('Test handler: Login form submitted');
                e.preventDefault();
                console.log('Form data:', new FormData(e.target));
            }, true); // Use capture phase
        }
    }
}

// Check authentication for protected routes
function checkAuth() {
    const token = localStorage.getItem('accessToken');
    const currentPath = window.location.pathname;
    console.log('Auth check:', { 
        path: currentPath, 
        hasToken: !!token 
    }); // Debug

    if (!token && (currentPath.includes('/feed/') || currentPath.includes('/profile/'))) {
        console.log('No token found, redirecting to login'); // Debug
        window.location.href = '/';
        return false;
    }
    return true;
}

// Initialize protected features
async function initializeProtectedFeatures() {
    // Feed page initialization
    const feedContainer = document.getElementById('card-container');
    if (feedContainer) {
        console.log('Initializing feed page...'); // Debug
        try {
            const postsUI = new PostsUI(feedContainer);
            new SearchHandler(postsUI);
            new FilterHandler(postsUI);
            const posts = await fetchPosts();
            if (posts) {
                postsUI.render(posts);
                console.log('Feed posts rendered successfully'); // Debug
            }
        } catch (error) {
            console.error('Failed to initialize feed:', error);
            feedContainer.innerHTML = `
                <div class="text-red-600 text-center py-4">
                    Failed to load posts. Please try again later.
                </div>
            `;
        }
    }

    // Single post page initialization
    const singlePostContainer = document.getElementById('post-container');
    if (singlePostContainer) {
        console.log('Initializing single post view'); // Debug
        new SinglePostUI(singlePostContainer);
    }

    // Profile user posts initialization
    const userPostsContainer = document.querySelector('.posts-section > div');
    if (userPostsContainer && !singlePostContainer) {
        console.log('Initializing user posts page'); // Debug
        new LoggedInUserPostsUI(userPostsContainer);
    }
}

// Main initialization function
async function initializeApp() {
    console.log('Initializing app...'); // Debug

    // Initialize basic UI first
    initializeLandingPage();
    mobileNavigation();
    
    // Setup auth handlers before checking auth
    setupAuth();

    // Check auth and initialize protected features
    if (checkAuth()) {
        await initializeProtectedFeatures();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug
    initializeApp().catch(error => {
        console.error('App initialization failed:', error);
    });
}, { once: true });

// Global error handling
window.addEventListener('error', (event) => {
    console.error('Script error:', event.error);
});

// Add unhandled promise rejection handling
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});