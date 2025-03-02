/**
 * API key for authentication. 
 * **Warning:** Do not expose API keys in frontend code for security reasons.
 * @constant {string}
 */
export const API_KEY = 'ad98d769-478d-4439-9987-1959655681d4';

/**
 * Base URL for the Noroff API.
 * @constant {string}
 */
export const API_BASE = 'https://v2.api.noroff.dev';

/**
 * Base URL for authentication-related endpoints.
 * @constant {string}
 */
export const API_AUTH = `${API_BASE}/auth`;

/**
 * Endpoint for user login.
 * @constant {string}
 */
export const API_AUTH_LOGIN = `${API_AUTH}/login`;

/**
 * Endpoint for user registration.
 * @constant {string}
 */
export const API_AUTH_REGISTER = `${API_AUTH}/register`;

/**
 * Endpoint for creating an API key.
 * @constant {string}
 */
export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

/**
 * Base URL for social-related endpoints.
 * @constant {string}
 */
export const API_SOCIAL = `${API_BASE}/social`;

/**
 * Endpoint for retrieving or posting social posts.
 * @constant {string}
 */
export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`;

/**
 * Endpoint for retrieving user profiles.
 * @constant {string}
 */
export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;

/**
 * Endpoint for searching social posts.
 * @constant {string}
 */
export const API_SOCIAL_POSTS_SEARCH = `${API_SOCIAL_POSTS}/search`;
