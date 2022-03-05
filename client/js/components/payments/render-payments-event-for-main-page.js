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
