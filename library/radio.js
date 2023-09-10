const initFavorites = function() {
    const buttons = document.querySelectorAll('.seasons-container .radiobutton');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            showBooksContainer(this.value);
        });
    }
}

const showBooksContainer = function(selected) {
    const booksContainers = document.querySelectorAll('div.books-container');
    for (var i = 0; i < booksContainers.length; i++) {
        booksContainers[i].classList.remove('active');
        if (i == selected) {
            booksContainers[i].classList.add('active');
        }
    }
}

initFavorites();