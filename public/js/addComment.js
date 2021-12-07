const addCommentHandler = async (event) => {
    event.preventDefault();

    const newCommentContent = document.querySelector('#new-comment-content').value.trim();


    if (newPostTitle && newPostContent) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ body: newCommentContent }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Error: Failed to add comment!');
        }
    }
};

const cancelCommentHandler = async (event) => {
    event.preventDefault();

    document.location.replace('/');
};

// event handler for when create post button is clicked
document.querySelector('#add-new-comment-button').addEventListener('click', addCommentHandler);
// event handler for when cancel creating new post button is clicked
document.querySelector('#cancel-new-comment-button').addEventListener('click', cancelCommentHandler);