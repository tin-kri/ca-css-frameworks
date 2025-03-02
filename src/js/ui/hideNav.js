/**
 * Hides the navigation element on login pages.
 * This function checks if the current page is a login page (index.html or root path)
 * and hides the navigation element if true. Otherwise, it displays the navigation element.
 * The function is automatically executed when the DOM content is loaded.
 * 
 * @function hideNav
 * @returns {void}
 * 
 * @example
 * // The function is already attached to the DOMContentLoaded event
 * // No need to call it manually
 * // document.addEventListener('DOMContentLoaded', hideNav)
 */
export function hideNav() {
    const isLoginPage = window.location.pathname === '/index.html' || window.location.pathname === '/'
    const nav = document.querySelector('nav')
    if (nav) {
      nav.style.display = isLoginPage ? 'none' : 'block'
    }
  }
  document.addEventListener('DOMContentLoaded', hideNav)