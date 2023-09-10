const burgerButton = document.querySelector('.menu-burger-button');
const menuContainer = document.querySelector('.menu-icon-container');
const menuItems = document.querySelectorAll('.nav-item');
const profileButton = document.querySelector('.icon-profile');

//Burger Menu
const menuToggle = ()=> {
    menuContainer.classList.remove('active-profile');
    menuContainer.classList.toggle('active');
};

burgerButton.addEventListener('click', menuToggle);

menuItems.forEach((item) => {
    item.addEventListener('click', menuToggle);
  });

// Profile Button
const profileToggle = ()=> {
    menuContainer.classList.remove('active');
    menuContainer.classList.toggle('active-profile');
};

profileButton.addEventListener('click', profileToggle);

document.addEventListener('click', function(e){
    const withinBoundaries = e.composedPath().includes(menuContainer);
    if (menuContainer.classList.contains('active') && ! withinBoundaries) {
        menuToggle();
    }
    if (menuContainer.classList.contains('active-profile') && ! withinBoundaries) {
        profileToggle();
    }
});

//Open and close modal window (logIn, signup)
const modalBackground = document.querySelector('.modals-background');
const modalLoginRegister = document.querySelectorAll('.window-log-reg');

const profileLoginButton = document.querySelector('.log-in');
const signUpButton = document.querySelector('.button-sign');
const loginButton = document.querySelector('.button-log')
const profileRegisterButton = document.querySelector('.register')
const closeModalButton = document.querySelectorAll('.close-btn')
const logRegLink = document.querySelectorAll('.log-reg-link')


const openModal = function(e){
    e.classList.remove('not-active');
    modalBackground.classList.remove('not-active');
    if(menuContainer.classList.contains('active-profile')){
        profileToggle();
    }
}

const closeModal=(e)=>{
    e.classList.add('not-active');
    modalBackground.classList.add('not-active');
}

const openAndClose=(e1, e2)=>{
    openModal(e1);
    closeModal(e2);
    modalBackground.classList.remove('not-active');
}

profileLoginButton.addEventListener('click',() =>openModal(modalLoginRegister[0]));
profileRegisterButton.addEventListener('click', ()=>openModal(modalLoginRegister[1]))

loginButton.addEventListener('click',() =>openModal(modalLoginRegister[0]));
signUpButton.addEventListener('click', ()=>openModal(modalLoginRegister[1]))

logRegLink[0].addEventListener('click',() =>openAndClose(modalLoginRegister[1], modalLoginRegister[0]));
logRegLink[1].addEventListener('click',() =>openAndClose(modalLoginRegister[0], modalLoginRegister[1]));

for (let i=0; i<2; i++){
    closeModalButton[i].addEventListener('click',()=>closeModal(modalLoginRegister[i]));
    modalBackground.addEventListener('click',()=>closeModal(modalLoginRegister[i]))
}

