function renderHeader(session = {}) {
    const header = document.querySelector('#header-nav');

    if (session.email) {
        header.innerHTML = `       
        <ul id="navlist">
            <li id="payment-event">Create Payment Event</li>
            <li onClick="logout()">Logout</li> 
        </ul>
    `;
        document
            .querySelector('#payment-event')
            .addEventListener('click', () => {
                console.log(session);
                renderCreatePaymentEventList(session);
            });
    } else {
    }
}
// nav bar list and functions need to be updated
