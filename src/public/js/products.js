const socket = io();

// Emit message to server
socket.emit('message', "Comunicacion desde web Socket!");

// Listen for 'productAdded' event and update the product list
socket.on('productAdded', product => {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.textContent = `${product.title} - ${product.description} - ${product.price} - ${product.category} - ${product.status}`;
    const button = document.createElement('button');
    button.textContent = "Agregar al carrito";
    button.onclick = () => addToCart(product._id);
    li.appendChild(button);
    ul.appendChild(li);
});

// Handle filter button click
document.getElementById('filter-button').addEventListener('click', () => {
    const category = document.getElementById('category-select').value;
    const sort = document.getElementById('price-sort').value;
    const availability = document.getElementById('availability-select').value;
    const url = new URL(window.location.href);
    url.searchParams.set('category', category);
    url.searchParams.set('sort', sort);
    url.searchParams.set('availability', availability);
    window.location.href = url.toString();
});

function addToCart(productId) {
    // Lógica para agregar al carrito
    console.log(`Producto ${productId} agregado al carrito`);
}


