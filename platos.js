const container = document.getElementById('platos-container');
const loading = document.getElementById('loading');
const contadorText = document.getElementById('contador-platos');

async function getTypicalDishes() {
    try {
        const response = await fetch('https://api-colombia.com/api/v1/TypicalDish');
        
        if (!response.ok) throw new Error('Error al obtener los platos');

        const dishes = await response.json();

        // Extra: Contar platos
        contadorText.innerText = `Se han encontrado ${dishes.length} platos típicos colombianos.`;

        renderDishes(dishes);
    } catch (error) {
        container.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    } finally {
        loading.style.display = 'none';
    }
}

function renderDishes(dishes) {
    // La actividad pide mostrar mínimo 15. La API trae muchos más.
    dishes.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'card';

        // Requisito: Si la imagen falla, usar una de internet válida
        const imageSrc = dish.image ? dish.image : 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400';

        card.innerHTML = `
            <img src="${imageSrc}" alt="${dish.name}" onerror="this.src='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400'">
            <div class="card-info">
                <h3>${dish.name}</h3>
                <p><strong>Región/Dpto:</strong> ${dish.departmentId || 'Colombia'}</p>
                <p>${dish.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

getTypicalDishes();