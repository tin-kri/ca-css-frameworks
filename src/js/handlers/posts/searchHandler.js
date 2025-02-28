// js/handlers/posts/searchHandler.js
// js/handlers/posts/searchHandler.js
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

// // js/handlers/posts/searchHandler.js
// export class SearchHandler {
//     constructor(postsUI) {
//         this.postsUI = postsUI
//         console.log('SearchHandler initialized') // Debug log
//         this.setupSearchListeners()
//     }

//     setupSearchListeners() {
//         const searchInput = document.getElementById('search')
//         const searchButton = document.getElementById('search-button')

//         console.log('Found search elements:', {
//             input: !!searchInput,
//             button: !!searchButton
//         }) // Debug log

//         if (searchButton) {
//             searchButton.addEventListener('click', async (e) => {
//                 e.preventDefault()
//                 const searchTerm = searchInput?.value.trim()
//                 if (searchTerm) {
//                     console.log('Search button clicked with term:', searchTerm) // Debug log
//                     await this.performSearch(searchTerm)
//                 }
//             })
//         }

//         if (searchInput) {
//             searchInput.addEventListener('keypress', async (e) => {
//                 if (e.key === 'Enter') {
//                     e.preventDefault()
//                     const searchTerm = searchInput.value.trim()
//                     if (searchTerm) {
//                         console.log('Enter pressed with term:', searchTerm) // Debug log
//                         await this.performSearch(searchTerm)
//                     }
//                 }
//             })
//         }
//     }

//     async performSearch(searchTerm) {
//         try {
//             this.showLoadingState()
//             console.log('Starting search for:', searchTerm) // Debug log

//             const searchResults = await searchPosts(searchTerm)
//             console.log('Search results received:', searchResults) // Debug log

//             if (searchResults && searchResults.length > 0) {
//                 this.postsUI.render(searchResults)
//                 this.clearSearchInput()
//             } else {
//                 this.showNoResults()
//             }
//         } catch (error) {
//             console.error('Search failed:', error)
//             this.showError('Failed to search posts. Please try again.')
//         } finally {
//             this.hideLoadingState()
//         }
//     }

//     showLoadingState() {
//         const searchButton = document.getElementById('search-button')
//         if (searchButton) {
//             searchButton.disabled = true
//             searchButton.innerHTML = `
//                 <span class="inline-flex items-center">
//                     <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
//                         <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//                         <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Searching...
//                 </span>
//             `
//         }
//     }

//     hideLoadingState() {
//         const searchButton = document.getElementById('search-button')
//         if (searchButton) {
//             searchButton.disabled = false
//             searchButton.textContent = 'Search'
//         }
//     }

//     clearSearchInput() {
//         const searchInput = document.getElementById('search')
//         if (searchInput) {
//             searchInput.value = ''
//             searchInput.blur()
//         }
//     }

//     showNoResults() {
//         const container = document.getElementById('card-container')
//         if (container) {
//             container.innerHTML = `
//                 <div class="col-span-full text-center py-8 text-gray-500">
//                     No posts found matching your search.
//                 </div>
//             `
//         }
//     }

//     showError(message) {
//         const container = document.getElementById('card-container')
//         if (container) {
//             container.innerHTML = `
//                 <div class="col-span-full text-center py-8 text-red-500">
//                     ${message}
//                 </div>
//             `
//         }
//     }
// }