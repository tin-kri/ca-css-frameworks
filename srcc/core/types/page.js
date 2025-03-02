/**
 * Represents a base page that manages components and provides lifecycle methods.
 */
export class Page {
    constructor() {
        /**
         * A map storing registered components by name.
         * @type {Map<string, any>}
         */
        this.components = new Map();
    }

    /**
     * Initializes the page. Meant to be overridden in specific pages.
     * @returns {Promise<void>}
     */
    async init() {
        // Override in specific pages
    }

    /**
     * Cleans up resources when the page is unloaded. Meant to be overridden in specific pages.
     */
    cleanup() {
        // Override in specific pages
    }

    /**
     * Registers a component with the page.
     * @param {string} name - The name of the component.
     * @param {any} component - The component instance.
     */
    registerComponent(name, component) {
        this.components.set(name, component);
    }
}
