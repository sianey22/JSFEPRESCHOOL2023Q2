const burgerButton = document.querySelector('.menu-burger-button');
const menuContainer = document.querySelector('.menu-icon-container');

const menuToggle = ()=> {
    menuContainer.classList.toggle('active');
};

burgerButton.addEventListener('click', menuToggle);

document.addEventListener('click', function(e){
    const withinBoundaries = e.composedPath().includes(menuContainer);
    if (menuContainer.classList.contains('active') && ! withinBoundaries) {
        menuToggle();
    };
});