// src/js/ui/usersPostsFeed.js
import { createPost } from '../api/posts/create.js'
import { fetchUserPosts } from '../api/posts/fetchUserPosts.js'  // Add this import

export class LoggedInUserPostsUI {
    constructor(containerElement) {
        this.container = containerElement
        this.loadUserPosts()
    }

    async loadUserPosts() {
        try {
            const posts = await fetchUserPosts()
            if (posts) {
                this.render(posts)
            }
        } catch (error) {
            console.error('Failed to load user posts:', error)
        }
    }

    // Add the sanitizeText method
    sanitizeText(text) {
        if (!text) return ''
        const div = document.createElement('div')
        div.textContent = text
        return div.innerHTML
    }

    createPostElement({ id, title, body }) {
        const template = document.querySelector('#logged-in-user-post-template')
        const postClone = template.content.cloneNode(true)
        const postContainer = postClone.querySelector('.logged-in-user-post-container')
        
        // Set post ID as data attribute
        postContainer.dataset.postId = id
    
        const titleDiv = postClone.querySelector('.logged-in-user-post-title')
        const bodyDiv = postClone.querySelector('.logged-in-user-post-body')
    
        titleDiv.textContent = this.sanitizeText(title)
        bodyDiv.textContent = this.sanitizeText(body)
    
        // Set up options menu
        const optionsBtn = postContainer.querySelector('.options-btn')
        const optionsMenu = postContainer.querySelector('.options-menu')
        const editBtn = postContainer.querySelector('.edit-post-btn')
        const deleteBtn = postContainer.querySelector('.delete-post-btn')
    
        // Toggle menu
        optionsBtn?.addEventListener('click', (e) => {
            e.stopPropagation()
            optionsMenu.classList.toggle('hidden')
        })
    
        // Close menu when clicking outside
        document.addEventListener('click', () => {
            optionsMenu.classList.add('hidden')
        })
    
        // Event listeners for edit and delete
        editBtn?.addEventListener('click', () => {
            optionsMenu.classList.add('hidden')
            this.handleEdit(id, { title, body })
        })
    
        deleteBtn?.addEventListener('click', () => {
            optionsMenu.classList.add('hidden')
            this.handleDelete(id)
        })
    
        return postContainer
    }

    render(posts) {
        this.container.innerHTML = ''
        
        if (!posts || posts.length === 0) {
            this.container.innerHTML = `
                <div class="text-center p-4 text-red-900">
                    You haven't created any posts yet.
                </div>
            `
            return
        }

        const fragment = document.createDocumentFragment()
        posts.forEach((post) => {
            const postElement = this.createPostElement(post)
            if (postElement) {
                fragment.appendChild(postElement)
            }
        })

        this.container.appendChild(fragment)
    }
}