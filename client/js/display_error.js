// function displayError(errorText) {
//     const errorElement = document.createElement('p');
//     errorElement.setAttribute('id', 'error');
//     errorElement.innerHTML = errorText;
//     page.appendChild(errorElement);
// }

function clearErrors() {
    const error = document.getElementById('error');
    if (error) {
        error.remove();
    }
}
