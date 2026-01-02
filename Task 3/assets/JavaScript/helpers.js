// functions for creating a user
function createUser() {
    const createContainer = document.querySelector('.create-user');
    createContainer.style.display = 'flex';
}

function closeCreate() {
    document.querySelector('.create-user').style.display = 'none';
}


// functions for updating a user
function updateUser(id, name, email) {

    const updateContainer = document.querySelector('.update-user');

    updateContainer.style.display = 'flex';
    updateContainer.dataset.userId = id;

    document.getElementById('name').value = name;
    document.getElementById('email').value = email;

}

function closeUpdate() {
    document.querySelector('.update-user').style.display = 'none';
}
