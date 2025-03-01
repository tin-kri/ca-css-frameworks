// export function addToLocalStorage(key, value) {
//     localStorage.setItem(key, value)
// }

// export function getFromLocalStorage(key) {
//     return localStorage.getItem(key)
// }
// src/js/utils/storage.js
export function addToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, value);
        console.log(`Successfully stored ${key}`); // Debug
        return true;
    } catch (error) {
        console.error(`Failed to store ${key}:`, error);
        return false;
    }
}

export function getFromLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        console.log(`Retrieved ${key}:`, !!value); // Debug
        return value;
    } catch (error) {
        console.error(`Failed to retrieve ${key}:`, error);
        return null;
    }
}