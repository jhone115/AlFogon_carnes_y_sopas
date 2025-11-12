// Datos para las secciones del carrusel
const secciones = [
  {
    imagen: "img/alfogon_logo.png",
    fondo: "img/llamas.png",
    titulo: "Al Fogón",
    texto: "Carnes & Sopas"
  },
  {
    imagen: "img/carne.png",
    fondo: "img/llamas.png",
    titulo: "",
    texto: "Sabor y jugosidad en cada corte, la carne perfecta."
  },
  {
    imagen: "img/sopa.png",
    fondo: "img/llamas.png",
    titulo: "",
    texto: "Calidez y sabor en cada cucharada, sopas con alma."
  }
];

// Variables globales
let indiceActual = 0;
let intervalo;
let isAnimating = false;
const carrusel = document.getElementById('carrusel');
const barraProgreso = document.getElementById('progreso');

function crearSecciones() {
    carrusel.innerHTML = '';
    
    secciones.forEach((seccion, index) => {
        const elementoSeccion = document.createElement('div');
        elementoSeccion.className = 'seccion';
        
        // Fondo con gradiente para mejor legibilidad
        elementoSeccion.style.background = `
            linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)),
            url('${seccion.fondo}') no-repeat center center / cover
        `;
        
        const contenido = document.createElement('div');
        contenido.className = 'contenido';
        
        const contenedorImagen = document.createElement('div');
        contenedorImagen.className = 'imagen-seccion';
        
        const imagen = document.createElement('img');
        imagen.src = seccion.imagen;
        imagen.alt = seccion.titulo || seccion.texto;
        imagen.loading = 'lazy';
        
        const contenedorTexto = document.createElement('div');
        contenedorTexto.className = 'texto-seccion';
        
        // Solo crear título si existe
        if (seccion.titulo) {
            const titulo = document.createElement('h2');
            const spanAl = document.createElement('span');
            spanAl.className = 'palabra-al';
            spanAl.textContent = 'Al';
            const spanFogon = document.createElement('span');
            spanFogon.className = 'palabra-fogon';
            spanFogon.textContent = 'Fogón';
            
            titulo.appendChild(spanAl);
            titulo.appendChild(spanFogon);
            contenedorTexto.appendChild(titulo);
        }
        
        const texto = document.createElement('p');
        texto.textContent = seccion.texto;
        contenedorTexto.appendChild(texto);
        
        contenedorImagen.appendChild(imagen);
        contenido.appendChild(contenedorImagen);
        contenido.appendChild(contenedorTexto);
        elementoSeccion.appendChild(contenido);
        carrusel.appendChild(elementoSeccion);
    });
}

function actualizarCarrusel() {
    if (isAnimating) return;
    isAnimating = true;
    
    carrusel.style.transform = `translateX(-${indiceActual * 100}%)`;
    
    // Reiniciar barra de progreso
    barraProgreso.style.transition = 'none';
    barraProgreso.style.width = '0%';
    
    void barraProgreso.offsetWidth; // Reflow
    
    barraProgreso.style.transition = 'width 5s linear';
    barraProgreso.style.width = '100%';
    
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

function siguienteSeccion() {
    indiceActual = (indiceActual + 1) % secciones.length;
    actualizarCarrusel();
    iniciarCarruselAutomatico();
}

function anteriorSeccion() {
    indiceActual = (indiceActual - 1 + secciones.length) % secciones.length;
    actualizarCarrusel();
    iniciarCarruselAutomatico();
}

function iniciarCarruselAutomatico() {
    clearTimeout(intervalo);
    intervalo = setTimeout(() => {
        siguienteSeccion();
    }, 5000);
}

function reiniciarCarruselAutomatico() {
    clearTimeout(intervalo);
    iniciarCarruselAutomatico();
}

// Touch events para móviles
let startX = 0;
let currentX = 0;

carrusel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    clearTimeout(intervalo);
});

carrusel.addEventListener('touchmove', (e) => {
    currentX = e.touches[0].clientX;
    e.preventDefault();
});

carrusel.addEventListener('touchend', () => {
    const diff = startX - currentX;
    const minSwipe = 50;
    
    if (Math.abs(diff) > minSwipe) {
        if (diff > 0) {
            siguienteSeccion();
        } else {
            anteriorSeccion();
        }
    } else {
        reiniciarCarruselAutomatico();
    }
});

// Pausar/reanudar en hover
carrusel.addEventListener('mouseenter', () => {
    clearTimeout(intervalo);
});

carrusel.addEventListener('mouseleave', () => {
    reiniciarCarruselAutomatico();
});

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    crearSecciones();
    actualizarCarrusel();
    iniciarCarruselAutomatico();
});