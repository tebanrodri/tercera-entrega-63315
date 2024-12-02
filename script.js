const productos = [
    { nombre: "Anillo 1", imagen:"img/productos/anillo-carita-luminoso-x-36.jpg", precio: 47365.14, descripcion: "Anillo con carita , luminoso x 36 unidades." },
    { nombre: "Anillo 2", imagen: "img/productos/anillo-carita-smile-luminoso-x-36.jpeg", precio: 47365.14, descripcion: "Anillo carita SMILE luminoso x 36." },
    { nombre: "Anillo 3", imagen:"img/productos/anillo-colores-luminoso-fibra-optica-x-4.jpg", precio: 3742.36, descripcion: "ANILLO LUMINOSO CON FIBRA OPTICA X 4." },
    { nombre: "Anillo 4", imagen: "img/productos/anillo-colores-luminoso-surtido-x-36.jpg", precio: 47365.14, descripcion: "Anillos colores luminosos surtidos x 36" },
    { nombre: "Anillo 5", imagen:"img/productos/anillo-fluo-luminoso-36.jpg", precio: 47365.12, descripcion: "Anillo Fluo Luminoso x 36" },
    { nombre: "Anteojo 1", imagen: "img/productos/anteojo-quimico-aviador-luminoso.jpg", precio: 985.23, descripcion: "ANTEOJO QUIMICO AVIADOR GLOW FLUO X 1" },
    { nombre: "Anteojo 2", imagen: "img/productos/anteojo-quimico-lenon-x-1.jpg", precio: 1022.91, descripcion: "ANTEOJO QUIMICO LENNON GLOW FLUO X 1" },
    { nombre: "Anteojo 3", imagen: "img/productos/anteojo-quimico-luminoso-x-1.jpg", precio: 1037.68, descripcion: "ANTEOJO QUIMICO CORAZON GLOW FLUO X 1" },
    { nombre: "Antifaz 1", imagen: "img/productos/antifaz-gibre-arcoiris.jpg", precio: 2485.75, descripcion: "MASCARA ANTIFAZ COLORES ARCO IRIS GIBREADA HS8678 X 1" },
    { nombre: "Antifaz 2", imagen:  "img/productos/antifaz-gibriado-pelota-futbol.jpg", precio: 2665.15, descripcion: "ANTIFAZ GIBREADO PELOTA DE FUTBOL HS6885 X 1" },
    { nombre: "Antifaz 3", imagen: "img/productos/antifaz-negro-con-fleco.jpg", precio: 4330.77, descripcion: "ANTIFAZ NEGRO C/FLECO HOLOGRAFICO HS3026-3 X 1" },
    { nombre: "Collar 1", imagen: "img/productos/collar-quimico-tri-color-x-15.jpg", precio: 8565.48, descripcion: "COLLAR QUIMICO TRICOLOR X 25" },
    { nombre: "Mascara 1", imagen: "img/productos/mascara-gibre-mariposa.jpg", precio: 8815.29, descripcion: "ANTIFAZ MASCARA MARIPOSA CON GIBRE 79189 X 5" },
    { nombre: "Mascara 2", imagen: "img/productos/mascara-metalizado-tela-araña.jpg", precio: 3638.86, descripcion: "ANTIFAZ METALIZADO TELARAÑA PLATA 74551/M X 5" },
    { nombre: "Peluca 1", imagen: "img/productos/peluca-afro-amarilla-x-1.jpg", precio: 6504.46, descripcion: "PELUCA AFRO SUPER AMARILLO HS7530-5 X 1" },
    { nombre: "Peluca 2", imagen: "img/productos/peluca-afro-blanca-x-1.jpg", precio: 6504.46, descripcion: "PELUCA AFRO blanca HS7534-5 X 1" },
    { nombre: "Peluca 3", imagen: "img/productos/peluca-afro-payaso-x-1.jpg", precio: 8113.87, descripcion: "PELUCA AFRO PAYASO MULTICOLOR X 1" },
    { nombre: "Pulcera 1", imagen: "img/productos/pulcera-quimica-x-50.jpg", precio: 4615.86, descripcion: "PULSERA QUIMICA X 50" },
];

const carrito = [];
const productCardsContainer = document.getElementById("productCards");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const cartElement = document.getElementById("carrito");
const finalizePurchaseButton = document.getElementById("finalizePurchaseButton");

// Mostrar productos destacados
function mostrarProductosDestacados() {
    productCardsContainer.innerHTML = "";
    productos.forEach(producto => {
        const card = crearCardProducto(producto);
        productCardsContainer.appendChild(card);
    });
}

//tarjeta de producto
function crearCardProducto(producto) {
    const col = document.createElement("div");
    col.classList.add("col-md-4", "mb-4");
    col.innerHTML = `
        <div class="card h-100">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text"><strong>$${producto.precio.toFixed(2)}</strong></p>
                <button class="btn btn-primary agregar-carrito">Agregar al carrito</button>
            </div>
        </div>`;
    col.querySelector('.agregar-carrito').addEventListener('click', () => {
        agregarAlCarrito(producto);
        mostrarMensaje("Producto agregado al carrito.");
    });
    return col;
}

// Agrega producto al carrito
function agregarAlCarrito(producto) {
    const item = carrito.find(p => p.nombre === producto.nombre);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

// Actualiza carrito
function actualizarCarrito() {
    cartItems.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;

        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `
            ${item.nombre} - $${item.precio.toFixed(2)} x ${item.cantidad}
            <div class="d-flex justify-content-end">
                <button class="btn btn-sm btn-success me-2" onclick="modificarCantidad(${index}, 1)">+</button>
                <button class="btn btn-sm btn-danger" onclick="modificarCantidad(${index}, -1)">-</button>
            </div>`;
        cartItems.appendChild(li);
    });

    totalPrice.textContent = total.toFixed(2);

    // Mostrar/ocultar botón "Finalizar compra"
    finalizePurchaseButton.style.display = carrito.length > 0 ? "block" : "none";
}

// Modifica cantidad
function modificarCantidad(index, delta) {
    carrito[index].cantidad += delta;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    actualizarCarrito();
}

// Mostrar mensaje 
function mostrarMensaje(mensaje) {
    const messageBox = document.createElement("div");
    messageBox.classList.add("alert", "alert-success", "text-center", "position-fixed", "top-50", "start-50", "translate-middle", "w-50");
    messageBox.textContent = mensaje;
    document.body.appendChild(messageBox);
    setTimeout(() => messageBox.remove(), 500);
}

// Finalizar compra
finalizePurchaseButton.addEventListener("click", () => {
    if (carrito.length === 0) {
        mostrarMensaje("El carrito está vacío.");
        return;
    }

    finalizePurchaseButton.style.display = "none";

    cartItems.innerHTML = `
        <li class="list-group-item text-center">
            <h5>Total: $${totalPrice.textContent}</h5>
            <button class="btn btn-primary mt-3" id="payButton">Pagar</button>
        </li>`;

    // para botón "Pagar"
    document.getElementById("payButton").addEventListener("click", () => {
        mostrarMensaje("¡Gracias por tu compra!");
        carrito.length = 0;
        actualizarCarrito();
        finalizePurchaseButton.style.display = "none";
        cartElement.style.right = "-400px";
    });
});

// Mostrar/ocultar carrito
document.getElementById("showCartButton").addEventListener("click", (e) => {
    e.stopPropagation();
    cartElement.style.right = cartElement.style.right === "0px" ? "-400px" : "0px";
});

// Evita que el carrito desaparezca al usar botones + o -
cartItems.addEventListener("click", (e) => {
    e.stopPropagation();
});

// Oculta carrito al hacer clic fuera
document.addEventListener("click", (e) => {
    if (!cartElement.contains(e.target) && e.target.id !== "showCartButton") {
        cartElement.style.right = "-400px";
    }
});

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductosDestacados();
    actualizarCarrito();
});



