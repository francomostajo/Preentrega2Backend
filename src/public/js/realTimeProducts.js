const socket = io();
const divListaProductos = document.getElementById('list-products');


document.addEventListener('DOMContentLoaded', () => {
    const formProduct = document.getElementById('formProduct');
    const deleteButton = document.getElementById('delete-btn');

    formProduct.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formProduct);
        const title = formData.get('title');
        const description = formData.get('description');
        const price = formData.get('price');
        const code = formData.get('code');
        const stock = formData.get('stock');
        const thumbnail = formData.get('thumbnail');
        const category = formData.get('category');
        const status = formData.get('status') === 'on'; // Check if checkbox is checked

        socket.emit('nuevoProducto', {title, description, price, code, stock, thumbnail, category, status});

        formProduct.reset(); // Reset form after submission
    });

    deleteButton.addEventListener('click', async () => {
        const id = document.getElementById('id-prod').value;
        socket.emit('eliminarProducto', id);
    });
});

socket.on('productos', productos => {
    divListaProductos.innerHTML = '';
    productos.forEach(producto => {
        const p = document.createElement('p');
        const btnEliminar = document.createElement('button');

        btnEliminar.innerHTML = 'Eliminar';
        btnEliminar.addEventListener('click', () => {socket.emit('eliminarProducto', producto.id)});
        p.innerHTML = `<strong>ID: </strong>${producto.id}, <strong>Title: </strong>${producto.title}, <strong>Description: </strong>${producto.description},
        <strong>Price: </strong>${producto.price}, <strong>Code: </strong>${producto.code},
        <strong>Stock: </strong>${producto.stock}`;
        divListaProductos.appendChild(p);
        divListaProductos.appendChild(btnEliminar);
    });
});

socket.on('respuestaAdd', mensajeRespuesta => {
    const mensaje = document.createElement('p');
    mensaje.innerHTML = `<strong>${mensajeRespuesta}</strong>`;
    divListaProductos.appendChild(mensaje);
});

socket.on('respuestaDelete', mensajeRespuesta => {
    const mensaje = document.createElement('p');
    mensaje.innerHTML = `<strong>${mensajeRespuesta}</strong>`;
    divListaProductos.appendChild(mensaje);
});