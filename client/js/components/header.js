function renderHeader(session = {}) {
    const header = document.querySelector('#header-nav');

    if (session.email) {
        header.innerHTML = `       
        <ul id="navlist">
            <li id="main-page">Home</li> 
            <li id="payment-event">Create Payment Event</li>
            <li onClick="logout()">Logout</li> 
        </ul>
    `;
        document
            .querySelector('#payment-event')
            .addEventListener('click', () => {
                renderCreatePaymentEventList(session);
            });
        document.querySelector('#main-page').addEventListener('click', () => {
            mainPageElement(session);
        });
    } else {
        header.innerHTML = `       
        <ul id="navlist">
            <li onClick="renderSignupForm()">Sign up</li> 
            <li onClick="renderLoginForm()">Login</li> 
        </ul>

    `;
    }
}
// nav bar list and functions need to be updated
