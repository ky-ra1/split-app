function renderHeader(session = {}) {
    const header = document.querySelector('#header-nav');

    if (session.email) {
        header.innerHTML = `       
        <div class="w-100 border fixed-top py-2">
            <a
                class="btn float-start d-inline offcanvas_btn"
                href="#sidebar_left"
                role="button"
                aria-controls="sidebar_left"
            >
                <img
                    src="https://cdn.dribbble.com/users/2763870/screenshots/6940332/s_split_dribbble_grid.png"
                    data-bs-target="#sidebar_left"
                    data-bs-toggle="offcanvas"
                    class="img-fluid hlogo rounded"
                    width="50"
                />
            </a>
            
            <div class="clearfix"></div>
        </div>
        <div
            class="offcanvas offcanvas-start"
            tabindex="-1"
            id="sidebar_left"
            aria-labelledby="offcanvasExampleLabel"
        >
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                    Split App
                </h5>
                <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body">
                <div>Split is awesome.</div>
                <ul id="navlist" class="nav flex-column">
                    <li id="main-page" class="nav-item">
                        <a class="nav-link active" href="#">Home</a>
                    </li>
                    <li id="payment-event" class="nav-item">
                        <a class="nav-link" href="#">Create Payment Event</a>
                    </li>
                    <li onClick="logout()" class="nav-item">
                        <a class="nav-link" href="#">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
        <div id="test login"></div>

    `;
        document
            .querySelector('#payment-event')
            .addEventListener('click', () => {
                renderCreatePaymentEventList(session);
            });
        document.querySelector('#main-page').addEventListener('click', () => {
            mainPageElement(session);
        });
    } else {
        header.innerHTML = `       
         <div class="w-100 border fixed-top py-2">
            <a
                class="btn float-start d-inline offcanvas_btn"
                href="#sidebar_left"
                role="button"
                aria-controls="sidebar_left"
            >
                <img
                    src="https://cdn.dribbble.com/users/2763870/screenshots/6940332/s_split_dribbble_grid.png"
                    data-bs-target="#sidebar_left"
                    data-bs-toggle="offcanvas"
                    class="img-fluid hlogo rounded"
                    width="50"
                />
            </a>
           
            <div class="clearfix"></div>
        </div>
        <div
            class="offcanvas offcanvas-start"
            tabindex="-1"
            id="sidebar_left"
            aria-labelledby="offcanvasExampleLabel"
        >
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                    Split App
                </h5>
                <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body">
                <div>Split is awesome.</div>
                <ul id="navlist" class="nav flex-column">
                     <li onClick="renderSignupForm()" class="nav-item">
                        <a class="nav-link" href="#">Sign Up</a>
                    </li>
                    <li onClick="renderLoginForm()" class="nav-item">
                        <a class="nav-link" href="#">Login</a>
                    </li>
                </ul>
            </div>
        </div>
        <div id="test login"></div>

    `;
    }
}
// nav bar list and functions need to be updated
