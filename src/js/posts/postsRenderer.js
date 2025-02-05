export class PostRenderer {
    constructor(containerElement) {
        this.container = containerElement
    }

    createPostElement({ title, body }) {
        const template = document.getElementById('post-template')
        const postClone = template.content.cloneNode(true)
        const postContainer = postClone.querySelector('.post-container')
        const titleDiv = postClone.querySelector('.post-title')
        const bodyDiv = postClone.querySelector('.post-body')

        titleDiv.textContent = this.sanitizeText(title)
        bodyDiv.textContent = this.sanitizeText(body)

        return postContainer // Return the styled post
    }
    // read more later https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Safely_inserting_external_content_into_a_page

    //     const div = document.createElement('div');
    // div.textContent = "<script>alert('hacked')</script>"; // Should escape the script
    // document.body.appendChild(div);

    sanitizeText(text) {
        const div = document.createElement('div')
        div.textContent = text
        return div.innerHTML
    }

    render(posts) {
        this.container.innerHTML = ''
        const fragment = document.createDocumentFragment()
        posts.forEach((post) => {
            const postElement = this.createPostElement(post)
            fragment.appendChild(postElement)
        })

        this.container.appendChild(fragment)
    }
}
