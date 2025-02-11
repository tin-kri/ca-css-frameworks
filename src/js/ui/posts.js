import { createPost } from '../api/posts/create'

export function setUpPostForm() {
    const form = document.getElementById('create-post-form')

    form.addEventListener('submit', async function (event) {
        event.preventDefault()

        const titleInput = document.getElementById('post-title')
        const textInput = document.getElementById('text')
        const title = titleInput.value.trim()
        const text = textInput.value.trim()
        const postData = {
            title: title,
            body: text,
        }
        // console.log('Sending Post Data:', postData)
        const newPost = await createPost(postData)

        if (newPost) {
            // console.log('post created success:', newPost)
            form.reset();
        } else {
            console.log('failed to create post')
        }
    })
}
