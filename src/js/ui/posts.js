import { createPost } from '../api/posts/create'
import { fetchPosts } from '../api/posts/fetch'

export class PostsUI {
    constructor(containerElement) {
        this.container = containerElement
        this.setupPostForm()
    }

    setupPostForm() {
        const form = document.getElementById('create-post-form')
        if (!form) return

        form.addEventListener('submit', async (event) => {
            event.preventDefault()

            const titleInput = document.getElementById('post-title')
            const textInput = document.getElementById('text')
            const categorySelect = document.getElementById('post-tag')

            const title = titleInput.value.trim()
            const text = textInput.value.trim()
            const selectedCategory = categorySelect.value

            const postData = {
                title: title,
                body: text,
                tags: selectedCategory ? [selectedCategory] : [],
            }

            try {
                const newPost = await createPost(postData)
                if (newPost) {
                    form.reset()
                    // Fetch all posts again to ensure we have the latest data
                    const updatedPosts = await fetchPosts()
                    if (updatedPosts) {
                        this.render(updatedPosts)
                    }
                }
            } catch (error) {
                console.error('Failed to create post:', error)
            }
        })
    }


  // Post Display
createPostElement({ id, title, body, tags = [] }) {
    const template = document.getElementById('post-template')
    const postClone = template.content.cloneNode(true)
    const postContainer = postClone.querySelector('.post-container')
    const titleDiv = postClone.querySelector('.post-title')
    const bodyDiv = postClone.querySelector('.post-body')
    const tagsContainer = postClone.querySelector('.tags-container')

    titleDiv.textContent = this.sanitizeText(title)
    bodyDiv.textContent = this.sanitizeText(body)

    // Add tags display
    if (tags && tags.length > 0) {
        const tagsWrapper = document.createElement('div')
        tagsWrapper.className = 'flex flex-wrap gap-2'
        
        tags.forEach(tag => {
            const tagElement = document.createElement('span')
            tagElement.className = 'px-2 py-1 text-xs font-medium rounded-full bg-pink-50 text-red-900'
            tagElement.textContent = this.sanitizeText(tag)
            tagsWrapper.appendChild(tagElement)
        })

        // Append tags to the designated container
        tagsContainer.appendChild(tagsWrapper)
    } else {
        // If no tags, remove the tags container to avoid empty space
        tagsContainer.remove()
    }
// Add click handler to view full post
postContainer.addEventListener('click', () => {
    window.location.href = `/post/index.html?id=${id}`
})
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
