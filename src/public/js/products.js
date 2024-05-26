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
    `;
    productList.appendChild(productItem);
});

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
