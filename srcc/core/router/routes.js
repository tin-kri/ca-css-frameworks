/**
 * Application route definitions.
 * Contains all available routes in the application mapped to their URL patterns.
 * Dynamic parameters are indicated with a colon prefix (e.g., :id).
 * @type {Object.<string, string>}
 */
export const routes = {
    home: '/',
    feed: '/feed',
    singlePost: '/post/:id',
    profile: '/profile',
    login: '/login'
  }
  
  /**
   * Generates a concrete URL from a route name and parameters.
   * Replaces dynamic parts of the route pattern with actual values.
   * 
   * @param {string} name - The route name as defined in the routes object
   * @param {Object} [params={}] - An object containing parameter values to insert into the route
   * @returns {string} The complete URL path with parameters replaced
   * 
   * @example
   * // Returns '/post/123'
   * getRoute('singlePost', { id: 123 })
   * 
   * @example
   * // Returns '/feed'
   * getRoute('feed')
   */
  export function getRoute(name, params = {}) {
    let route = routes[name]
    Object.keys(params).forEach(key => {
      route = route.replace(`:${key}`, params[key])
    })
    return route
  }