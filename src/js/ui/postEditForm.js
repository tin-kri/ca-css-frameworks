export function createEditForm(currentData, onSubmit, onCancel) {
    const form = document.createElement('form')
    form.className = 'edit-post-form space-y-4 p-4'
    
    form.innerHTML = `
        <div>
            <label for="title" class="block text-sm font-medium text-red-900">Title</label>
            <input 
                type="text" 
                id="title" 
                name="title" 
                value="${currentData.title || ''}"
                class="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                required
            >
        </div>
        <div>
            <label for="body" class="block text-sm font-medium text-red-900">Content</label>
            <textarea 
                id="body" 
                name="body" 
                rows="3"
                class="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                required
            >${currentData.body || ''}</textarea>
        </div>
        <div class="flex justify-end space-x-2">
            <button type="button" class="cancel-edit-btn px-4 py-2 text-sm font-medium text-red-900 bg-white border border-pink-300 rounded-md hover:bg-pink-50">
                Cancel
            </button>
            <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-red-900 border border-transparent rounded-md hover:bg-red-800">
                Save Changes
            </button>
        </div>
    `

    form.addEventListener('submit', onSubmit)
    form.querySelector('.cancel-edit-btn').addEventListener('click', onCancel)

    return form
}