// carousel
var currentPage = 0;
var pagesNumber = 0;

let goToPage = function(pageNumber) {
    currentPage = pageNumber;

    const items = document.querySelectorAll(".images-items img");
    const firstItem = items[0];
    const itemWith = getElementWidth(firstItem);

    const translateX = pageNumber * itemWith * -1;

    for (var i = 0; i < items.length; i++) {
        items[i].style.transform = "translateX(" + translateX + "px)";
    }

    refreshCarouselPagination();
}

let nextPage = function() {
    if (currentPage < pagesNumber - 1) {
        goToPage(parseInt(currentPage) + 1);
    }
}

let prevPage = function() {
    if (currentPage > 0) {
        goToPage(parseInt(currentPage) - 1);
    }
}

let updateCarousel = function() {
    drawCarouselPagination();
    goToPage(currentPage);
}

let refreshCarouselPagination = function() {
    const items = document.querySelectorAll(".carousel-pagination button");
    for (var i = 0; i < pagesNumber; i++) {
        items[i].classList.remove('carousel-button-active');
        items[i].classList.remove('carousel-button');

        if (items[i].getAttribute('order-number') == currentPage) {
            items[i].classList.add('carousel-button-active');
        } else {
            items[i].classList.add('carousel-button');
        }
    }
}

let drawCarouselPagination = function() {
    const carouselPagination = document.querySelector(".carousel-pagination");
    removeAllChildNodes(carouselPagination);

    const items = document.querySelectorAll(".images-items img");

    if (window.window.innerWidth <= 768) {
        pagesNumber = items.length;
    } else {
       pagesNumber = items.length - 1;
    }
    currentPage = 0;

    for (var i = 0; i < pagesNumber; i++) {
        const button = document.createElement("button");
        button.setAttribute('order-number', i);
        const div = document.createElement("div");
        div.classList.add('button-container');
        div.appendChild(button);
        carouselPagination.appendChild(div);

        button.addEventListener('click', function(e) {
            const orderNumber = this.getAttribute('order-number');
            goToPage(orderNumber);
            refreshCarouselPagination();
        });
    }

    refreshCarouselPagination();
}

let getElementWidth = function(element) {
    var style = element.currentStyle || window.getComputedStyle(element),
        width = element.offsetWidth, // or use style.width
        margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
        padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
        border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

    return width + margin - padding + border;
}

let removeAllChildNodes = function(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

drawCarouselPagination();
window.addEventListener("resize", updateCarousel);

document.querySelector(".about .prev-button").addEventListener("click", prevPage);
document.querySelector(".about .next-button").addEventListener("click", nextPage);