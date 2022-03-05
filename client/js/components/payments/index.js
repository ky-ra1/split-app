//payments owed

function mainPageElement(session) {
    const page = document.getElementById('page');
    page.innerHTML = '';

    renderPaymentsOwed(session);
    renderPaymentsEventForMainPage(session);
    renderPaymentHistory(session);
}
