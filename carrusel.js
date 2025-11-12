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
    texto: "calidez y sabor en cada cucharada,sopas con alma."
  }
];

// Variables globales
let indiceActual = 0;
let intervalo;
const carrusel = document.getElementById('carrusel');
const barraProgreso = document.getElementById('progreso');

function crearSecciones() {
    // Limpiar carrusel existente
    carrusel.innerHTML = '';
    
    secciones.forEach((seccion, index) => {
        const elementoSeccion = document.createElement('div');
        elementoSeccion.className = 'seccion';
        
        // Usar la imagen de fondo del objeto sección
        elementoSeccion.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('${seccion.fondo}') no-repeat center center`;
        elementoSeccion.style.backgroundSize = 'cover';
        
        // Crear contenido de la sección
        const contenido = document.createElement('div');
        contenido.className = 'contenido';
        
        // Crear contenedor de imagen
        const contenedorImagen = document.createElement('div');
        contenedorImagen.className = 'imagen-seccion';
        
        // Crear imagen
        const imagen = document.createElement('img');
        imagen.src = seccion.imagen;
        imagen.alt = seccion.titulo;
        
        // Crear contenedor para texto
        const contenedorTexto = document.createElement('div');
        contenedorTexto.className = 'texto-seccion';
        
        // Solo crear título si existe
        if (seccion.titulo) {
            // Crear título con span para "Al"
            const titulo = document.createElement('h2');
            
            // Crear span para "Al" en rojo
            const spanAl = document.createElement('span');
            spanAl.className = 'palabra-al';
            spanAl.textContent = 'Al';
            
            // Crear span para "Fogón" en blanco
            const spanFogon = document.createElement('span');
            spanFogon.className = 'palabra-fogon';
            spanFogon.textContent = 'Fogón';
            
            // Ensamblar el título
            titulo.appendChild(spanAl);
            titulo.appendChild(spanFogon);
            contenedorTexto.appendChild(titulo);
        }
        
        // Crear texto
        const texto = document.createElement('p');
        texto.textContent = seccion.texto;
        contenedorTexto.appendChild(texto);
        
        // Ensamblar contenido
        contenedorImagen.appendChild(imagen);
        
        // Añadir imagen y texto al contenido principal
        contenido.appendChild(contenedorImagen);
        contenido.appendChild(contenedorTexto);
        
        // Añadir contenido a la sección
        elementoSeccion.appendChild(contenido);
        
        // Añadir sección al carrusel
        carrusel.appendChild(elementoSeccion);
    });
}

// Función para actualizar la posición del carrusel
function actualizarCarrusel() {
    carrusel.style.transform = `translateX(-${indiceActual * 100}%)`;
    
    // Reiniciar barra de progreso PERO con transición suave
    barraProgreso.style.transition = 'none';
    barraProgreso.style.width = '0%';
    
    // Forzar reflow
    void barraProgreso.offsetWidth;
    
    // Restaurar transición
    barraProgreso.style.transition = 'width 5s linear';
    barraProgreso.style.width = '100%';
}

// Función para iniciar el carrusel automático
function iniciarCarruselAutomatico() {
    clearInterval(intervalo);
    
    // Reiniciar barra de progreso con animación suave
    barraProgreso.style.transition = 'width 5s linear';
    barraProgreso.style.width = '100%';
    
    // Configurar el intervalo para cambiar de sección después de 5 segundos
    intervalo = setTimeout(() => {
        siguienteSeccion();
    }, 5000);
}

// Función para ir a la siguiente sección
function siguienteSeccion() {
    indiceActual = (indiceActual + 1) % secciones.length;
    actualizarCarrusel();
    iniciarCarruselAutomatico();
}

// Función para reiniciar el carrusel automático
function reiniciarCarruselAutomatico() {
    clearTimeout(intervalo);
    iniciarCarruselAutomatico();
}

// Pausar carrusel automático al interactuar
carrusel.addEventListener('mouseenter', () => {
    clearTimeout(intervalo);
    barraProgreso.style.transition = 'none';
    barraProgreso.style.width = '100%';
});

// Reanudar carrusel automático al dejar de interactuar
carrusel.addEventListener('mouseleave', () => {
    reiniciarCarruselAutomatico();
});

// Soporte para touch en móviles
let startX = 0;
let isDragging = false;

carrusel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    clearTimeout(intervalo);
});

carrusel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
});

carrusel.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    if (Math.abs(diffX) > 50) { // Umbral mínimo para considerar swipe
        if (diffX > 0) {
            siguienteSeccion();
        } else {
            // Ir a sección anterior
            indiceActual = (indiceActual - 1 + secciones.length) % secciones.length;
            actualizarCarrusel();
            iniciarCarruselAutomatico();
        }
    } else {
        reiniciarCarruselAutomatico();
    }
    
    isDragging = false;
});

// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    crearSecciones();
    actualizarCarrusel();
    iniciarCarruselAutomatico();
});