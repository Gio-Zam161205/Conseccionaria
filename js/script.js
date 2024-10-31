document.addEventListener('DOMContentLoaded', () => {
    // Variables de configuración para el slider de productos
    const productContainerWidth = document.querySelector('.product-cards-container').offsetWidth;
    const productCardWidth = 260; // Ancho fijo de cada tarjeta
    const productCardsPerRow = Math.floor(productContainerWidth / (productCardWidth + 10)); // Cantidad de tarjetas visibles
    const marginSpacing = (productContainerWidth - (productCardsPerRow * productCardWidth)) / (productCardsPerRow - 1);

    document.querySelectorAll('.product-section').forEach((section) => {
        let firstVisibleIndex = 0;
        const productCards = section.querySelectorAll('.product-card');

        const updateVisibleCards = () => {
            // Ocultamos todas las tarjetas al comenzar
            productCards.forEach((card) => card.classList.remove('active'));

            // Mostramos solo las tarjetas visibles
            for (let i = 0; i < productCardsPerRow; i++) {
                const cardIndex = firstVisibleIndex + i;
                if (productCards[cardIndex]) {
                    productCards[cardIndex].classList.add('active');
                    productCards[cardIndex].style.marginRight = (i === productCardsPerRow - 1) ? '0px' : `${marginSpacing}px`;
                }
            }
        };

        // Inicializar las tarjetas visibles al cargar la página
        updateVisibleCards();

        // Configuración de botones de "prev" y "next"
        const prevButton = section.querySelector('.prev-button');
        const nextButton = section.querySelector('.next-button');

        prevButton.addEventListener('click', () => {
            if (firstVisibleIndex > 0) {
                firstVisibleIndex--;
                updateVisibleCards();
            }
        });

        nextButton.addEventListener('click', () => {
            if (firstVisibleIndex + productCardsPerRow < productCards.length) {
                firstVisibleIndex++;
                updateVisibleCards();
            }
        });
    });

    // Referencia a la barra de navegación
    const navBar = document.querySelector('#navbar'); // Ajusta el selector según tu HTML

    function navScroll() {
        if (window.scrollY > 0) {
            navBar.style.boxShadow = '0 5px 20px rgba(190, 190, 190, 0.15)';
            navBar.style.backgroundColor = 'white';
        } else {
            navBar.style.boxShadow = 'none';
            navBar.style.backgroundColor = 'transparent';
        }
    }

    // Escuchar el evento de scroll para actualizar la barra de navegación
    window.addEventListener('scroll', navScroll);

    // Menú de la barra
    const menuBar = document.querySelector('#menu-bar');
    const menuPage = document.querySelector('#menu-page');
    const html = document.querySelector('html');

    let menuBarStyle = window.getComputedStyle(menuBar);
    let screenType = '';

    if (menuBarStyle.display === "flex") {
        screenType = "mobile";
    } else if (menuBarStyle.display === "none") {
        screenType = "desktop";
    } else {
        console.log("Error: error failure");
    }

    menuBar.addEventListener('click', () => {
        menuPage.classList.toggle('active');

        if (menuPage.classList.contains('active')) {
            html.style.overflow = "hidden";
        } else {
            html.style.overflow = "auto";
        }
    });

    // Contadores de wishlist
    const wishListCounts = document.querySelectorAll('#wishlist-link span, #menu-tools .wishlist-link span');
    const heartButtons = document.querySelectorAll('.heart-button');

    heartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const activeCount = document.querySelectorAll('.heart-button.active').length;
            wishListCounts.forEach(count => count.innerHTML = activeCount);
        });
    });

    // Contadores de carrito y actualización de texto de botón
    const cartCounts = document.querySelectorAll('#cart-link span, #menu-tools .cart-link span');
    const cartButtons = document.querySelectorAll('.product-card .blue-button');

    cartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');

            // Cambia el texto del botón
            if (button.innerHTML.trim() === "Agregar al carrito") {
                button.innerHTML = "Remover";
            } else {
                button.innerHTML = "Agregar al carrito";
            }

            // Actualiza el contador de carrito en ambas versiones
            const activeCartCount = document.querySelectorAll('.product-card .blue-button.active').length;
            cartCounts.forEach(count => count.innerHTML = activeCartCount);
        });
    });
});
