function renderHeader() {
    const header = document.querySelector('#header-nav');
    header.innerHTML = `       
        <ul id="navlist">
            <li onClick="renderProfile()">Profile</li>
            <li onClick="renderPayment()">Create Payment Event</li>
            <li onClick="renderPaymentEvent()">Payment Event</li>
            <li onClick="renderPaymentHistory()">Payment History</li>
            <li onClick="renderLoginForm()">Login</li>
        </ul>
    `;
}
// nav bar list and functions need to be updated
