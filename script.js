const botonesAñadir = document.querySelectorAll(".botonAñadir");
const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("total");
const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
let carrito = [];

botonesAñadir.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        const precioProductos = [100000, 90000, 60000, 40000, 35000];
        const titulosProductos = ["BOCA JUNIORS 22/23", "RIVER PLATE 22/23", "INDEPENDIENTE 22/23", "RACING CLUB 22/23", "SAN LORENZO 22/23"];
        const producto = {
            nombre: titulosProductos[index],
            precio: precioProductos[index]
        };

        const productoExistente = carrito.find(item => item.nombre === producto.nombre);
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            producto.cantidad = 1;
            carrito.push(producto);
        }

        mostrarCarrito();
        mostrarTotal();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    });
});

vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    mostrarCarrito();
    mostrarTotal();
    localStorage.removeItem("carrito");
});

function mostrarCarrito() {
    listaCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - Precio: $${(producto.precio * producto.cantidad).toFixed(2)} (${producto.cantidad}x)`;
        listaCarrito.appendChild(li);
    });
}

function mostrarTotal() {
    const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCarrito.textContent = `$${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const storedCart = localStorage.getItem("carrito");
    if (storedCart) {
        carrito = JSON.parse(storedCart);
        mostrarCarrito();
        mostrarTotal();
    }
});


const comprarCarritoBtn = document.getElementById("comprarCarrito");

comprarCarritoBtn.addEventListener("click", () => {
    Swal.fire({
        title: 'Confirmar compra',
        text: '¿Estás seguro de realizar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
        
            simulatePurchase()
                .then(() => {
                    Swal.fire({
                        title: 'Compra realizada',
                        text: '¡Gracias por tu compra!',
                        icon: 'success',
                        confirmButtonText: 'Cerrar'
                    });
                })
                .catch(() => {
                    Swal.fire({
                        title: 'Error en la compra',
                        text: 'Hubo un error al procesar la compra.',
                        icon: 'error',
                        confirmButtonText: 'Cerrar'
                    });
                });
        }
    });
});

function simulatePurchase() {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        
            const purchaseSuccessful = true;
            if (purchaseSuccessful) {
                resolve();
            } else {
                reject();
            }
        }, 1000); 
    });
}

fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        const botonesAñadir = document.querySelectorAll(".botonAñadir");
        
       
        botonesAñadir.forEach((boton, index) => {
            boton.addEventListener("click", () => {
                const producto = data[index];
                
               
            });
        });
    })
    .catch(error => console.error('Error cargando los datos: ', error));