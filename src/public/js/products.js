const socket = io();

socket.on('productAdded', product => {
    const productList = document.getElementById('product-list');
    const productItem = document.createElement('li');
    productItem.innerHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Precio: $${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <p>Categoría: ${product.category}</p>
        <p>Estado: ${product.status}</p>
        <input type="number" id="quantity-${product._id}" min="1" value="1">
        <button onclick="addToCart('${product._id}')">Agregar al carrito</button>
    `;
    productList.appendChild(productItem);
});

async function addToCart(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);

    try {
        const response = await fetch('/api/carts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Producto agregado al carrito exitosamente');
        } else {
            alert(`Error al agregar el producto al carrito: ${result.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar el producto al carrito');
    }
}

const filterForm = document.getElementById('filter-form');
filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(filterForm);
    const queryString = new URLSearchParams(formData).toString();
    fetch(`/products?${queryString}`)
        .then(response => response.text())
        .then(html => {
            document.documentElement.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});