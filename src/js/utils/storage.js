export function addToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error(`Failed to store ${key}:`, error);
        return false;
    }
}

export function getFromLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value;
    } catch (error) {
        console.error(`Failed to retrieve ${key}:`, error);
        return null;
    }
}