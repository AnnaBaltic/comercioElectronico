//Definicion de un arreglo de productos
const products = [
    { id: 1, nombre: 'Laptop', precio: 1000000},
    { id: 2, nombre: 'Smartphone', precio: 600000},
    { id: 3, nombre: 'Tablet', precio: 300000},
    { id: 4, nombre: 'Auriculares', precio: 50000},
    { id: 5, nombre: 'Smartwatch', precio: 200000},
    { id: 6, nombre: 'Teclado', precio: 40000},
    { id: 7, nombre: 'Mouse', precio: 25000},
    { id: 8, nombre: 'Monitor', precio: 150000},
    { id: 9, nombre: 'Impresora', precio: 120000},
    { id: 10, nombre: 'Cámara', precio: 250000},
];

// rreglo de carrito de compras
const cart = [];

// Referencias a los elementos del DOM
const productContainer = document.getElementById('products');
const cartContainer = document.getElementById('cart');
const notificationsContainer = document.getElementById('notifications');
const filterInput = document.getElementById('filter');

// Función para renderizar los productos
function renderProducts(filter = '') {
    productContainer.innerHTML = ''; // Limpiar el contenedor
    // Filtramos los productos 
    const filteredProducts = products.filter(product =>
        product.nombre.toLowerCase().includes(filter.toLowerCase())
    );
// Crear un elemento HTML por cada producto filtrado
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <span>${product.nombre} - $${product.precio}</span>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Función para renderizar los productos en el carrito
function renderCart() {
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.nombre} - $${item.precio}</span>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Función para mostrar una notificación en la página
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    notificationsContainer.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}


// Función para agregar un producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        renderCart();
        showNotification(`Se agregó "${product.nombre}" al carrito.`);
    }
}

// Funcion para eliminar producto del carrito
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        const removedProduct = cart.splice(index, 1)[0];
        renderCart();
        showNotification(`El producto se eliminó "${removedProduct.nombre}" del carrito.`);
    }
}

// Filtrar productos
filterInput.addEventListener('input', (e) => {
    renderProducts(e.target.value);
});

renderProducts();