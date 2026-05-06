const listContainer = document.getElementById('presidentes-list');
const loading = document.getElementById('loading');

async function fetchPresidents() {
    try {
        // 1. Consumir datos (Requisito 3)
        const response = await fetch('https://api-colombia.com/api/v1/President');
        
        if (!response.ok) throw new Error('No se pudo conectar con la API');

        const data = await response.json();

        // Extra: Ordenar por año de inicio (de más antiguo a más reciente)
        data.sort((a, b) => a.startPeriod - b.startPeriod);

        // 2. Mostrar datos dinámicamente (Requisito 4 y 5)
        renderCards(data);

    } catch (error) {
        // Manejar errores (Requisito 8)
        listContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    } finally {
        // Ocultar mensaje de carga (Requisito 7)
        loading.style.display = 'none';
    }
}

function renderCards(presidents) {
    // Limpiar contenedor por si acaso
    listContainer.innerHTML = '';

    presidents.forEach(p => {
        // Crear el elemento de la tarjeta
        const card = document.createElement('article');
        card.className = 'card';

        // Validar imagen (Requisito: Consideración sobre imágenes)
        // Si la API no trae imagen o es null, usamos una de reemplazo
        const imageSrc = p.image ? p.image : 'https://placehold.co/200x250?text=Sin+Foto';

        card.innerHTML = `
            <img src="${imageSrc}" alt="Foto de ${p.name}" onerror="this.src='https://placehold.co/200x250?text=Imagen+No+Disponible'">
            <div class="card-info">
                <h3>${p.name}</h3>
                <p><strong>Periodo:</strong> ${p.startPeriod} - ${p.endPeriod || 'Presente'}</p>
                <p><strong>Partido:</strong> ${p.politicalParty}</p>
            </div>
        `;

        listContainer.appendChild(card);
    });
}

// Iniciar la función al cargar la página
fetchPresidents();