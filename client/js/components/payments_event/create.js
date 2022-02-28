const renderCreatePaymentEventList = () => {
    const page = document.getElementById('page');
    let userCount = 1;

    page.innerHTML = `
    <h1>Add Payment Event</h1>
    <form id="eventDetails">
        <label for="eventName">Event Name:</label><br>
        <input type="text" id="eventName" name="eventName"><br>
        <label for="description">Description:</label><br>
        <input type="text" id="description" name="description"><br>    
        <label for="totalAmount">Total Amount:</label><br>
        <input type="number" id="totalAmount" name="totalAmount"> 
    </form>

    <form id="users" onsubmit="return false">
        <h1>User Breakdown</h1>
        <label for="user">User ${userCount}:</label><br>
        <input type="text" id="${userCount}" class="user" name="user"> 
        <label for="percentage">Percentage: </label>
        <input type="number" id="user" class="percentage" name="percentage">   
        <span id="display-${userCount}"></span>
        <button type="button" class="addUser-${userCount}">+</button><br>
    </form>
    
    <form id="submitButton">
        <button class="submitEvent">Submit</button>
    </form>`
    

    setupAddListener();
}

function setupAddListener() {
    let userCount = document.getElementsByClassName('user').length;
    const addUser = document.querySelector(`.addUser-${userCount}`);
    const userForm = document.getElementById('users');

    addUser.addEventListener('click', (event) => {
            event.preventDefault();
            const user = document.getElementById(`${userCount}`);
            // let valid = checkValidity(user.value);
            let valid = true;

            userCount = userCount + 1;
            if(valid) {
                const error = document.getElementById('error');
                if(error) {
                    error.innerHTML = '';
                }

                addUserForm();

                setupAddListener();
            } else {
                userForm.innerHTML += `
                <span id="error">Invalid</span>
                `
            }
        });
}

function addUserForm() {
    let userCount = document.getElementsByClassName('user').length + 1;
    const userForm = document.getElementById(`users`);
    let userLabel = document.createElement("label");
    userLabel.setAttribute("for", userCount);
    userLabel.innerHTML = `User: ${userCount}`;
    userForm.appendChild(userLabel);

    let breakTag = document.createElement('br');
    userForm.appendChild(breakTag);

    let userInput = document.createElement('input');
    userInput.setAttribute("type", "text");
    userInput.setAttribute('id', userCount);
    userInput.setAttribute('class', 'user');
    userInput.setAttribute('name', 'user');
    userForm.appendChild(userInput);

    let percentageLabel = document.createElement("label");
    percentageLabel.setAttribute("for", `percentage-${userCount}`);
    percentageLabel.innerHTML = `Percentage: `;
    userForm.appendChild(percentageLabel); 
    
    let percentageInput = document.createElement('input');
    percentageInput.setAttribute("type", "number");
    percentageInput.setAttribute('id', 'user');
    percentageInput.setAttribute('class', 'percentage');
    percentageInput.setAttribute('name', 'percentage');
    userForm.appendChild(percentageInput);    

    let button = document.createElement("button");
    button.setAttribute('type', 'button');
    button.appendChild(document.createTextNode("+"));
    button.setAttribute('class', `addUser-${userCount}`);
    userForm.appendChild(button);

    userForm.appendChild(breakTag);
}

function checkValidity(user) {
    //validate user with the user api 
    return true;
}