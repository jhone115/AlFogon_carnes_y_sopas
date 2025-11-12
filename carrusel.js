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
    secciones.forEach((seccion, index) => {
        const elementoSeccion = document.createElement('div');
        elementoSeccion.className = 'seccion';
        
        // Usar la imagen de fondo del objeto sección
        elementoSeccion.style.backgroundImage = `url('${seccion.fondo}')`;
        elementoSeccion.style.backgroundSize = 'cover';
        elementoSeccion.style.backgroundPosition = 'center';
        elementoSeccion.style.backgroundRepeat = 'no-repeat';
        
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
        
        // Crear texto
        const texto = document.createElement('p');
        texto.textContent = seccion.texto;
        
        // Ensamblar contenido
        contenedorImagen.appendChild(imagen);
        
        // Añadir elementos al contenedor de texto
        contenedorTexto.appendChild(titulo);
        contenedorTexto.appendChild(texto);
        
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
    }, 5000); // 5 segundos por sección
}

// Función para ir a la siguiente sección
function siguienteSeccion() {
    indiceActual = (indiceActual + 1) % secciones.length;
    actualizarCarrusel();
    iniciarCarruselAutomatico(); // Reiniciar el ciclo
}

// Función para reiniciar el carrusel automático
function reiniciarCarruselAutomatico() {
    clearTimeout(intervalo);
    iniciarCarruselAutomatico();
}

// Pausar carrusel automático al interactuar
carrusel.addEventListener('mouseenter', () => {
    clearInterval(intervalo);
});

// Reanudar carrusel automático al dejar de interactuar
carrusel.addEventListener('mouseleave', () => {
    reiniciarCarruselAutomatico();
});

// Inicializar el carrusel
crearSecciones();
actualizarCarrusel();
iniciarCarruselAutomatico();