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
        <h1>Payments</h1>
    `

    page.innerHTML += `
        <section id="payments_owing_section">
            <h3>Payments Owing<h3>
        </section>
        <section id="payments_owed_to_me">
            <h3>Payments Owed To Me</h3>
        </section>
    `;

    //FIX API CALL to get the event creator, currently displaying event name rather than event creator
    axios
        .get(`/api/payments/getPaymentsOwed/${user_id}`)
        .then((response) => {
            const payments = response.data;

            const paymentsOwingSection = document.getElementById('payments_owing_section');
            const paymentsOwedToMe = document.getElementById('payments_owed_to_me');

            payments.forEach(payment => {
                if(payment.user_id !== payment.event_creator_id) {
                    let status = '';
                    if(!payment.paid_status && !payment.received_status) {
                        status = 'UNPAID';
                    } else if(payment.paid_status && !payment.received_status)   {
                        status = 'PAID - Payer Notified';
                    }
                    if(!payment.received_status) {
                        paymentsOwingSection.innerHTML += `
                            <p>${payment.event_name} | ${payment.due_date} | ${status}</p>
                        `
                    }
                } else if (payment.user_id === payment.event_creator_id) {
                    let status = '';
                    if(!payment.paid_status && !payment.received_status) {
                        status = 'UNPAID';
                    } else if(payment.paid_status && !payment.received_status)   {
                        status = 'PAID - Payer Notified';
                    }
                    if(!payment.received_status) {
                        paymentsOwedToMe.innerHTML += `
                            <p>${payment.event_name} | ${payment.due_date} | ${status}</p>
                        `
                    }
                }
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
        <h1>History</h1>
    `

    page.innerHTML += `
        <section id="payments_history_section">
        </section>
    `;

    page.innerHTML += `
        <section id="payments_event_history_section">
        </section>
    `;

    axios
        .get(`/api/payments/getPaymentsPaid/${user_id}`) // need to change
        .then((response) => {
            const paymentsHistory = response.data;
            const paymentHistorySection = document.getElementById('payment_history_section');

            paymentsHistory.forEach(payment => {
                let status = 'PAID - Confirmed';
                

                if(payment.paid_status && payment.received_status) {
                    paymentHistorySection.innerHTML += `
                        <p>${payment.event_name} | ${payment.due_date} | ${status}</p>
                    `
                }
            });
        })

    axios
        .get(`/api/payments/getPaymentsPaid/${user_id}`) // need to change
        .then((response) => {
            const paymentsHistory = response.data;
            const paymentHistorySection = document.getElementById('payment_history_section');

            paymentsHistory.forEach(payment => {
                let status = 'PAID - Confirmed';
                

                if(payment.paid_status && payment.received_status) {
                    paymentHistorySection.innerHTML += `
                        <p>${payment.event_name} | ${payment.due_date} | ${status}</p>
                    `
                }
            });
        })

        .catch((error) => {
            //ERROR handling
            return error;
        });
}
