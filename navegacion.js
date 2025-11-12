// Navegación con indicador activo
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageContents = document.querySelectorAll('.page-content');
    
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
        
        // Ocultar/mostrar carrusel según la página
        const carruselContainer = document.querySelector('.carrusel-container');
        if (pageId === 'inicio' && carruselContainer) {
            carruselContainer.style.display = 'block';
        } else if (carruselContainer) {
            carruselContainer.style.display = 'none';
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
    
    // Inicializar página basada en el hash de la URL
    const initialPage = window.location.hash.substring(1) || 'inicio';
    changePage(initialPage);
});