//payment history
function renderPaymentHistory() {
    const session = getSession();
    user_id = session.user_id;

    const page = document.getElementById('page');
    page.innerHTML += `
    <section id="all-history-section">
        <h1>History</h1>
        <h6 style="color: red" id="displayError"></h6>
    </section>
    `;

    const displayError = document.querySelector('#displayError');

    let status;

    //this gets payments that have been completed, we will need to add in payments we have paid
    axios
        .get(`/api/payments/getPaymentsPaid/${user_id}`) // need to change
        .then((response) => {
            const paymentsHistory = response.data;

            if (paymentsHistory.length > 0) {
                const historySection = document.getElementById(
                    'all-history-section'
                );
                const paymentHistory = document.createElement('section');
                paymentHistory.setAttribute('id', 'payments_history_section');
                paymentHistory.innerHTML += `<h3>Payment History</h3>`;
                historySection.appendChild(paymentHistory);
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
                        <p>${payment.event_name} | ${
                        payment.username
                    } | ${moment(payment.due_date).format('D MMMM YYYY')} | ${
                        payment.amount
                    } | ${status}</p>
                    `;
                }
            });
        })
        .catch((error) => {
            clearErrors();
            const displayError = document.querySelector('#displayError');
            error = 'Error getting history, we hope to resolve this soon.';
            displayError.innerText = error;
        });
}
