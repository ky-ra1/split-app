function addSelectListeners() {
    const selectElements = document.querySelectorAll('.selectPaymentOwing');

    for(let i = 0; i < selectElements.length; i++) {
        selectElements[i].addEventListener('change', (event) => {
            // event.target.value;


            //send id; status - event.target.value
            // boolean
                //true if changing to paid
                //false if changing to unpaid

            const body = {
                id: parseInt(event.target.attributes.identifier.textContent),
                paid_status: false
            }

            axios
                .patch('/api/payments/updatePaidStatus', body) 
                .then(response => {
                    event.value.value = 'PAID'
                    event.value.text = 'PAID'
                })
                .catch(error => {
                    //do some erroring things
                });
        });
    }
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

            paymentsOwingSection.appendChild(table);

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
                        
                        const selectList = document.createElement('select');
                        selectList.classList.add('selectPaymentOwing');
                        selectList.setAttribute('identifier', payment.payments_id)

                        row_data_4.appendChild(selectList);

                        let optionOne = document.createElement('option');
                        let optionTwo = document.createElement('option');
                        optionOne.value = 'PAID';
                        optionOne.text = 'PAID';
                        optionTwo.value = 'UNPAID';
                        optionTwo.text = 'UNPAID';

                        if(status === 'PAID') {
                            selectList.add(optionOne, null);
                            selectList.add(optionTwo, null);
                        } else {
                            selectList.add(optionTwo, null);
                            selectList.add(optionOne, null);
                        }

                        row.appendChild(row_data_1);
                        row.appendChild(row_data_2);
                        row.appendChild(row_data_3);
                        row.appendChild(row_data_4);
                        tbody.appendChild(row);
                    }
                }
            });
            
            setTimeout(() => {
                addSelectListeners()
            }, 1000);
        })
        .catch((error) => {
            clearErrors();
            // displayError(error.response.data.message);
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
            });
            paymentsOwedToMe.appendChild(table);
        })
        .catch((error) => {
            clearErrors();
            displayError(error.response.data.message);
        });
}
