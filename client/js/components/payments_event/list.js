function renderPaymentEvent(event_id) {
    const page = document.getElementById('page');

    axios
        .get(`/api/paymentsEvent/getByEventId/${event_id}`)
        .then((response) => {
            axios
                .get(`/api/users/`)
                .then((usersResponse) => {
                    const users = {};

                    usersResponse.data.forEach((user) => {
                        users[user.id] = {
                            id: user.id,
                            username: user.username,
                        };
                    });

                    page.innerHTML = `
                <div>
                    <h4 style="text-align: center; color: red; margin: 30px" id="displayError"></h4>
                    <h1>${response.data.rows[0].event_name}</h1>
                    <p>Total Amount: $ ${response.data.rows[0].total_amount}</p>
                `;

                    let table = document.createElement('table');
                    let thead = document.createElement('thead');
                    let tbody = document.createElement('tbody');
                    tbody.setAttribute('id', 'paymentEvent');

                    table.appendChild(thead);
                    table.appendChild(tbody);

                    page.appendChild(table);

                    let row_heading = document.createElement('tr');
                    let heading_1 = document.createElement('th');
                    heading_1.innerHTML = 'Created By';
                    let heading_2 = document.createElement('th');
                    heading_2.innerHTML = 'User';
                    let heading_3 = document.createElement('th');
                    heading_3.innerHTML = 'Amount';
                    let heading_4 = document.createElement('th');
                    heading_4.innerHTML = 'Due Date';
                    let heading_5 = document.createElement('th');
                    heading_5.innerHTML = 'Status';

                    row_heading.appendChild(heading_1);
                    row_heading.appendChild(heading_2);
                    row_heading.appendChild(heading_3);
                    row_heading.appendChild(heading_4);
                    row_heading.appendChild(heading_5);
                    thead.appendChild(row_heading);

                    response.data.rows.forEach((item) => {
                        let row = document.createElement('tr');
                        let row_data_1 = document.createElement('td');
                        row_data_1.innerHTML = `${
                            users[item.event_creator_id].username
                        }`;
                        let row_data_2 = document.createElement('td');
                        row_data_2.innerHTML = `${
                            users[item.user_id].username
                        }`;
                        let row_data_3 = document.createElement('td');
                        row_data_3.innerHTML = `${item.amount}`;
                        let row_data_4 = document.createElement('td');
                        row_data_4.innerHTML = `${moment(item.due_date).format(
                            'D MMMM YYYY'
                        )}`;
                        let row_data_5 = document.createElement('td');
                        row_data_5.innerHTML = `${
                            item.paid_status && item.received_status
                                ? 'paid'
                                : 'not paid'
                        }`;

                        row.appendChild(row_data_1);
                        row.appendChild(row_data_2);
                        row.appendChild(row_data_3);
                        row.appendChild(row_data_4);
                        row.appendChild(row_data_5);
                        tbody.appendChild(row);
                    });
                })
                .catch((error) => {
                    clearErrors();
                    const displayError =
                        document.querySelector('#displayError');
                    displayError.innerText = error.response.data.message;
                });
        })
        .catch((error) => {
            clearErrors();
            const displayError = document.querySelector('#displayError');
            displayError.innerText = error.response.data.message;
        });
}
