// Navegación con indicador activo
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageContents = document.querySelectorAll('.page-content');
    
    function changePage(pageId) {
        // Remover clase active de todos
        navLinks.forEach(link => link.classList.remove('active'));
        pageContents.forEach(page => page.classList.remove('active'));
        
        // Agregar clase active al seleccionado
        const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
        const activePage = document.getElementById(pageId);
        
        if (activeLink && activePage) {
            activeLink.classList.add('active');
            activePage.classList.add('active');
        }
        
        // Cargar menú si es la página correspondiente
        if (pageId === 'menu') {
            setTimeout(() => {
                const menuEvent = new CustomEvent('pageChanged', { 
                    detail: { page: 'menu' } 
                });
                document.dispatchEvent(menuEvent);
            }, 100);
        }
    }
    
    // Event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            changePage(pageId);
            history.pushState(null, null, `#${pageId}`);
        });
    });
    
    // Navegación con botones atrás/adelante
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'inicio';
        changePage(hash);
    });
    
    // Inicializar
    const initialPage = window.location.hash.substring(1) || 'inicio';
    changePage(initialPage);
});