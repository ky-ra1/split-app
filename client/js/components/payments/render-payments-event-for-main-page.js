//paymentevent

function renderPaymentsEventForMainPage(session) {
    user_id = session.user_id;

    const page = document.getElementById('page');
    page.innerHTML += `
        <h1>Payments Event</h1>
    `;

    page.innerHTML += `
        <section id="payments_event_section">
        </section>
    `;

    axios
        .get(`/api/paymentsEvent/getEventsByCreatorId/${user_id}`) // need to change
        .then((response) => {
            const paymentEvents = response.data;
            const paymentsEventSection = document.getElementById(
                'payments_event_section'
            );

            let table = document.createElement('table');
            table.setAttribute('id', 'paymentsEventTable');
            let thead = document.createElement('thead');
            thead.setAttribute('id', 'paymentsEventTableHead');
            let tbody = document.createElement('tbody');
            tbody.setAttribute('id', 'paymentsEventTableBody');

            table.appendChild(thead);
            table.appendChild(tbody);

            paymentsEventSection.appendChild(table);

            let row_heading = document.createElement('tr');
            let heading_1 = document.createElement('th');
            heading_1.innerHTML = 'Event Name';
            let heading_2 = document.createElement('th');
            heading_2.innerHTML = 'Creation Date';
            let heading_3 = document.createElement('th');
            heading_3.innerHTML = 'Remaining Amount';
            let heading_4 = document.createElement('th');
            heading_4.innerHTML = 'Status';
            let heading_5 = document.createElement('th');
            heading_5.innerHTML = 'Details';

            row_heading.appendChild(heading_1);
            row_heading.appendChild(heading_2);
            row_heading.appendChild(heading_3);
            row_heading.appendChild(heading_4);
            row_heading.appendChild(heading_5);
            thead.appendChild(row_heading);

            paymentEvents.forEach((paymentEvent) => {
                let row = document.createElement('tr');
                let row_data_1 = document.createElement('td');
                row_data_1.innerHTML = `${paymentEvent.event_name}`;
                let row_data_2 = document.createElement('td');
                row_data_2.innerHTML = `${moment(
                    paymentEvent.creation_date
                ).format('D MMMM YYYY')}`;
                let row_data_3 = document.createElement('td');
                row_data_3.innerHTML = `${paymentEvent.remaining_amount}`;

                let status = 'Incomplete';
                if(paymentEvent.completed) {
                    status = 'Complete';
                }

                let row_data_4 = document.createElement('td');
                row_data_4.innerHTML = `${status}`

                let row_data_5 = document.createElement('td');
                row_data_5.innerHTML = `<span class="event-details" identifier="${paymentEvent.id}">View More</span>`; 

                row.appendChild(row_data_1);
                row.appendChild(row_data_2);
                row.appendChild(row_data_3);
                row.appendChild(row_data_4);
                row.appendChild(row_data_5);
                tbody.appendChild(row);
            });
            setTimeout(() => {
                const events = document.querySelectorAll('.event-details');
                events.forEach((event) => {
                    event.addEventListener('click', (e) => {
                        renderPaymentEvent(
                            e.target.attributes.identifier.textContent
                        );
                    });
                });
            }, 1000);
        })
        .catch((error) => {
            clearErrors();
            // displayError(error.response.data.message);
        });
}
