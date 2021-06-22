class User {
    constructor(popName, popSurname, email, userId, userAdress, userDescription) {
        this.popName = popName;
        this.popSurname = popSurname;
        this.email = email;
        this.userId = userId;
        this.userAdress = userAdress;
        this.userDescription = userDescription;
    }
};

function popWindow(){
            const popUp = document.createElement('div');
            popUp.className = 'popUp col-sm-10 bg-white';
            document.querySelector('.users-container').appendChild(popUp)
            popUp.innerHTML =
                `<div class="poph">
                    <button class='btn btn-danger popUpclose'>x</button>
                </div>
                <div class="popcontent ">
                    <div class='popcontent-left'>
                        <form class='user-form'>
                            <div class='form-group'>
                                <label for="popName">Name</label>
                                <input class="popName form-control" placeholder='Name'> 
                            </div>
                            <div class='form-group'>
                                <label for="popSurname">Surname</label>
                                <input class="popSurname form-control" placeholder='Surname'>  
                            </div>
                            <div class='form-group'>
                            <label for="email">Email</label>
                            <input class="email form-control" placeholder='Email@...'>  
                        </div>
                        </form>
                    </div>    
                    <div class='popcontent-right'>
                        <form class='user-form'>
                            <div class='form-group'>
                                <label for="user-id">ID</label>
                                <input class="user-id form-control" placeholder='ID'> 
                            </div>
                            <div class='form-group'>
                                <label for="adress">Adress</label>
                                <input class="adress form-control" placeholder='Adress'> 
                            </div>
                            <div class='form-group'>
                                <label for="user-desc">Description</label>
                                <textarea class="user-desc form-control" placeholder='Description...'></textarea>
                            </div>
                        </form>
                    </div> 
                </div>
                <div class="popbuttonsh m-5 text-center">
                    <button class="btn btn-primary savePop m-2">Save</button>
                    <button class="btn btn-primary popCancelBtn m-2">Cancel</button>
                </div>`;
            document.querySelector('.poph').addEventListener('click', () => {
                popUp.remove();
            });
            document.querySelector('.popCancelBtn').addEventListener('click', () => {
                popUp.remove();
            });
}

function createPopUp() {
    popWindow();
    const savePop = document.querySelector('.savePop');
    const popUp = document.querySelector('.popUp');
    addUser(savePop, popUp);
};


//UI User handler
class UI {
    static displayUser() {
        const users = StoreUser.getUsers();
        users.forEach((user) => UI.addUserToList(user));
    };
    static addUserToList(user) {
        const userList = document.querySelector('.users-list-wrapper');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.popName}</td>
            <td>${user.popSurname}</td>
            <td>${user.email}</td>
            <td>${user.userId}</td>
            <td>${user.userAdress}</td>
            <td>${user.userDescription}</td>
            <td><a href="#" class="btn btn-success edit">Edit</a></td>
            <td><a href="#" class="btn btn-danger delete">delete</a></td>`;
        userList.appendChild(row);
    };

    static editUser(el) {
        if (el.classList.contains('edit')) {
            document.querySelector('.btn-create-user').addEventListener('click', createPopUp);
            popWindow();

            const edit = document.querySelector('.savePop');
            edit.innerText = 'Edit';

            const popName = document.querySelector('.popName');
            const popSurname = document.querySelector('.popSurname');
            const email = document.querySelector('.email');
            let userId = document.querySelector('.user-id');
            const userAdress = document.querySelector('.adress');
            const userDescription = document.querySelector('.user-desc');

            let userDescriptionV = el.parentElement.previousElementSibling.textContent;
            userDescription.innerText = userDescriptionV;
            let userAdressV = el.parentElement.previousElementSibling.previousElementSibling.textContent;
            userAdress.value = userAdressV;
            let userIdV = el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            userId.value = userIdV;
            let emailV = el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            email.value = emailV;
            let popSurnameV = el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
            popSurname.value = popSurnameV
            let popNameV = el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
            popName.value = popNameV

            const editpop = document.querySelector('.savePop');

            editpop.addEventListener('click', () => {
                let old = userIdV
                userDescriptionV = userDescription.value;
                userAdressV = userAdress.value;
                userIdV = userId.value;
                emailV = email.value;
                popSurnameV = popSurname.value;
                popNameV = popName.value;
                StoreUser.deleteUser(old);

                let user = new User(popNameV, popSurnameV, emailV, userIdV, userAdressV, userDescriptionV);
                el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent = popNameV;
                el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent = popSurnameV;
                el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent = emailV;
                el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent = userIdV;
                el.parentElement.previousElementSibling.previousElementSibling.textContent = userAdressV;
                el.parentElement.previousElementSibling.textContent = userDescriptionV;
                StoreUser.addUser(user);
                const popUp = document.querySelector('.popUp');
                popUp.remove();
            });
        };
    };

    static removeUser(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    };
};

class StoreUser {
    static getUsers() {
        let users;

        if (localStorage.getItem('users') === null) {
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    };
    static addUser(user) {
        const users = StoreUser.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users))
    };

    static deleteUser(userId) {
        const users = StoreUser.getUsers();
        users.forEach((user, index) => {
            if (user.userId === userId) {
                users.splice(index, 1)
            }
        });
        localStorage.setItem('users', JSON.stringify(users));
    };
};

//User add event
function addUser(savePop, popUp) {
    const popName = document.querySelector('.popName');
    const popSurname = document.querySelector('.popSurname');
    const email = document.querySelector('.email');
    const userId = document.querySelector('.user-id');
    const userAdress = document.querySelector('.adress');
    const userDescription = document.querySelector('.user-desc');
    savePop.addEventListener('click', () => {
        let popNameV = popName.value.trim();
        let popSurnameV = popSurname.value.trim();
        let emailV = email.value.trim();
        let userIdV = userId.value.trim();
        let userAdressV = userAdress.value.trim();
        let userDescriptionV = userDescription.value.trim();

        let user = new User(popNameV, popSurnameV, emailV, userIdV, userAdressV, userDescriptionV);

        //Add User to List
        UI.addUserToList(user);
        popUp.remove();

        //Add to Local Storage
        StoreUser.addUser(user);
    })
};


//Call users from local storage to UI
document.addEventListener('DOMContentLoaded', UI.displayUser);

//Event to edit user
document.querySelector('.users-list-wrapper').addEventListener('click', (e) => {
    UI.editUser(e.target);
})

//Event To delete user
document.querySelector('.users-list-wrapper').addEventListener('click', (e) => {
    UI.removeUser(e.target);
    let delID = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    StoreUser.deleteUser(delID)
});

//Event to PopUp Window
document.querySelector('.btn-create-user').addEventListener('click', createPopUp);

















