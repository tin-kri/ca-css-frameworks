import { searchPosts } from '../../api/posts/search.js'

export class SearchHandler {
    constructor(postsUI) {
        this.postsUI = postsUI
        this.setupSearchListeners()
    }

    setupSearchListeners() {
        const searchInput = document.getElementById('search')
        const searchButton = document.getElementById('search-button')

        searchButton?.addEventListener('click', async () => {
            const searchTerm = searchInput?.value.trim()
            if (searchTerm) {
                await this.performSearch(searchTerm)
                this.clearSearchInput(searchInput)
            }
        })

        searchInput?.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim()
                if (searchTerm) {
                    await this.performSearch(searchTerm)
                    this.clearSearchInput(searchInput)
                }
            }
        })
    }

    clearSearchInput(searchInput) {
        if (searchInput) {
            searchInput.value = ''
            // Optional: Remove focus from the input
            searchInput.blur()
        }
    }

    async performSearch(searchTerm) {
        try {
            this.showLoadingState()
            const searchResults = await searchPosts(searchTerm)
            
            if (searchResults && searchResults.length > 0) {
                this.postsUI.render(searchResults)
            } else {
                this.showNoResults()
            }
        } catch (error) {
            console.log('Search failed:', error)
            this.showError('Failed to search posts')
        } finally {
            this.hideLoadingState()
        }
    }

    showLoadingState() {
        const searchButton = document.getElementById('search-button')
        if (searchButton) {
            searchButton.disabled = true
            searchButton.textContent = 'Searching...'
        }
    }

    hideLoadingState() {
        const searchButton = document.getElementById('search-button')
        if (searchButton) {
            searchButton.disabled = false
            searchButton.textContent = 'Search'
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
                    No posts found matching your search
                </div>
            `
        }
    }
}
