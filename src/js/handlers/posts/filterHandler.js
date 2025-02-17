import { getPostsByTag } from "../../api/posts/filterPosts";

export class FilterHandler {
    constructor(postsUI) {
        this.postsUI = postsUI
        this.setupFilterListener()
    }

    setupFilterListener() {
        const categorySelect = document.getElementById('category')
        if (categorySelect) {
            categorySelect.addEventListener('change', () => {
                const selectedTag = categorySelect.value
                this.filterPosts(selectedTag)
            })
        }
    }

    async filterPosts(tag) {
        console.log('Filtering by tag:', tag)
        try {
            this.showLoadingState()
            const filteredPosts = await getPostsByTag(tag)
            console.log('Filtered posts:', filteredPosts)
            
            if (filteredPosts && filteredPosts.length > 0) {
                this.postsUI.render(filteredPosts)
            } else { 
                this.showNoResults()
            }
        } catch (error) {
            console.error('Filtering failed:', error)
            this.showError('Failed to filter posts')
        } finally {
            this.hideLoadingState()
        }
    }
    
    showLoadingState() {
        const container = document.querySelector('#card-container')
        if (container) {
            const loadingOverlay = document.createElement('div')
            loadingOverlay.id = 'filter-loading-overlay'
            loadingOverlay.className = 'absolute inset-0 bg-white/80 flex items-center justify-center'
            loadingOverlay.innerHTML = `
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-900"></div>
            `
            container.style.position = 'relative'
            container.appendChild(loadingOverlay)
        }
    }

    hideLoadingState() {
        const loadingOverlay = document.querySelector('#filter-loading-overlay')
        if (loadingOverlay) {
            loadingOverlay.remove()
        }
    }

    showError(message) {
        const container = document.querySelector('#card-container')
        if (container) {
            container.innerHTML = `
                <div class="text-red-600 text-center py-4">
                    ${message}
                </div>
            `
        }
    }

    showNoResults() {
        const container = document.querySelector('#card-container')
        if (container) {
            container.innerHTML = `
                <div class="text-gray-600 text-center py-4">
                    No posts found in this category
                </div>
            `
        }
    }
}