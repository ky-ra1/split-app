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

                  
                    page.innerHTML = `<div class="container">              
                    <h4 style="text-align: center; color: red; margin: 30px" id="displayError"></h4>                
                        <!-- Main content -->
                        <div class="h-screen flex-grow-1 overflow-y-lg-auto">
                            
                            <!-- Main -->
                            <main class="py-6 bg-surface-secondary">
                                <div class="container-fluid">
                                    <!-- Card stats -->
                                    <div class="card shadow border-0 mb-7">
                                        <div class="card-header">
                                            <h5 class="mb-0">Event Details</h5>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-hover table-nowrap">
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th scope="col">Event Creator:</th>
                                                        <th scope="col">Sent To:</th>
                                                        <th scope="col">Date:</th>
                                                        <th scope="col">Amount:</th>
                                                        <th scope="col">Status:</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${response.data.rows.map((item) => {

                                                        return `<tr>
                                                        <td> ${
                                                            users[item.event_creator_id].username}</td>
                                                        <td> ${
                                                            users[item.user_id].username
                                                        }</td>
                                                        <td> $${item.amount}</td>
                                                        <td> ${moment(item.due_date).format(
                                                            'D MMMM YYYY'
                                                        )}</td>
                                                        <td> ${
                                                            item.paid_status && item.received_status
                                                                ? 'paid <span class="badge badge-lg badge-dot"> <i class="bg-success"></i></span>'
                                                                : 'not paid <span class="badge badge-lg badge-dot"> <i class="bg-danger"></i></span> '
                                                        }</td>
                                                    </tr>`
                                                    }).join("")}
                                                   
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                   `;
                    
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
};

