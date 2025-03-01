import { fetchSinglePost } from '../api/posts/fetchSinglePost.js'
import { showNotification } from '../utils/notifications.js'

export class SinglePostUI {
    constructor(containerElement) {
        this.container = containerElement
        this.setupNavigation()
        this.loadPost()
    }

    setupNavigation() {
        // Setup back button click handler
        const backButton = document.getElementById('back-to-feed')
        if (backButton) {
            backButton.addEventListener('click', () => {
                this.handleNavigation()
            })
        }

        // Setup browser back button (history) handler
        window.addEventListener('popstate', () => {
            this.handleNavigation()
        })
    }

    handleNavigation() {
        // Check if we came from the feed page
        const previousPage = document.referrer
        if (previousPage.includes('/feed/') || previousPage.includes('/profile/')) {
            // If we came from feed or profile, go back in history
            window.history.back()
        } else {
            // If we didn't come from feed/profile (e.g., direct link), go to feed
            window.location.href = '/feed/index.html'
        }
    }
    async loadPost() {
        try {
            const urlParams = new URLSearchParams(window.location.search)
            const postId = urlParams.get('id')

            if (!postId) {
                throw new Error('No post ID provided')
            }

            const response = await fetchSinglePost(postId)
            if (response && response.data) {
                this.render(response.data)
                
            }
        } catch (error) {
            console.error('Failed to load post:', error)
            showNotification('Failed to load post. Please try again.', 'error')
        }
    }

    sanitizeText(text) {
        if (!text) return ''
        const div = document.createElement('div')
        div.textContent = text
        return div.innerHTML
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    render(post) {
        const template = document.querySelector('#single-post-template')
        if (!template) return

        const postClone = template.content.cloneNode(true)
        const postContainer = postClone.querySelector('.single-post-container')
        
     
        const titleDiv = postClone.querySelector('.post-title')
        const bodyDiv = postClone.querySelector('.post-body')
        const dateDiv = postClone.querySelector('.post-date')
        
        titleDiv.textContent = this.sanitizeText(post.title)
        bodyDiv.textContent = this.sanitizeText(post.body)
        dateDiv.textContent = `Posted on ${this.formatDate(post.created)}`

        // Handle tags if present
        if (post.tags && post.tags.length > 0) {
            const tagsContainer = postClone.querySelector('.tags-container')
            post.tags.forEach(tag => {
                const tagSpan = document.createElement('span')
                tagSpan.className = 'rounded-full bg-pink-50 px-3 py-1 text-sm text-red-900'
                tagSpan.textContent = this.sanitizeText(tag)
                tagsContainer.appendChild(tagSpan)
            })
        }

        // Update counts
        const likesCount = postClone.querySelector('.likes-count')
        const commentsCount = postClone.querySelector('.comments-count')
        
        if (likesCount) likesCount.textContent = `${post._count?.reactions || 0} likes`
        if (commentsCount) commentsCount.textContent = `${post._count?.comments || 0} comments`

        this.container.innerHTML = ''
        this.container.appendChild(postClone)
    }
}