function renderPaymentEvent(event_id) {
    const page = document.getElementById('page');

    axios
        .get(`/api/paymentEvents/getByCreatorId/${event_id}`)
        .then((response) => {
            page.innerHTML += `
                <div>
                    <h1>${response.data[0].event_name}</h1>
                    <p>Total Amount: ${response.data[0].total_amount}</p>
                `;

            response.data.forEach((item) => {
                page.innerHTML += `
                    <div>
                        <p>Created by: ${item.event_creator_id}</p>
                        <p>Amount: ${item.amount}</p>
                        <p>Due Date: ${item.due_date}</p>
                        <p>Paid: ${
                            item.paid_status && item.received_status
                                ? 'paid'
                                : 'not paid'
                        }</p>
                    </div>
                `;
            });
            page.innerHTML += `<div>`;
        })
        .catch((error) => {
            clearErrors();
            displayError(error.response.data.message);
        });
}
