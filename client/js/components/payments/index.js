//payments owed

function mainPageElement() {
    const page = document.getElementById('page'); //need to change
    const main_page = document.createElement('div');
    page.replaceChildren(main_page);
    renderPayments();
    renderPaymentsEventForMainPage();
    renderPaymentHistory();
}

function renderPayments() {
    user_id = req.session.user_id; //Kyra is working on this// add code to get user id

    // const page = document.getElementById('page'); //need to change
    // const main_page = document.createElement('div');
    // page.replaceChildren(main_page);

    axios
        .get(`/api/payments/${user_id}`) // need to change
        .then((response) => {
            const payments = response.data;
            let paymentsDiv = document.createElement('div');
            main_page.appendChild(paymentsDiv).innerHTML += `
        <section id="main_payments">
            <h1>${payments}</h1>
        </section>
            
        `;
        })
        .catch((error) => {
            //ERROR handling
            return error;
        });
}

//paymentevent

function renderPaymentsEventForMainPage() {
    user_id = req.session.user_id; //Kyra is working on this// add code to get user id

    // const page = document.getElementById('page'); //need to change
    // const main_page = document.createElement('div');
    // page.replaceChildren(main_page);

    axios
        .get(`/api/payments/${user_id}`) // need to change
        .then((response) => {
            const paymentsEvent = response.data;
            let paymentsEventDiv = document.createElement('div');
            main_page.appendChild(paymentsEventDiv).innerHTML += `
        <section id="main_payments_event">
            <h1>${paymentsEvent}</h1>
        </section>
            
        `;
        })
        .catch((error) => {
            //ERROR handling
            return error;
        });
}
//payment history
function renderPaymentHistory(user_id) {
    user_id = req.session.user_id; //Kyra is working on this// add code to get user id

    // const page = document.getElementById('page'); //need to change
    // const main_page = document.createElement('div');
    // page.replaceChildren(main_page);

    axios
        .get(`/api/payments/${user_id}`) // need to change
        .then((response) => {
            const paymentsHistory = response.data;
            let paymentsHistoryDiv = document.createElement('div');
            main_page.appendChild(paymentsHistoryDiv).innerHTML += `
        <section id="main_payments_history">
            <h1>${paymentsHistory}</h1>
        </section>
            
        `;
        })
        .catch((error) => {
            //ERROR handling
            return error;
        });
}
