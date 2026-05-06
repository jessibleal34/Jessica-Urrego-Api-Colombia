const infoContainer = document.getElementById('colombia-info');
const loading = document.getElementById('loading');

async function getColombiaData() {
    try {
        const response = await fetch('https://api-colombia.com/api/v1/Country/Colombia');
        if (!response.ok) throw new Error('Error al obtener los datos');
        
        const data = await response.json();
        renderCountry(data);
    } catch (error) {
        infoContainer.innerHTML = `<p class="error">Hubo un error: ${error.message}</p>`;
    } finally {
        loading.style.display = 'none';
    }
}

function renderCountry(country) {
    infoContainer.innerHTML = `
        <div class="card">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg" alt="Bandera" width="200">
            <h2>${country.name}</h2>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Superficie:</strong> ${country.surface.toLocaleString()} km²</p>
            <p><strong>Moneda:</strong> ${country.currency}</p>
        </div>
    `;
}


getColombiaData();