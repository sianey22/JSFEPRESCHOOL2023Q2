let getUsers = function() {
    let users = localStorage.getItem('users');
    if (users == null) {
        users = [];
    } else {
        users = JSON.parse(users);
    }

    return users;
}

let logOut = function() {
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('currentUserEmail', null);

    menuContainer.classList.remove('active');
    document.querySelector('.profile-with-auth').style.display = "none";
    document.querySelector('.profile-without-auth').style.display = "block";
    menuContainer.classList.toggle('active-profile');

    document.querySelector('.profile-in').style.display = "none";
    document.querySelector('.icon-profile img').style.display = "block";
}

let signUp = function(data) {
    const found = findUserByEmail(data.email);
    if (found != null && found == true) {
        console.log('Пользователь с таким email уже зарегистрирован');
        return;
    }

    const newUser = {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        password: data.password,
        cardNumber: data.card_number,
        visits: 1
    }

    let users = getUsers();
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    logIn({ email: newUser.email, password: newUser.password });
}

let findUserByEmail = function(email) {
    let users = getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            return users[i];
        }
    }
}

let logIn = function(data) {
    let users = getUsers();

    let user = null;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == data.email && users[i].password == data.password) {
            user = users[i];
            break;
        }
    }

    if (user == null) {
        localStorage.setItem('isLoggedIn', false);
        console.log('Неверные email или пароль!');
    } else {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('currentUserEmail', user.email);

        user.visits = user.visits + 1;
        users[i] = user;
        localStorage.setItem('users', JSON.stringify(users));

        console.log(user);

        document.querySelector('.modal-profile .profile-initials span').textContent = user.firstName.substring(0, 1) + user.lastName.substring(0, 1);
        document.querySelector('.modal-profile .profile-name span').textContent = user.firstName + ' ' + user.lastName;
        document.querySelector('.profile-in span').textContent = user.firstName.substring(0, 1) + user.lastName.substring(0, 1);
        document.querySelector('.profile-in').style.display = "block";
        document.querySelector('.icon-profile img').style.display = "none";
        document.querySelector('.profile-without-auth').style.display = "none";
        document.querySelector('.profile-with-auth').style.display = "block";
        document.querySelector('.card-numb').textContent = user.cardNumber;
        document.querySelector('.option-numb.visits').textContent = user.visits;

        document.querySelector('.profile-in').setAttribute('title', user.firstName + " " + user.lastName);
        document.querySelector('.profile-with-auth .profile-title').textContent = user.cardNumber;

        document.querySelector('.copy-button').addEventListener('click', ()=>navigator.clipboard.writeText(user.cardNumber))

    }

    const closeBtn = document.querySelector('.window-sign-up .close-btn');
    const closeBtn2 = document.querySelector('.window-log-in .close-btn');
    closeBtn.click();
    closeBtn2.click();
}

let isLoggedIn = function() {
    const foundIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (foundIsLoggedIn == null) {
        return false;
    } else {
        return foundIsLoggedIn;
    }
}

if(isLoggedIn==false){
    buyButton.forEach((item) => {
        item.addEventListener('click', () =>openModal(modalLoginRegister[0]));
        item.addEventListener('click',() =>openModal(modalLoginRegister[0]));
      });
} else {
    console.log('dddd')
    console.log(isLoggedIn())
    buyButton.forEach((item) => {
        item.addEventListener('click', () =>openModal(document.querySelector('.modal-buy-card')));
        item.addEventListener('click',() =>openModal(document.querySelector('.modal-buy-card')));
      });
    closeModalButton[3].addEventListener('click', ()=>closeModal(document.querySelector('.modal-buy-card')))
    modalBackground.addEventListener('click',()=>closeModal(document.querySelectorAll('.modal')[1]));
}

let getLoggedInUser = function() {
    if (!isLoggedIn()) {
        return null;
    } else {
        return findUserByEmail(localStorage.getItem('currentUserEmail'));
    }
}

let initAuth = function() {
    const signUpInputs = document.querySelectorAll('.sign-up-form .modal-input');
    const signUpForm = document.querySelector('.sign-up-form');
    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var formData = {};

        formData.card_number = getRandomHex(9);

        for (var i = 0; i < signUpInputs.length; i++) {
            formData[signUpInputs[i].name] = signUpInputs[i].value;
        }

        //console.log('formData', formData);
        signUp(formData);
    });

    const logInInputs = document.querySelectorAll('.log-in-form .modal-input');
    const logInForm = document.querySelector('.log-in-form');
    logInForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var formData = {};

        for (var i = 0; i < logInInputs.length; i++) {
            formData[logInInputs[i].name] = logInInputs[i].value;
        }

        console.log('formData', formData);
        logIn({ email: formData.email, password: formData.password });
    });

    const logOutButton = document.querySelector('.log-out-btn');
    logOutButton.addEventListener('click', function(e) {
        logOut();
    });

    // NOTE: Nastya - открыть профайл
}

let getRandomHex = function(size) {
  let result = [];
  let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join('');
}

let refreshHtml = function() {
    if (isLoggedIn()) {
        const loggedInUser = getLoggedInUser();
        if (loggedInUser != null) {
            logIn({ email: loggedInUser.email, password: loggedInUser.password });
        }
    }
}

console.log('getUsers', getUsers());
console.log('isLoggedIn', isLoggedIn());
//console.log('getLoggedInUser', getLoggedInUser());

initAuth();
refreshHtml();

// logOut();
// localStorage.removeItem('users');
// console.log('очистка закончена!');