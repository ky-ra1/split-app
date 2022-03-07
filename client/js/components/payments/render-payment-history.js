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
}
