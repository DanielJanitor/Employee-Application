/*                             Author: Daniel Janitor                               */
/*                             Year: 2021 - June                                    */ 
/*                             Application: EMPLOYEE MANAGEMENT APPLICATION         */
/*                             USER INTERFACE JAVASCRIPT                            */

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

/* UI User handler */
class UI {
    static createPopUp() {
        UI.popWindow();
        const savePop = document.querySelector('.savePop');
        const popUp = document.querySelector('.popUp');
        UI.userInputs(savePop, popUp);
    };
    static popWindow() {
        const popUp = document.createElement('div');
        popUp.className = 'popUp col-sm-10 bg-white';
        document.querySelector('.users-container').appendChild(popUp)
        popUp.innerHTML =
            `<div class="poph">
                <button class='btn btn-danger popUpclose'>x</button>
            </div>
            <div class="popcontent">
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
                <button class="btn btn-secondary popCancelBtn m-2">Cancel</button>
            </div>`;
        document.querySelector('.poph').addEventListener('click', () => {
            popUp.remove();
        });
        document.querySelector('.popCancelBtn').addEventListener('click', () => {
            popUp.remove();
        });
    };
    static userInputs(savePop, popUp) {
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

            UI.addUserToList(user);
            StoreUser.addUser(user);
            popUp.remove();
        })
    };
    static addUserToList(user) {
        const userList = document.querySelector('.users-list-wrapper');
        const rowcard = document.createElement('tr');
        rowcard.className = 'card rowcard ';
        rowcard.innerHTML = `
            <h5 class = 'card-list item'>${user.popName}</h5>
            <h5 class = 'card-list'>${user.popSurname}</h5>
            <td>${user.email}</td>
            <td>${user.userId}</td>
            <td>${user.userAdress}</td>
            <td>${user.userDescription}</td>
            <td><a href="#" class="btn btn-primary edit">Edit</a></td>
            <td><a href="#" class="btn btn-secondary delete">delete</a></td>`;
        userList.appendChild(rowcard);
    };
    static displayUser() {
        const users = StoreUser.getUsers();
        users.forEach((user) => UI.addUserToList(user));
    };
    static editUser(el) {
        if (el.classList.contains('edit')) {
            document.querySelector('.btn-create-user').addEventListener('click', UI.createPopUp);
            UI.popWindow();

            document.querySelector('.savePop').innerText = 'Edit';
            const popName = document.querySelector('.popName');
            const popSurname = document.querySelector('.popSurname');
            const email = document.querySelector('.email');
            let userId = document.querySelector('.user-id');
            const userAdress = document.querySelector('.adress');
            const userDescription = document.querySelector('.user-desc');

            let userDescriptionV = el.parentElement.previousElementSibling.textContent;
            userDescription.value = userDescriptionV;
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
                document.querySelector('.popUp').remove();
            });
        };
    };
    static removeUser(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    };
    static statistics() {
        let users = StoreUser.getUsers();
        let number = users.length;
        document.querySelector('.totalUsers').innerText = number;
    };

    static searchInput(e) {
        const itemsSearch = document.querySelectorAll('tr');
        const q = e.target.value;

        itemsSearch.forEach(item => {
            console.log(item.textContent);
            item.querySelector('h5').textContent.toLowerCase().startsWith(q)
                ? item.style.display = ''
                : item.style.display = 'none';
        })
    }
};
/*  STORE CLASS */
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
        UI.statistics()
    };
    static deleteUser(userId) {
        const users = StoreUser.getUsers();
        users.forEach((user, index) => {
            if (user.userId === userId) {
                users.splice(index, 1)
            }
        });
        localStorage.setItem('users', JSON.stringify(users));
        UI.statistics()
    };
};
/*  EVENTS */
document.addEventListener('DOMContentLoaded', UI.displayUser);
document.addEventListener('DOMContentLoaded', UI.statistics);
document.querySelector('.users-list-wrapper').addEventListener('click', (e) => { UI.editUser(e.target); });
document.querySelector('.users-list-wrapper').addEventListener('click', (e) => {
    UI.removeUser(e.target);
    StoreUser.deleteUser(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});
document.querySelector('.btn-create-user').addEventListener('click', UI.createPopUp);
document.querySelector('.search').addEventListener('keyup', (e) => { UI.searchInput(e) })
















