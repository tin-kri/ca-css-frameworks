// # Essential application infrastructure
//     ├── router/       # Routing logic and navigation
//     │                 # (Router, routes configuration)


/**
 * A client-side router for single-page applications.
 * Handles navigation between pages without full page reloads.
 * Supports dynamic route parameters (e.g., /users/:id).
 */
export class Router {
    /**
     * Creates a new Router instance and sets up event listeners for navigation.
     */
    constructor() {
      /**
       * Stores the registered routes and their associated page classes.
       * @type {Map<string, function>}
       */
      this.routes = new Map()
      
      /**
       * Reference to the current active page instance.
       * @type {Object|null}
       */
      this.currentPage = null
      
      // Set up listener for browser back/forward navigation
      window.addEventListener('popstate', () => this.handleRoute())
    }
  
    /**
     * Registers a new route with the router.
     * 
     * @param {string} path - The URL path to match (e.g., '/users/:id')
     * @param {function} pageClass - The page class constructor to instantiate when this route is matched
     */
    addRoute(path, pageClass) {
      this.routes.set(path, pageClass)
    }
  
    /**
     * Handles routing based on the current URL path.
     * Cleans up the current page, finds the matching route, and initializes the new page.
     * 
     * @async
     * @returns {Promise<void>}
     */
    async handleRoute() {
      const path = window.location.pathname
      
      // Cleanup current page if exists
      if (this.currentPage && this.currentPage.cleanup) {
        this.currentPage.cleanup()
      }
      
      // Find matching route
      const PageClass = this.findMatchingRoute(path)
      if (PageClass) {
        this.currentPage = new PageClass()
        await this.currentPage.init()
      } else {
        console.error('Page not found')
      }
    }
  
    /**
     * Finds a route that matches the given path.
     * First tries exact matches, then falls back to pattern matching for dynamic routes.
     * 
     * @param {string} path - The URL path to match
     * @returns {function|null} The matching page class constructor or null if no match is found
     */
    findMatchingRoute(path) {
      // First try exact match
      if (this.routes.has(path)) {
        return this.routes.get(path)
      }
      
      // Then try pattern matching for dynamic routes
      for (const [routePath, pageClass] of this.routes) {
        if (this.matchRoute(routePath, path)) {
          return pageClass
        }
      }
      return null
    }
  
    /**
     * Checks if a path matches a route pattern.
     * Converts route patterns with parameters (e.g., '/users/:id') to regular expressions.
     * 
     * @param {string} pattern - The route pattern to match against (e.g., '/users/:id')
     * @param {string} path - The actual URL path (e.g., '/users/123')
     * @returns {boolean} True if the path matches the pattern, false otherwise
     */
    matchRoute(pattern, path) {
      // Convert route pattern to regex
      const regexPattern = pattern
        .replace(/:[^/]+/g, '([^/]+)')
        .replace(/\//g, '\\/')
      const regex = new RegExp(`^${regexPattern}$`)
      return regex.test(path)
    }
  
    /**
     * Navigates to a new page without a full page reload.
     * Updates the browser history and triggers route handling.
     * 
     * @param {string} path - The URL path to navigate to
     */
    navigate(path) {
      window.history.pushState(null, '', path)
      this.handleRoute()
    }
  }