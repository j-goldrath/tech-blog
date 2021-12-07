const createPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-post-title').value.trim();
    const content = document.querySelector('#new-post-content').value.trim();


    if (newPostTitle && newPostContent) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Error: Failed to create new post!');
        }
    }
};

const cancelPostHandler = async (event) => {
    event.preventDefault();

    document.location.replace('/dashboard');
};

// event handler for when create post button is clicked
document.querySelector('#create-new-post-button').addEventListener('click', createPostHandler);
// event handler for when cancel creating new post button is clicked
document.querySelector('#cancel-new-post-button').addEventListener('click', cancelPostHandler);
