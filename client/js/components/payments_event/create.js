const renderCreatePaymentEventList = () => {
    const session = getSession();
    const page = document.getElementById('page');
    let userCount = 1;

    // get rid of all br tags after styling

    page.innerHTML = `
    <h1 id="page-title">CREATE PAYMENT EVENT</h1>
    <div class="container mx-auto">
    <div class="d-flex-center">
    <form id="eventDetails">

        <label for="eventName">Event Name:</label><br>
        <input type="text" id="eventName" name="eventName" required><br>
        <label for="description">Description:</label><br>
        <input type="text" id="description" name="description" required><br>    
        <label for="totalAmount">Total Amount:</label><br>
        <input type="number" id="totalAmount" name="totalAmount" required><br>
        <label for="dueDate">Due Date:</label><br>
        <input type="text" id="dueDate" name="dueDate" required>  
        
        <h4>User Breakdown</h4>
        <span>Click to add user</span>
        <button id="add-user" class="addUser-${userCount}"><i class="material-icons" style="">group_add</i>
        </button><br>

        <span>Click to delete the last user field</span>
        <button onclick="removeUser()"  id="delete_user_button" class="delete_user"><span class="material-icons">group_remove</span></button>
        
        <div id="add-user-section">

                <section class="user-section">
                <div class="row">
                    <div class="col">
                        <label for="user">User ${userCount}:</label><br>
                         <input type="text" id="${userCount}" class="user" name="user" value="${
        getSession().username
    }" readonly> 
                    </div>
                    <div class="col">
                        <label for="percentage">Percentage: </label>
                        <input type="number" id="percentage-${userCount}" class="percentage" name="percentage">   
                        <span id="display-${userCount}"></span><br>
                    </div>
                    
                </div>
                </section>

        </div>
        <p style="color: red" id="displayError"></p>
        <button class="btn-block btn-color" type="submit">Submit</button>
        <p style="color: #EC7D10; font-size: 13px" >Every field is required</p>
    </form>
    </div>
    </div>`;

    new Pikaday({
        field: document.getElementById('dueDate'),
        format: 'DD MMMM YYYY',
    });

    //////////////////

    // + button
    const addUserButton = document.querySelector('#add-user');
    addUserButton.addEventListener('click', (event) => {
        event.preventDefault();
        clearErrors();

        // get input of user
        let user = document.getElementById(`${userCount}`);

        // check valid user or not
        let valid = true;

        if (valid) {
            // no errors
            const error = document.getElementById('error');
            if (error) {
                error.innerHTML = '';
            }

            addUserForm();
        } else {
            userForm.innerHTML += `
                <span id="error">Invalid</span>
                `;
        }

        // add user count when clicked on
        userCount += 1;
    });

    const displayError = document.querySelector('#displayError');

    const form = document.getElementById('eventDetails');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const eventNameField = document.querySelector('input[name=eventName]');
        const totalAmountField = document.querySelector(
            'input[name=totalAmount]'
        );
        const descriptionField = document.querySelector(
            'input[name=description]'
        );
        const dueDateField = document.querySelector('input[name=dueDate]');

        const percentageData = [];

        let error = null;

        // gets each user data
        const allUserForm = document.querySelectorAll('.user-section');
        const userData = [];
        allUserForm.forEach((user) => {
            const data = {};
            data['user'] = user.querySelector('input[name=user]').value;
            data['percentage'] = parseInt(
                user.querySelector('input[name=percentage]').value
            );
            data['amount'] =
                (parseInt(user.querySelector('input[name=percentage]').value) /
                    100) *
                parseInt(totalAmount.value);

            if (data['user'] == '') {
                error = 'Please enter a valid username';
            }

            userData.push(data);

            percentageData.push(data['percentage']);
        });

        const validPercentage = validatePercentage(percentageData);

        const body = {
            event_name: eventNameField.value,
            total_amount: totalAmountField.value,
            event_creator_id: session.user_id,
            description: descriptionField.value,
            creation_date: new Date(),
            due_date: moment(dueDateField.value).toISOString(),
            payments: userData,
            // all payments in array
        };

        if (body.event_name === '') {
            error = 'Event Name is required';
        } else if (body.description === '') {
            error = 'Description is required';
        } else if (body.due_date === null) {
            error = 'Due Date is required';
        } else if (body.event_name.length > 20) {
            error = 'Event Name has to be under 20 characters';
        } else if (moment(body.due_date).isBefore(new Date())) {
            error = 'Due Date has to be in the future';
        } else if (body.total_amount === '') {
            error = 'Total Amount is required';
        }

        if (validPercentage) {
            clearPercentageError();
            // need to validate the payment user fields with percentage above
            if (!error) {
                axios
                    .post('/api/paymentsEvent', body)
                    .then((response) => {
                        const updateBody = {
                            user_id: session.user_id,
                            event_id: response.data.id,
                        };
                        axios
                            .patch('/api/payments/updateBothStatus', updateBody)
                            .then((response) => {
                                mainPageElement(session);
                            })
                            .catch((error) => {
                                clearErrors();
                                displayError.innerText =
                                    error.response.data.message;
                            });
                    })
                    .catch((error) => {
                        clearErrors();
                        displayError.innerText = error.response.data.message;
                    }); //update endpoint
            } else {
                clearErrors();
                displayError.innerText = error;
            }
        } else {
            clearErrors();
            error = 'Invalid Percentage Total/Percentage is required';
            displayError.innerText = error;
        }
    });
};

function addUserForm() {
    let userCount = document.getElementsByClassName('user').length + 1;
    const userForm = document.getElementById(`add-user-section`);

    // create a section for each
    let section = document.createElement('section');
    section.setAttribute('class', 'user-section');
    section.setAttribute('id', `delete_user_section${userCount}`);

    userForm.appendChild(section);

    let divRow = document.createElement('div');
    divRow.setAttribute('class', 'row eachline');
    section.appendChild(divRow);

    let divCol = document.createElement('div');
    divCol.setAttribute('class', 'col');
    divRow.appendChild(divCol);

    let userLabel = document.createElement('label');
    userLabel.setAttribute('for', userCount);
    userLabel.innerHTML = `User ${userCount}:`;
    divCol.appendChild(userLabel);

    let breakTag = document.createElement('br');
    section.appendChild(breakTag);

    let userInput = document.createElement('input');
    userInput.setAttribute('type', 'text');
    userInput.setAttribute('id', userCount);
    userInput.setAttribute('class', 'user');
    userInput.setAttribute('name', 'user');
    divCol.appendChild(userInput);

    let divCol2 = document.createElement('div');
    divCol2.setAttribute('class', 'col');
    divRow.appendChild(divCol2);

    let percentageLabel = document.createElement('label');
    percentageLabel.setAttribute('for', `percentage-${userCount}`);
    percentageLabel.innerHTML = `Percentage: `;
    divCol2.appendChild(percentageLabel);

    let percentageInput = document.createElement('input');
    percentageInput.setAttribute('type', 'number');
    percentageInput.setAttribute('id', `percentage-${userCount}`);
    percentageInput.setAttribute('class', 'percentage');
    percentageInput.setAttribute('name', 'percentage');
    divCol2.appendChild(percentageInput);

    // // add delete buttons each line

    // let divCol3 = document.createElement('div');
    // divCol3.setAttribute('class', 'col col-lg-2 col align-self-end');
    // divRow.appendChild(divCol3);
    // let deleteUserButton = document.createElement('div');
    // deleteUserButton.innerHTML = `<button onclick="removeUser()"  id="delete_user_button" class="delete_user">Delete User</button>`;
    // divCol3.appendChild(deleteUserButton);
    // //

    section.appendChild(breakTag);
}

function clearPercentageError() {
    const displayedErrorPercentage =
        document.getElementById('error-percentage');
    if (displayedErrorPercentage) {
        displayedErrorPercentage.remove();
    }
}

function removeUser() {
    let sections = document.getElementsByClassName('user-section');
    console.log(sections.length);

    var elem = document.getElementById(`delete_user_section${sections.length}`);
    console.log(elem);

    elem.parentNode.removeChild(elem);
    return false;
}
