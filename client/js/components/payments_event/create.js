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

    <form id="users">
        <h1>User Breakdown</h1>
        <label for="user">User ${userCount}:</label><br>
        <input type="text" id="${userCount}" class="users" name="user"> 
        <label for="percentage">Percentage: </label>
        <input type="number" id="user" class="percentage" name="percentage">   
        <span id="display-${userCount}"></span>
        <button type="button" class="addUser">+</button><br>
    </form>
    
    <form id="submitButton">
        <button type="button" class="submitEvent">Submit</button>
    </form>`
    

    setupAddListener(userCount);
}

function setupAddListener(userCount) {
    const addUser = document.querySelectorAll('.addUser');
    const userForm = document.getElementById('users');

    addUser.forEach(button => {
        button.addEventListener('click', () => {
            const user = document.getElementById(`${userCount}`);
            let valid = checkValidity(user);

            userCount = userCount + 1;
            if(valid) {
                const error = document.getElementById('error');
                if(error) {
                    error.innerHTML = '';
                }

                userForm.innerHTML += `
                    <label for="${userCount}">User ${userCount}:</label><br>
                    <input type="text" id="${userCount}" class="users" name="user"> 
                    <label for="percentage">Percentage: </label>
                    <input type="number" id="user" class="percentage" name="percentage">   
                    <span id="display-${userCount}"></span>
                    <button type="button" class="addUser">+</button> <br>
                `
                setupAddListener(userCount++);
            } else {
                userForm.innerHTML += `
                <span id="error">Invalid</span>
                `
            }
        });
    });
}

function checkValidity(user) {
    //validate user with the user api 
    return true;
}