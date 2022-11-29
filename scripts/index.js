// MOCK DE DATOS
const productos = [{ id: 1, titulo: "producto 1", imagen: "https://picsum.photos/400/500", precio: 1500, cantidad: 0, stock: 10 },
{ id: 2, titulo: "producto 2", imagen: "https://picsum.photos/400/500", precio: 1500, cantidad: 0, stock: 10 },
{ id: 3, titulo: "producto 3", imagen: "https://picsum.photos/400/500", precio: 1500, cantidad: 0, stock: 0 },
{ id: 4, titulo: "producto 4", imagen: "https://picsum.photos/400/500", precio: 1500, cantidad: 0, stock: 10 },
{ id: 5, titulo: "producto 5", imagen: "https://picsum.photos/400/500", precio: 1500, cantidad: 0, stock: 10 },
{ id: 6, titulo: "producto 6", imagen: "https://picsum.photos/400/500", precio: 1500, cantidad: 0, stock: 30 },
{ id: 7, titulo: "producto 7", imagen: "https://picsum.photos/400/500", precio: 1500, cantidad: 0, stock: 10 },
{ id: 8, titulo: "producto 8", imagen: "https://picsum.photos/400/500", precio: 1500, cantidad: 0, stock: 10 },
{ id: 9, titulo: "producto 9", imagen: "https://picsum.photos/400/500", precio: 1500, cantidad: 0, stock: 10 },]
// DECLARACION DE VARIABLES CON ELEMENTOS DEL DOM
let carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []
const $main = document.querySelector("main")
const $inputNombre = document.querySelector("#nombre")
const $btnNombre = document.querySelector("#btn-ingresoNombre")
const $titulo = document.querySelector(".titulo")
const $form = document.querySelector("#formName")
const $cardContainer = document.querySelector("#card-container")
const $contenedor = document.querySelector("#contenedor")
const $errorForm = document.querySelector("#errorForm")
const $navbar = document.querySelector("nav")
const $navContainer = document.querySelector("#navContainer")
const $cerrarSesion = document.querySelector("#cerrarSesion")
const $carritoImg = document.createElement("img")
const $modal = document.querySelector(".modal")
const $buttonCerar = document.querySelector(".buttonCerrar")
const $tbody = document.querySelector("tbody")

 // LOGICA, STORAGE Y FUNCIONES
$carritoImg.className = "cartImg"
$carritoImg.setAttribute("src", "../media/cart.png")
if (localStorage.getItem("nombre")) {
    $form.className += "d-block"
    $navbar.className = "navbar fixed-top navbar-dark bg-primary"
    const nombre = localStorage.getItem("nombre")
    $titulo.innerHTML = `Bienvenid@ ${nombre}!`
    $form.className += " d-none"
    $contenedor.className = "my-5 bg-light d-flex flex-column justify-content-center align-items-center rounded"
    productos.forEach(producto => {
        const cardDiv = document.createElement("div")
        cardDiv.className = `card m-3`
        cardDiv.id = `card${producto.id}`
        cardDiv.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${producto.titulo}</h5>
              <p class="card-text"><strong>$${producto.precio}</strong></p>
              <button class="btn btn-secondary" type="button" id="boton${producto.id}" >Agregar al carrito</button>
            </div>
          </div>`
        $cardContainer.appendChild(cardDiv)
        const $butonProduct = document.getElementById(`boton${producto.id}`)
        $butonProduct.addEventListener("click", () => {
            guardarEnCarrito(producto.id)
        })
        carrito.length > 0 && $navContainer.appendChild($carritoImg)
    })
} else {
    $btnNombre.addEventListener("click", () => {
        const nombre = $inputNombre.value
        if (!nombre) {
            $errorForm.innerHTML = "El campo no puede estar vacio."
            return
        }
        else {
            localStorage.setItem("nombre", nombre)
            $titulo.innerHTML = `Bienvenid@ ${nombre}!`
            $form.className += " d-none"
            $navbar.className = "navbar fixed-top navbar-dark bg-primary mb-3"
            $contenedor.className = "my-5 bg-light d-flex flex-column justify-content-center align-items-center rounded"
            productos.forEach(producto => {
                const cardDiv = document.createElement("div")
                cardDiv.className = `card m-3`
                cardDiv.id = `card${producto.id}`
                cardDiv.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${producto.titulo}</h5>
                  <p class="card-text"><strong>$${producto.precio}</strong></p>
                  <button class="btn btn-secondary" type="button" id="boton${producto.id}" >Agregar al carrito</button>
                </div>
              </div>`
                $cardContainer.appendChild(cardDiv)
                const $butonProduct = document.getElementById(`boton${producto.id}`)
                $butonProduct.addEventListener("click", () => {
                    guardarEnCarrito(producto.id)
                })
            })
        }
    })
}

if(carrito.length > 0){
    carrito.forEach(product => {
        const $tr = document.createElement("tr")
        $tr.innerHTML = `
            <th scope="row">${product.titulo}</th>
            <td>${product.cantidad}</td>
            <td>$${product.precio}</td>
            <td>$${product.precio * product.cantidad}</td>
            <td class="d-flex align-items-center justify-content-center"><span class="align-self-start spanMenos" >-</span></td>
        `
        $tbody.appendChild($tr)
        const $spanMenos = document.querySelector(".spanMenos")
        $spanMenos.addEventListener("click", () => {
            eliminarCantidad(product.id)
        })
    })
}

$cerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("nombre")
    localStorage.removeItem("carrito")
    location.reload()
})

const guardarEnCarrito = (id) => {
    const productToSave = productos.filter((producto) => producto.id === Number(id))
    if (carrito.includes(productToSave[0])) {
        productToSave[0].cantidad++
    }
    else {
        productToSave[0].cantidad = 1
        carrito.push(productToSave[0])
    }
    guardarCarritoEnLocalStorage()
    carrito.length > 0 && $navContainer.appendChild($carritoImg)
    $tbody.innerHTML = ""
    carrito.forEach(product => {
        const $tr = document.createElement("tr")
        $tr.innerHTML = `
            <th scope="row">${product.titulo}</th>
            <td>${product.cantidad}</td>
            <td>$${product.precio}</td>
            <td>$${product.precio * product.cantidad}</td>
            <td class="d-flex align-items-center justify-content-center"><span class="align-self-start spanMenos" >-</span></td>
        `
        $tbody.appendChild($tr)
        const $spanMenos = document.querySelector(".spanMenos")
        $spanMenos.addEventListener("click", () => {
            eliminarCantidad(product.id)
        })

    })
}

const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

$carritoImg.addEventListener("click", () => {
    mostrarCarrito()
})
const mostrarCarrito = () => {
    $modal.classList.toggle("aparecer")
    $buttonCerar.addEventListener("click", () => {
        $modal.className = "modal"
    })

}
const eliminarCantidad = (id) => {
    const productToSave = productos.filter((producto) => producto.id === Number(id))
    productToSave[0].cantidad -= 1
    if(productToSave[0].cantidad === 0){
        carrito = carrito.filter(producto => producto.id !== productToSave[0].id)
    }
    else{
        carrito = carrito.filter(producto => producto.id !== productToSave[0].id)
        carrito.push(productToSave[0])
    }
    $tbody.innerHTML = ""
    carrito.forEach(product => {
        const $tr = document.createElement("tr")
        $tr.innerHTML = `
            <th scope="row">${product.titulo}</th>
            <td>${product.cantidad}</td>
            <td>$${product.precio}</td>
            <td>$${product.precio * product.cantidad}</td>
            <td class="d-flex align-items-center justify-content-center"><span class="align-self-start spanMenos" >-</span></td>
        `
        $tbody.appendChild($tr)
        const $spanMenos = document.querySelector(".spanMenos")
        $spanMenos.addEventListener("click", () => {
            eliminarCantidad(product.id)
        })
    })
    localStorage.setItem("carrito", JSON.stringify(carrito))
}






