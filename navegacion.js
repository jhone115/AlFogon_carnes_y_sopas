// Navegación con indicador activo
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageContents = document.querySelectorAll('.page-content');
    const carruselContainer = document.querySelector('.carrusel-container');
    const contenedorR = document.querySelector('.contenedorR');
    const seccionBienvenida = document.querySelector('.seccion-bienvenida');
    
    // Función para cambiar de página
    function changePage(pageId) {
        // Remover clase active de todos los enlaces y páginas
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        pageContents.forEach(page => {
            page.classList.remove('active');
        });
        
        // Agregar clase active al enlace y página seleccionados
        const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
        const activePage = document.getElementById(pageId);
        
        if (activeLink && activePage) {
            activeLink.classList.add('active');
            activePage.classList.add('active');
        }
        
        // Mostrar/ocultar elementos específicos de la página de inicio
        if (pageId === 'inicio') {
            if (carruselContainer) carruselContainer.style.display = 'block';
            if (contenedorR) contenedorR.style.display = 'block';
            if (seccionBienvenida) seccionBienvenida.style.display = 'flex';
        } else {
            if (carruselContainer) carruselContainer.style.display = 'none';
            if (contenedorR) contenedorR.style.display = 'none';
            if (seccionBienvenida) seccionBienvenida.style.display = 'none';
        }
        
        // Si la página es "menu", cargar el menú
        if (pageId === 'menu') {
            setTimeout(() => {
                const menuEvent = new CustomEvent('pageChanged', { 
                    detail: { page: 'menu' } 
                });
                document.dispatchEvent(menuEvent);
            }, 100);
        }
    }
    
    // Event listeners para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            changePage(pageId);
            
            // Actualizar URL sin recargar la página
            history.pushState(null, null, `#${pageId}`);
        });
    });
    
    // Manejar navegación con botones de atrás/adelante
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'inicio';
        changePage(hash);
    });
    
    // Manejar envío de formulario de reseñas
    const formResena = document.getElementById('form-reseña');
    if (formResena) {
        formResena.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por tu reseña! Será publicada después de ser revisada.');
            this.reset();
        });
    }
    
    // Inicializar página basada en el hash de la URL
    const initialPage = window.location.hash.substring(1) || 'inicio';
    changePage(initialPage);
    
    // Asegurar que el carrusel se reinicie cuando se vuelva a la página de inicio
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1) || 'inicio';
        if (hash === 'inicio' && typeof reiniciarCarruselAutomatico === 'function') {
            setTimeout(() => {
                reiniciarCarruselAutomatico();
            }, 100);
        }
    });
});