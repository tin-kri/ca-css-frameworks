import { updatePost } from '../../api/posts/updatePost.js'
import { showNotification } from '../../utils/notifications.js'

export async function handlePostUpdate(postId, updateData) {
    try {
        const updatedPost = await updatePost(postId, updateData)
        showNotification('Post updated successfully', 'success')
        return updatedPost
    } catch (error) {
        console.error('Update handler error:', error)
        showNotification('Failed to update post. Please try again.', 'error')
        throw error
    }
}