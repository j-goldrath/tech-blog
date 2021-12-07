const updatePostHandler = async (event) => {
    event.preventDefault();

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.querySelector('#edit-post-title').value.trim();;
    const content = document.querySelector('#edit-post-title').value.trim();;

    const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

const deletePostHandler = async (event) => {
    event.preventDefault();

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

const cancelEditPostHandler = async (event) => {
    event.preventDefault();

    document.location.replace('/dashboard');
};

// event listener for update post button
document.querySelector('#update-post-button').addEventListener('click', updatePostHandler);
// event listener for delete post button
document.querySelector('#delete-post-button').addEventListener('click', deletePostHandler);
// event listner for cancel edit post button
document.querySelector('#cancel-edit-post-button').addEventListener('click', cancelEditPostHandler);