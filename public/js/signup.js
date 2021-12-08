const registerFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();

    // Gather the data from the form elements on the page
    const firstName = document.querySelector('#firstname-register').value.trim();
    const lastName = document.querySelector('#lastname-register').value.trim();
    const email = document.querySelector('#email-register').value.trim();
    const password = document.querySelector('#password-register').value.trim();
    const confirmedPassword = document.querySelector('#confirm-password-register').value.trim();

    if (password !== confirmedPassword) {
        alert('Passwords do not match!');
    } else {

        if (firstName && lastName && email && password) {
            // Send the e-mail and password to the server
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ firstName, lastName, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/login');
            } else {
                alert('Failed to register!');
            }
        }
    };
};

document.querySelector('.register-form').addEventListener('submit', registerFormHandler);
