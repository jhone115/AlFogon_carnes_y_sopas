// Datos para las secciones del carrusel
const secciones = [
  {
    imagen: "img/alfogon_logo.png",
    titulo: "Al Fogón",
    texto: "Carnes & Sopas"
  },
  {
    imagen: "img/fruta.png", 
    titulo: "",
    texto: "Sabor y jugosidad en cada corte, la carne perfecta."
  },
  {
    imagen: "img/sopa.png",
    titulo: "",
    texto: "Calidez y sabor en cada cucharada, sopas con alma."
  }
];

// Variables globales
let indiceActual = 0;
let intervalo;
const carrusel = document.getElementById('carrusel');
const barraProgreso = document.getElementById('progreso');

// Función para crear las secciones del carrusel
function crearSecciones() {
    console.log('Creando secciones del carrusel...');
    
    // Limpiar carrusel existente
    carrusel.innerHTML = '';
    
    secciones.forEach((seccion, index) => {
        const elementoSeccion = document.createElement('div');
        elementoSeccion.className = 'seccion';
        
        // Crear contenido de la sección
        const contenido = document.createElement('div');
        contenido.className = 'contenido';
        
        // Crear contenedor de imagen
        const contenedorImagen = document.createElement('div');
        contenedorImagen.className = 'imagen-seccion';
        
        // Crear imagen
        const imagen = document.createElement('img');
        imagen.src = seccion.imagen;
        imagen.alt = seccion.titulo || seccion.texto;
        
        // Crear contenedor para texto
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
        
        // Crear texto
        const texto = document.createElement('p');
        texto.textContent = seccion.texto;
        contenedorTexto.appendChild(texto);
        
        // Ensamblar contenido
        contenedorImagen.appendChild(imagen);
        contenido.appendChild(contenedorImagen);
        contenido.appendChild(contenedorTexto);
        elementoSeccion.appendChild(contenido);
        carrusel.appendChild(elementoSeccion);
    });
    
    console.log('Secciones creadas correctamente');
}

// Función para actualizar la posición del carrusel
function actualizarCarrusel() {
    console.log('Actualizando carrusel a índice:', indiceActual);
    
    const translateX = -indiceActual * 100;
    carrusel.style.transform = `translateX(${translateX}%)`;
    
    // Reiniciar barra de progreso
    barraProgreso.style.transition = 'none';
    barraProgreso.style.width = '0%';
    
    // Forzar reflow
    void barraProgreso.offsetWidth;
    
    // Animar barra de progreso
    barraProgreso.style.transition = 'width 5s linear';
    barraProgreso.style.width = '100%';
}

// Función para ir a la siguiente sección
function siguienteSeccion() {
    console.log('Siguiente sección');
    indiceActual = (indiceActual + 1) % secciones.length;
    actualizarCarrusel();
    iniciarCarruselAutomatico();
}

// Función para ir a la sección anterior
function anteriorSeccion() {
    console.log('Sección anterior');
    indiceActual = (indiceActual - 1 + secciones.length) % secciones.length;
    actualizarCarrusel();
    iniciarCarruselAutomatico();
}

// Función para iniciar el carrusel automático
function iniciarCarruselAutomatico() {
    console.log('Iniciando carrusel automático');
    clearTimeout(intervalo);
    
    intervalo = setTimeout(() => {
        siguienteSeccion();
    }, 5000); // 5 segundos
}

// Función para reiniciar el carrusel automático
function reiniciarCarruselAutomatico() {
    console.log('Reiniciando carrusel automático');
    clearTimeout(intervalo);
    iniciarCarruselAutomatico();
}

// Event listeners para touch en móviles
let startX = 0;
let endX = 0;

carrusel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    clearTimeout(intervalo);
    console.log('Touch start:', startX);
});

carrusel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    console.log('Touch end - Diferencia:', diffX);
    
    if (Math.abs(diffX) > 50) { // Mínimo swipe de 50px
        if (diffX > 0) {
            siguienteSeccion();
        } else {
            anteriorSeccion();
        }
    } else {
        reiniciarCarruselAutomatico();
    }
});

// Pausar/reanudar en hover (para desktop)
carrusel.addEventListener('mouseenter', () => {
    console.log('Mouse enter - pausando carrusel');
    clearTimeout(intervalo);
    barraProgreso.style.transition = 'none';
    barraProgreso.style.width = '100%';
});

carrusel.addEventListener('mouseleave', () => {
    console.log('Mouse leave - reanudando carrusel');
    reiniciarCarruselAutomatico();
});

// Inicializar el carrusel cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - inicializando carrusel');
    crearSecciones();
    actualizarCarrusel();
    iniciarCarruselAutomatico();
});

// También inicializar cuando la ventana se carga completamente
window.addEventListener('load', function() {
    console.log('Página completamente cargada');
});