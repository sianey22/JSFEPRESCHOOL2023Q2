const burgerButton = document.querySelector('.menu-burger-button');
const menuContainer = document.querySelector('.menu-icon-container');
const menuItems = document.querySelectorAll('.nav-item');

const menuToggle = ()=> {
    menuContainer.classList.toggle('active');
};

burgerButton.addEventListener('click', menuToggle);

menuItems.forEach((item) => {
    item.addEventListener('click', menuToggle);
  });

document.addEventListener('click', function(e){
    const withinBoundaries = e.composedPath().includes(menuContainer);
    if (menuContainer.classList.contains('active') && ! withinBoundaries) {
        menuToggle();
    };
});