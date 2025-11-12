// menu.js - Carga dinámica del menú
document.addEventListener('DOMContentLoaded', function() {
    // Cargar menú cuando se accede a la página
    loadMenu();
});

// Función principal para cargar el menú
async function loadMenu() {
    try {
        const response = await fetch('menus/menusData.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el menú');
        }
        
        const data = await response.json();
        displayMenu(data.menus["1"]); // Usar el menú con ID 1
        
    } catch (error) {
        console.error('Error cargando el menú:', error);
        displayError();
    }
}

// Mostrar el menú en la página
function displayMenu(menu) {
    const menuSection = document.getElementById('menu');
    if (!menuSection) return;

    menuSection.innerHTML = `
        <div class="menu-container">
            <div class="menu-header">
                <h1 class="menu-title">${menu.nombre}</h1>
                <p class="menu-description">${menu.descripcion}</p>
            </div>
            <div class="menu-content">
                ${generateMenuContent(menu)}
            </div>
        </div>
    `;
}

// Generar contenido del menú organizado por categorías
function generateMenuContent(menu) {
    if (!menu.platos || !menu.categorias) return '<p>No hay platos disponibles</p>';

    // Agrupar platos por categoría
    const platosPorCategoria = {};
    menu.categorias.forEach(cat => {
        platosPorCategoria[cat.id] = {
            categoria: cat,
            platos: []
        };
    });

    // Organizar platos en sus categorías
    menu.platos.forEach(plato => {
        if (platosPorCategoria[plato.categoria]) {
            platosPorCategoria[plato.categoria].platos.push(plato);
        }
    });

    // Generar HTML para cada categoría
    return menu.categorias
        .sort((a, b) => a.orden - b.orden)
        .map(cat => {
            const categoriaData = platosPorCategoria[cat.id];
            if (!categoriaData || categoriaData.platos.length === 0) return '';

            return `
                <div class="categoria-section">
                    <h2 class="categoria-title">${cat.nombre}</h2>
                    <div class="platos-list">
                        ${categoriaData.platos.map(plato => `
                            <div class="plato-item">
                                <div class="plato-info">
                                    <h3 class="plato-nombre">${plato.nombre}</h3>
                                    <p class="plato-descripcion">${plato.descripcion}</p>
                                </div>
                                <div class="plato-precio">$${plato.precio.toLocaleString()}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
}

// Mostrar mensaje de error
function displayError() {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        menuSection.innerHTML = `
            <div class="menu-error">
                <h2>Menú no disponible</h2>
                <p>Estamos actualizando nuestro menú. Por favor intenta más tarde.</p>
            </div>
        `;
    }
}

// También cargar el menú cuando se navega a esa página
document.addEventListener('pageChanged', function(e) {
    if (e.detail.page === 'menu') {
        loadMenu();
    }
});