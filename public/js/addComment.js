const addCommentHandler = async (event) => {
    event.preventDefault();

    const body = document.querySelector('#new-comment-body').textContent.trim();
    const post_id = /[^/]*$/.exec(window.location.href)[0];;
    console.log(post_id);

    if (body && post_id) {
        const response = await fetch(`/api/comments/${post_id}`, {
            method: 'POST',
            body: JSON.stringify({ body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/posts/${post_id}`);
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