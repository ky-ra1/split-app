const renderCreatePaymentEventList = (session) => {
    const page = document.getElementById('page');
    let userCount = 1;

    // get rid of all br tags after styling

    page.innerHTML = `
    <h1>Add Payment Event</h1>
    <form id="eventDetails">
        <label for="eventName">Event Name:</label><br>
        <input type="text" id="eventName" name="eventName"><br>
        <label for="description">Description:</label><br>
        <input type="text" id="description" name="description"><br>    
        <label for="totalAmount">Total Amount:</label><br>
        <input type="number" id="totalAmount" name="totalAmount"><br>
        <label for="dueDate">Due Date:</label><br>
        <input type="date" id="dueDate" name="dueDate">  
        
        <div id="add-user-section">
            <h1>User Breakdown</h1>
            <span>Click to add user</user>
            <button id="add-user" class="addUser-${userCount}">+</button><br>
            <label for="user">User ${userCount}:</label><br>
            <input type="text" id="${userCount}" class="user" name="user"> 
            <label for="percentage">Percentage: </label>
            <input type="number" id="user" class="percentage" name="percentage">   
            <span id="display-${userCount}"></span><br>
        </div>

        <button type="submit" class="submitEvent">Submit</button>
    </form>`;

    // + button
    const addUserButton = document.querySelector('#add-user');
    addUserButton.addEventListener('click', (event) => {
        event.preventDefault();
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

        const paymentsEventBody = {
            event_name: eventNameField.value,
            total_amount: totalAmountField.value,
            event_creator_id: session.user_id,
            description: descriptionField.value,
            creation_date: new Date(),
            due_date: dueDateField.value,
        };

        // payments body to send for axios
        // axios request
    });
};

function addUserForm() {
    let userCount = document.getElementsByClassName('user').length + 1;
    const userForm = document.getElementById(`add-user-section`);
    let userLabel = document.createElement('label');
    userLabel.setAttribute('for', userCount);
    userLabel.innerHTML = `User ${userCount}:`;
    userForm.appendChild(userLabel);

    let breakTag = document.createElement('br');
    userForm.appendChild(breakTag);

    let userInput = document.createElement('input');
    userInput.setAttribute('type', 'text');
    userInput.setAttribute('id', userCount);
    userInput.setAttribute('class', 'user');
    userInput.setAttribute('name', 'user');
    userForm.appendChild(userInput);

    let percentageLabel = document.createElement('label');
    percentageLabel.setAttribute('for', `percentage-${userCount}`);
    percentageLabel.innerHTML = `Percentage: `;
    userForm.appendChild(percentageLabel);

    let percentageInput = document.createElement('input');
    percentageInput.setAttribute('type', 'number');
    percentageInput.setAttribute('id', 'user');
    percentageInput.setAttribute('class', 'percentage');
    percentageInput.setAttribute('name', 'percentage');
    userForm.appendChild(percentageInput);

    userForm.appendChild(breakTag);
}
