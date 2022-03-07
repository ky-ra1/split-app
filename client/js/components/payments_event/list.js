function renderPaymentEvent(event_id) {
    const page = document.getElementById('page');

    axios
        .get(`/api/paymentsEvent/getByEventId/${event_id}`)
        .then((response) => {
            console.log(`asdas`, response.data);
            page.innerHTML = `
                <div>
                    <h1>${response.data.rows[0].event_name}</h1>
                    <p>Total Amount: ${response.data.rows[0].total_amount}</p>
                `;
            response.data.rows.forEach((item) => {
                page.innerHTML += `
                    <div>
                        <p>Created by: ${item.event_creator_id}</p>
                        <p>User: ${item.user_id}</p>
                        <p>Amount: ${item.amount}</p>
                        <p>Due Date: ${moment(item.due_date).format(
                            'D MMMM YYYY'
                        )}</p>
                        <p>Paid: ${
                            item.paid_status && item.received_status
                                ? 'paid'
                                : 'not paid'
                        }</p>
                    </div>
                `;
            });
            page.innerHTML += `</div>`;
        })
        .catch((error) => {
            clearErrors();
            // displayError(error.response.data.message);
        });
}
