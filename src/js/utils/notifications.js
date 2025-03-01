export function showNotification(message, type = 'success') {
    const notification = document.createElement('div')
    notification.className = `fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
        type === 'success' ? 'bg-white-50 text-pink-800' : 'bg-red-50 text-red-800'
    }`
    notification.textContent = message

    document.body.appendChild(notification)

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove()
    }, 3000)
}