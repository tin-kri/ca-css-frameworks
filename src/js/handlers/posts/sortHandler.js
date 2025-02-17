// js/handlers/posts/sortHandler.js
import { getSortedPosts } from '../../api/posts/sortPosts.js'

export class SortHandler {
    constructor(postsUI) {
        this.postsUI = postsUI
        this.setupSortListener()
    }

    setupSortListener() {
        const sortSelect = document.getElementById('sort')
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                const sortBy = sortSelect.value
                this.sortPosts(sortBy)
            })
        }
    }

    async sortPosts(sortBy) {
        // console.log('Sorting by:', sortBy)
        try {
            this.showLoadingState()
            const sortedPosts = await getSortedPosts(sortBy)
            // console.log('Sorted posts:', sortedPosts)
            
            if (sortedPosts && sortedPosts.length > 0) {
                this.postsUI.render(sortedPosts)
            } else {
                this.showNoResults()
            }
        } catch (error) {
            console.error('Sorting failed:', error)
            this.showError('Failed to sort posts')
        } finally {
            this.hideLoadingState()
        }
    }

    showLoadingState() {
        const container = document.querySelector('#card-container')
        if (container) {
            const loadingOverlay = document.createElement('div')
            loadingOverlay.id = 'sort-loading-overlay'
            loadingOverlay.className = 'absolute inset-0 bg-white/80 flex items-center justify-center'
            loadingOverlay.innerHTML = `
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-900"></div>
            `
            container.style.position = 'relative'
            container.appendChild(loadingOverlay)
        }
    }

    hideLoadingState() {
        const loadingOverlay = document.querySelector('#sort-loading-overlay')
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
                    No posts found
                </div>
            `
        }
    }
}