function renderLoginForm() {
    const page = document.getElementById('page');
    page.innerHTML = `
        <h2>Login</h2>
        <form id="login" action="/api/sessions" method="POST">
            <label>Email:</label>
            <input type="email" name="email" />
            <label>Password:</label>
            <input type="password" name="password" />

            <button type="submit">Login</button>
        </form>
    `;

    const form = document.getElementById('login');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const emailField = document.querySelector('input[name=email]');
        const passwordField = document.querySelector('input[name=password]');
        const body = {
            email: emailField.value,
            password: passwordField.value,
        };

        let error = null;
        if (body.email === '') {
            error = 'Email is required';
        } else if (body.password === '') {
            error = 'Password is required';
        }

        if (!error) {
            axios
                .post('/api/sessions', body)
                .then((response) => {
                    renderAppWithSession();
                })
                .catch((error) => {
                    clearErrors();
                    displayError(error.response.data.message);
                });
        } else {
            clearErrors();
            displayError(error);
        }
    });
}
