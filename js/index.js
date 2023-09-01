//estructura

const cuerpo = document.body
const cabeza = document.head
const titulo = document.createElement('title')
const nombrep = titulo.innerText = 'The Best Hard'
cabeza.appendChild(titulo)
//nav bar
const header = document.createElement('header')
const contenedorNav = document.createElement('div')
const navBar = document.createElement('nav')
const uls = document.createElement('ul')
const links = [
    {
        id: '#ap',
        link: 'Inicio'
    },
    {
        id: '#cards',
        link: 'Productos'
    },
    {
        id: '#conct',
        link: 'Contacto'
    }
]

//footer
const footer = document.createElement('footer')
cuerpo.prepend(footer)
footer.style.textAlign = 'center'
footer.style.backgroundColor = '#c2f195'
footer.style.padding = '10px'
footer.style.borderRadius = '20px 20px 0px 0px'
footer.style.borderTop = '2px solid #e86c3e'
footer.style.color = '#e86c3e'

//main
const main = document.createElement('main')
cuerpo.prepend(main)


//estructura navbar
navBar.classList = 'navbar navbar-expand-lg navbar-light bg-light'
contenedorNav.classList = 'container-fluid'
uls.classList = 'navbar-nav'

//Header
cuerpo.prepend(header)
header.append(navBar)
navBar.appendChild(contenedorNav)
contenedorNav.appendChild(uls)

links.forEach((nombre) => {
    uls.innerHTML += `
                     <li class="nav-item">
                         <a class="${nombre.button}" href="${nombre.id}">${nombre.link}</a>
                     </li>
    `
})

//estructura footer
const anio = new Date().getFullYear();
footer.innerHTML = `Xavier Amendolaro | Entrega Final | <img src="img/js-logo50x50.png" alt="logojs"> | ${anio}`

//estructura main


//div contacto
const divB=document.createElement('div')
divB.classList=('contacto')
main.prepend(divB)

//div cart
const divA = document.createElement('div')
divA.classList = ('tarjetas')
divA.id = ('cards')
main.prepend(divA)


//seccion
const sectionA = document.createElement('index')
sectionA.classList = 'container'
sectionA.id = 'ap'
main.prepend(sectionA)

const sectA = document.getElementById('ap')
const h1Titulo = document.createElement('h1')
h1Titulo.innerText = 'The Best Hard'
h1Titulo.style.textAlign = 'center'
sectA.appendChild(h1Titulo)
const slogan = document.createElement('p')
slogan.innerText = 'Los mejores combos de PC'
slogan.style.textAlign = 'center'
sectA.appendChild(slogan)


//mostrar cards DOM API ML
const peticionA = async () => {
    const respuesta = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=combo%20pc%20gamer')
    const datos = await respuesta.json()
    const data = datos.results
    for (item of data) {
        const card = document.createElement('div')
        const productsId = item.id
        const productoTitle= item.title
        const productoPrice= item.price
        card.innerHTML = `
        <div class="card" style="width: 16rem; height:26rem">
        <img src=${item.thumbnail} class="card-img-top" alt=${item.title}>
        <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.id}</p>
        <p class="card-text">$${item.price}</p>
        <button class="btn btn-primary" id="add-to-kart-btn" data-product-id="${productsId}${productoTitle}$${productoPrice}">Comprar!</button>
  </div>
</div>
        `
const addTocardButton = card.querySelector('#add-to-kart-btn')
addTocardButton.addEventListener('click', ()=> addTocard(productsId, [[productoTitle],productoPrice]))        
divA.append(card)
    }
}
peticionA()

//seleccion de producto
const addTocard = (productsId,[[productoTitle],productoPrice])=>{
    let kart =localStorage.getItem('kart') ? JSON.parse(localStorage.getItem('kart')) : []
    if (!kart.includes([productsId, [[productoTitle],productoPrice]])){
        kart.push([productsId, [[productoTitle],productoPrice]])
        localStorage.setItem('kart', JSON.stringify(kart))
        console.log(`El producto id:${productsId} fue agregado!`)
        //sweet alert
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `El producto ${productsId} fue agregado`,
            showConfirmButton: true,
            timer: 5500
          })

    } else {
        console.log(`El producto id:${productsId} no tiene stock!`)
        Swal.fire({
            title: `El producto id:${productsId} ya fue agregado!`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'OK',
            denyButtonText: `Eliminar producto`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                localStorage.removeItem('kart')
              Swal.fire('Se elimino seleccion', '', 'error')
            }
          })
    }
}

//contacto
const titleContact = document.createElement('h1')
titleContact.innerText='Contactanos'
titleContact.style.textAlign ='center'
divB.appendChild(titleContact)

const mediosDcontacto= document.createElement('div')
mediosDcontacto.id=('conct')
divB.appendChild(mediosDcontacto)

//botones de contacto
const btnCall= document.createElement('button')
btnCall.id=('btnc')
btnCall.innerHTML=('Llamanos!')
mediosDcontacto.appendChild(btnCall)

//evento boton llamanos
btnCall.addEventListener("click", () =>{
  Swal.fire('Nuestro numero es 4000-0000')
} )

const btnWhat= document.createElement('button')
btnWhat.id=('btnw')
btnWhat.innerHTML=('WhatsApp')
mediosDcontacto.appendChild(btnWhat)

//evento boton whatsapp
btnWhat.addEventListener("click", ()=>{
  Swal.fire({
    title: 'Nuestro WSP +54 11 4000-0000',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
      timer: 2000
    }
  })
})

//ubicacion 
const btnGeo= document.createElement('button')
btnGeo.id=('btng')
btnGeo.innerHTML=('Visitanos')
mediosDcontacto.appendChild(btnGeo)

//evento boton Geolocalizacion
btnGeo.addEventListener("click", function (){
  window.location.href = "https://goo.gl/maps/gFkmzraA6hYxCNbMA"
})



//carrito
const Karrito= document.createElement('div')
Karrito.id=('selected-products-container')
divB.appendChild(Karrito)

const kimg=document.createElement('div')
kimg.id=('foto')
kimg.innerHTML=(`<img src="img/CarritoC.png" alt="">`)
Karrito.appendChild(kimg)

kimg.addEventListener("click", ()=>{
  showSelectedProducts()
  Karrito.appendChild(kimg)
  })
  
const showSelectedProducts = () => {
  const selectedProducts = localStorage.getItem('kart') ? JSON.parse(localStorage.getItem('kart')) : []
  const selectedProductsContainer = document.getElementById('selected-products-container')
  selectedProductsContainer.innerHTML = ''
  selectedProducts.forEach(productId => {
      const product = document.createElement('div')
      product.innerHTML = productId
      selectedProductsContainer.appendChild(product)
      const btnB=document.createElement('button')
      btnB.id ='clear'
      btnB.innerText='quitar'
      product.appendChild(btnB)

      btnB.addEventListener("click", ()=>{
      localStorage.removeItem('kart')
       selectedProductsContainer.removeChild(product)

        Karrito.appendChild(kimg)
      })
  })
}
