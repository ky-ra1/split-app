//payments owed

function mainPageElement(session) {
    const page = document.getElementById('page'); 
    page.innerHTML = '';

    renderPaymentsOwed(session);
    renderPaymentsEventForMainPage(session);
    renderPaymentHistory(session);
}

function renderPaymentsOwed(session) {
    user_id = session.user_id; 

    const page = document.getElementById('page');
    page.innerHTML += `
        <h1>Payments Owed</h1>
    `

    page.innerHTML += `
        <section id="payments_owed_section">
        </section>
    `;

    axios
        .get(`/api/payments/getPaymentsOwed/${user_id}`)
        .then((response) => {
            const payments = response.data;

            const paymentsOwedSection = document.getElementById('payments_owed_section');
            
            payments.forEach(payment => {
                paymentsOwedSection.innerHTML += `
                    <p>${payments.amount}</p>
                `
            });
        })
        .catch((error) => {
            //ERROR handling
            return error;
        });
}

//paymentevent

function renderPaymentsEventForMainPage(session) {
    user_id = session.user_id; //Kyra is working on this// add code to get user id

    const page = document.getElementById('page');
    page.innerHTML += `
        <h1>Payments Events</h1>
    `

    page.innerHTML += `
        <section id="payments_event_section">
        </section>
    `;

    axios
        .get(`/api/paymentsEvent/getEventsByCreatorId/${user_id}`) // need to change
        .then((response) => {
            const paymentEvents = response.data;
            const paymentsEventSection = document.getElementById('payments_event_section');
            paymentEvents.forEach(paymentEvent => {
                paymentsEventSection.innerHTML += `
                    <p>${paymentEvent.event_name} on ${paymentEvent.creation_date}</p>
                `
            });
        })
        .catch((error) => {
            //ERROR handling
            return error;
        });
}
//payment history
function renderPaymentHistory(session) {
    user_id = session.user_id;

    const page = document.getElementById('page');
    page.innerHTML += `
        <h1>Payments History</h1>
    `

    page.innerHTML += `
        <section id="payment_history_section">
        </section>
    `;

    axios
        .get(`/api/payments/getPaymentsPaid/${user_id}`) // need to change
        .then((response) => {
            const paymentsHistory = response.data;
            const paymentHistorySection = document.getElementById('payment_history_section');
            paymentsHistory.forEach(payment => {
                paymentHistorySection.innerHTML += `
                    <p>${payments.amount}</p>
                `
            });
        })
        .catch((error) => {
            //ERROR handling
            return error;
        });
}
