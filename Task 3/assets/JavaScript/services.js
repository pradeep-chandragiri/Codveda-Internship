const api = 'http://localhost:3000/api/users'

// function for fetching users
async function fetchData() {

    try {

        // Fetch data from the API
        const res = await fetch(`${api}/get-all`);

        // Check if the response is ok
        if(!res.ok){
            throw new Error('Error while fetching the data.')
        }

        // Parse the JSON data & extract users
        const data = await res.json();
        const users = data.users;
        
        // Get the container element
        const dataElement = document.getElementById("data-container");
        dataElement.innerHTML = "";

        // Loop through each user and create HTML elements
        users.forEach(user => {

            const coverLetter = user.name.charAt(0).toUpperCase();

            // Append user data to the container
            dataElement.innerHTML += `
                <div class="user-container" style="cursor: pointer;">
                    <div class="user-details">
                            <div class="user-photo">
                                <div class="cover">
                                    <h1>${coverLetter}</h1>
                                </div>
                            </div>
                            <div class="user-info">
                                <h3>${user.name}</h3>
                                <p>${user.email}</p>
                            </div>
                        </div>
                        <div class="user-options">
                            <button 
                                onclick="updateUser(${user.id}, '${user.name}', '${user.email}')">
                                Update
                            </button>
                            <button onclick="deleteUser(${user.id})">Delete</button>
                        </div>
                    </div>
                </div>
            `

        });
        
    } catch (error) {
        console.log('Error occured: ', error.message);
    }

}

// function for creating a new user
async function submitCreate(e) {

    // stop page reload
    e.preventDefault();

    const nameInput = document.getElementById('new-name');
    const emailInput = document.getElementById('new-email');

    const createContainer = document.querySelector('.create-user');

    if (!nameInput || !emailInput || !createContainer) {
        console.error('Create form elements not found');
        return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
        alert('Please fill all fields');
        return;
    }

    
    try {

        const res = await fetch(`${api}/new`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email
            })
        });

        if(!res.ok){
            throw new Error('Error while creating the data!');
        }

        alert('User created successfully!');
        nameInput.value = '';
        emailInput.value = '';
        createContainer.style.display = 'none';
        fetchData();
        
        
    } catch (error) {
        console.log('Error occured: ', error.message);
    }

}

// function for updating a user
async function submitUpdate(e) {

    // stop page reload
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const updateContainer = document.querySelector('.update-user');
    const id = updateContainer.dataset.userId;
    
    try {

        const res = await fetch(`${api}/update/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email
            })
        });

        if(!res.ok){
            throw new Error('Error while updating the data!');
        }

        alert('User details updated successfully!');
        updateContainer.style.display = 'none';
        fetchData();
        
        
    } catch (error) {
        console.log('Error occured: ', error.message);
    }

}

// function for deleting a user
async function deleteUser(id) {

    try {
        
        const res = await fetch(`${api}/delete/${id}`, {
            method: 'DELETE'
        });

        if(!res.ok){
            throw new Error('Error while deleting the user.!')
        }

        // Refresh the data after deletion
        fetchData();

    } catch (error) {
        console.log('Error occured: ', error.message);
    }

}

fetchData();