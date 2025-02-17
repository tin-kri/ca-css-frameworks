// Display & render posts
import { createPost } from '../api/posts/create'

export class PostsUI {
    constructor(containerElement) {
        this.container = containerElement
        this.setupPostForm()
    }

    // Post Creation
    setupPostForm() {
        const form = document.getElementById('create-post-form')
        if (!form) return

        form.addEventListener('submit', async (event) => {
            event.preventDefault()

            const titleInput = document.getElementById('post-title')
            const textInput = document.getElementById('text')
            const categorySelect = document.getElementById('post-tag') // Get category select

            const title = titleInput.value.trim()
            const text = textInput.value.trim()
            const selectedCategory = categorySelect.value // Get selected category

            const postData = {
                title: title,
                body: text,
                tags: selectedCategory ? [selectedCategory] : [], // Add as array
            }

            try {
                const newPost = await createPost(postData)
                if (newPost) {
                    form.reset()
                    // Optionally refresh posts display
                    this.addNewPost(newPost)
                }
            } catch (error) {
                console.log('Failed to create post:', error)
            }
        })
    }

    // Post Display
    createPostElement({ title, body, tags = [] }) {
        const template = document.getElementById('post-template')
        const postClone = template.content.cloneNode(true)
        const postContainer = postClone.querySelector('.post-container')
        const titleDiv = postClone.querySelector('.post-title')
        const bodyDiv = postClone.querySelector('.post-body')

        titleDiv.textContent = this.sanitizeText(title)
        bodyDiv.textContent = this.sanitizeText(body)

        // Add tags display
        if (tags && tags.length > 0) {
            const tagsContainer = document.createElement('div')
            tagsContainer.className = 'flex gap-2 mt-2'
            
            tags.forEach(tag => {
                const tagElement = document.createElement('span')
                tagElement.className = 'px-2 py-1 text-sm rounded-full bg-pink-50 text-red-900'
                tagElement.textContent = this.sanitizeText(tag)
                tagsContainer.appendChild(tagElement)
            })

        postContainer.appendChild(tagsContainer)
    }

    return postContainer
}

    sanitizeText(text) {
        const div = document.createElement('div')
        div.textContent = text
        return div.innerHTML
    }

    render(posts) {
        this.container.innerHTML = ''
        const fragment = document.createDocumentFragment()
        posts.forEach((post) => {
            const postElement = this.createPostElement(post)
            fragment.appendChild(postElement)
        })

        this.container.appendChild(fragment)
    }

    // Helper method to add a single new post
    addNewPost(post) {
        const postElement = this.createPostElement(post)
        this.container.insertBefore(postElement, this.container.firstChild)
    }
}
