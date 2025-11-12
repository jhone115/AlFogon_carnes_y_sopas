// menu.js - Carga dinámica del menú desde JSON
class MenuManager {
    constructor() {
        this.menuData = null;
        this.currentMenuId = 1; // ID por defecto, puedes cambiarlo según el día
    }

    // Cargar datos del menú desde un archivo JSON
    async loadMenuData() {
        try {
            const response = await fetch('menuData.json');
            if (!response.ok) {
                throw new Error('Error al cargar el menú');
            }
            this.menuData = await response.json();
            console.log('Datos del menú cargados correctamente');
        } catch (error) {
            console.error('Error cargando el menú:', error);
            // En caso de error, podrías cargar datos por defecto
            this.loadDefaultData();
        }
    }

    // Obtener menú por ID
    getMenuById(menuId) {
        if (!this.menuData || !this.menuData.menus) {
            console.error('Datos del menú no disponibles');
            return null;
        }
        return this.menuData.menus[menuId.toString()];
    }

    // Mostrar el menú en la página
    displayMenu(menuId = this.currentMenuId) {
        const menu = this.getMenuById(menuId);
        if (!menu) {
            this.showErrorMessage();
            return;
        }

        const menuSection = document.getElementById('menu');
        if (!menuSection) {
            console.error('Sección menu no encontrada');
            return;
        }

        menuSection.innerHTML = this.generateMenuHTML(menu);
    }

    // Generar HTML del menú
    generateMenuHTML(menu) {
        // Agrupar platos por categoría
        const platosPorCategoria = this.groupPlatosByCategoria(menu.platos, menu.categorias);

        return `
            <div class="menu-container">
                <div class="menu-header">
                    <h1 class="menu-title">${menu.nombre}</h1>
                    <p class="menu-description">${menu.descripcion}</p>
                </div>
                
                <div class="menu-content">
                    ${this.generateCategoriasHTML(platosPorCategoria, menu.categorias)}
                </div>
            </div>
        `;
    }

    // Agrupar platos por categoría
    groupPlatosByCategoria(platos, categorias) {
        const grouped = {};
        
        // Inicializar categorías
        categorias.forEach(cat => {
            grouped[cat.id] = {
                categoria: cat,
                platos: []
            };
        });

        // Agrupar platos
        platos.forEach(plato => {
            if (grouped[plato.categoria]) {
                grouped[plato.categoria].platos.push(plato);
            }
        });

        return grouped;
    }

    // Generar HTML de categorías
    generateCategoriasHTML(platosPorCategoria, categorias) {
        // Ordenar categorías según el orden definido
        const categoriasOrdenadas = categorias.sort((a, b) => a.orden - b.orden);

        return categoriasOrdenadas.map(cat => {
            const categoriaData = platosPorCategoria[cat.id];
            if (!categoriaData || categoriaData.platos.length === 0) {
                return '';
            }

            return `
                <div class="categoria-section" id="categoria-${cat.id}">
                    <h2 class="categoria-title">${cat.nombre}</h2>
                    <div class="platos-grid">
                        ${this.generatePlatosHTML(categoriaData.platos)}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Generar HTML de platos
    generatePlatosHTML(platos) {
        return platos.map(plato => `
            <div class="plato-card" data-id="${plato.id}">
                <div class="plato-header">
                    <h3 class="plato-nombre">${plato.nombre}</h3>
                    <span class="plato-precio">$${this.formatPrice(plato.precio)}</span>
                </div>
                <p class="plato-descripcion">${plato.descripcion}</p>
            </div>
        `).join('');
    }

    // Formatear precio
    formatPrice(price) {
        return new Intl.NumberFormat('es-CO').format(price);
    }

    // Mostrar mensaje de error
    showErrorMessage() {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
            menuSection.innerHTML = `
                <div class="menu-error">
                    <h2>Menú no disponible</h2>
                    <p>Lo sentimos, el menú no está disponible en este momento.</p>
                </div>
            `;
        }
    }

    // Cambiar menú (para cuando quieras mostrar diferentes menús)
    changeMenu(menuId) {
        this.currentMenuId = menuId;
        this.displayMenu(menuId);
    }

    // Inicializar
    async init() {
        await this.loadMenuData();
        this.displayMenu();
    }
}

// Inicializar cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    const menuManager = new MenuManager();
    menuManager.init();
});

// También manejar cambios en la navegación
document.addEventListener('pageChanged', function(e) {
    if (e.detail.page === 'menu') {
        const menuManager = new MenuManager();
        menuManager.init();
    }
});