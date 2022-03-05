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
    `;

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
        .get(`/api/payments/getPaymentsOwingToMe/${user_id}`)
        .then((response) => {
            const payments = response.data;
            const paymentsOwingSection = document.getElementById(
                'payments_owing_section'
            );


            let table = document.createElement('table');
            table.setAttribute('id', 'paymentsOwingTable');
            let thead = document.createElement('thead');
            thead.setAttribute('id', 'paymentsOwingTableHead');
            let tbody = document.createElement('tbody');
            tbody.setAttribute('id', 'paymentsOwingTableBody');

            table.appendChild(thead);
            table.appendChild(tbody);

            let row_heading = document.createElement('tr');
            let heading_1 = document.createElement('th');
            heading_1.innerHTML = "Event Name";
            let heading_2 = document.createElement('th');
            heading_2.innerHTML = "Username";
            let heading_3 = document.createElement('th');
            heading_3.innerHTML = "Due Date";
            let heading_4 = document.createElement('th');
            heading_4.innerHTML = "Status";

            row_heading.appendChild(heading_1);
            row_heading.appendChild(heading_2);
            row_heading.appendChild(heading_3);
            row_heading.appendChild(heading_4);
            thead.appendChild(row_heading);


            payments.forEach((payment) => {
                if (payment.user_id !== payment.event_creator_id) {
                    let status = '';
                    if (!payment.paid_status && !payment.received_status) {
                        status = 'UNPAID';
                    } else if (
                        payment.paid_status &&
                        !payment.received_status
                    ) {
                        status = 'PAID - Payer Notified';
                    }
                    if (!payment.received_status) {

                        let row = document.createElement('tr');
                        let row_data_1 = document.createElement('td');
                        row_data_1.innerHTML = `${payment.event_name}`;
                        let row_data_2 = document.createElement('td');
                        row_data_2.innerHTML = `${payment.username}`;
                        let row_data_3 = document.createElement('td');
                        row_data_3.innerHTML = `${payment.due_date}`;
                        let row_data_4 = document.createElement('td');
                        row_data_4.innerHTML = `${status}`;

                        row.appendChild(row_data_1);
                        row.appendChild(row_data_2);
                        row.appendChild(row_data_3);
                        row.appendChild(row_data_4);
                        tbody.appendChild(row);
                    }
                }
            });
            paymentsOwingSection.appendChild(table);
        })
        .catch((error) => {
            clearErrors();
            displayError(error.response.data.message);
        });

    axios
        .get(`/api/payments/getPaymentsOwedToMe/${user_id}`)
        .then((response) => {
            const payments = response.data;
            const paymentsOwedToMe = document.getElementById(
                'payments_owed_to_me'
            );

            let table = document.createElement('table');
            table.setAttribute('id', 'paymentsOwingTable');
            let thead = document.createElement('thead');
            thead.setAttribute('id', 'paymentsOwingTableHead');
            let tbody = document.createElement('tbody');
            tbody.setAttribute('id', 'paymentsOwingTableBody');

            table.appendChild(thead);
            table.appendChild(tbody);

            let row_heading = document.createElement('tr');
            let heading_1 = document.createElement('th');
            heading_1.innerHTML = "Event Name";
            let heading_2 = document.createElement('th');
            heading_2.innerHTML = "Username";
            let heading_3 = document.createElement('th');
            heading_3.innerHTML = "Due Date";
            let heading_4 = document.createElement('th');
            heading_4.innerHTML = "Status";

            row_heading.appendChild(heading_1);
            row_heading.appendChild(heading_2);
            row_heading.appendChild(heading_3);
            row_heading.appendChild(heading_4);
            thead.appendChild(row_heading);


            payments.forEach((payment) => {
                if (payment.user_id !== payment.event_creator_id) {
                    let status = '';
                    if (!payment.paid_status && !payment.received_status) {
                        status = 'UNPAID';
                    } else if (
                        payment.paid_status &&
                        !payment.received_status
                    ) {
                        status = 'PAID - Payer Notified';
                    }
                    if (!payment.received_status) {


                        let row = document.createElement('tr');
                        let row_data_1 = document.createElement('td');
                        row_data_1.innerHTML = `${payment.event_name}`;
                        let row_data_2 = document.createElement('td');
                        row_data_2.innerHTML = `${payment.username}`;
                        let row_data_3 = document.createElement('td');
                        row_data_3.innerHTML = `${payment.due_date}`;
                        let row_data_4 = document.createElement('td');
                        row_data_4.innerHTML = `${status}`;

                        row.appendChild(row_data_1);
                        row.appendChild(row_data_2);
                        row.appendChild(row_data_3);
                        row.appendChild(row_data_4);
                        tbody.appendChild(row);

                    }
                }
                paymentsOwedToMe.appendChild(table);
            });
        })
        .catch((error) => {
            clearErrors();
            displayError(error.response.data.message);
        });
}

//paymentevent

function renderPaymentsEventForMainPage(session) {
    user_id = session.user_id; //Kyra is working on this// add code to get user id

    const page = document.getElementById('page');
    page.innerHTML += `
        <h1>Payments Events</h1>
    `;

    page.innerHTML += `
        <section id="payments_event_section">
        </section>
    `;

    let table = document.createElement('table');
    table.setAttribute('id', 'paymentsOwingTable');
    let thead = document.createElement('thead');
    thead.setAttribute('id', 'paymentsOwingTableHead');
    let tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'paymentsOwingTableBody');

    table.appendChild(thead);
    table.appendChild(tbody);

    let row_heading = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Event Name";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Creation Date";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Remaining";

    row_heading.appendChild(heading_1);
    row_heading.appendChild(heading_2);
    row_heading.appendChild(heading_3);
    thead.appendChild(row_heading);

    axios
        .get(`/api/paymentsEvent/getEventsByCreatorId/${user_id}`) // need to change
        .then((response) => {
            const paymentEvents = response.data;
            const paymentsEventSection = document.getElementById(
                'payments_event_section'
            );
            paymentEvents.forEach((paymentEvent) => {

                paymentsEventSection.innerHTML += `
                    <p>${paymentEvent.event_name} on ${paymentEvent.creation_date} | Remaining amount: ${paymentEvent.remaining_amount}</p>
                `;
            });
        })
        .catch((error) => {
            clearErrors();
            displayError(error.response.data.message);
        });
}
//payment history
function renderPaymentHistory(session) {
    user_id = session.user_id;

    const page = document.getElementById('page');
    page.innerHTML += `
        <h1>History</h1>
    `;

    let status;

    //this gets payments that have been completed, we will need to add in payments we have paid
    axios
        .get(`/api/payments/getPaymentsPaid/${user_id}`) // need to change
        .then((response) => {
            const paymentsHistory = response.data;

            if (paymentsHistory.length > 0) {
                page.innerHTML += `
                    <section id="payments_history_section">
                        <h3>Payment History</h3>
                    </section>
                `;
            }

            const paymentHistorySection = document.getElementById(
                'payments_history_section'
            );

            paymentsHistory.forEach((payment) => {
                status = 'PAID - Confirmed';
                if (
                    payment.paid_status &&
                    payment.received_status &&
                    payment.user_id !== payment.event_creator_id
                ) {
                    paymentHistorySection.innerHTML += `
                        <p>${payment.event_name} | ${payment.username} | ${payment.due_date} | ${payment.amount} | ${status}</p>
                    `;
                }
            });

        })
        .catch((error) => {
            clearErrors();
            displayError(error.response.data.message);
        });

    axios
        .get(`/api/paymentsEvent/getCompletedEvents/${user_id}`) // need to change
        .then((response) => {
            const paymentsEventHistory = response.data;

            if (paymentsEventHistory.length > 0) {
                page.innerHTML += `
                    <section id="payments_event_history_section">
                        <h3>Payment Event History</h3>
                    </section>
                `;
            }

            const paymentEventHistorySection = document.getElementById(
                'payments_event_history_section'
            );

            paymentsEventHistory.forEach((event) => {
                status = 'Completed';
                paymentEventHistorySection.innerHTML += `
                        <p>${event.event_name} | ${event.total_amount} | ${status}</p>
                    `;
            });
        })
        .catch((error) => {
            clearErrors();
            displayError(error.response.data.message);
        });
}
