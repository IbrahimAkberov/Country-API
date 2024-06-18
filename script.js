
function loadCountry() {
    const searchInput = document.getElementById('searchInput').value;
    const countryInfo = document.getElementById('countryInfo');
    const neighboringCountries = document.getElementById('neighboringCountries');
    
    fetch(`https://restcountries.com/v3.1/name/${searchInput}`)
        .then(response => response.json())
        .then(data => {
            const country = data[0];
            countryInfo.innerHTML = `
                <h2>${country.name.common}</h2>
                 <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="200">
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Language: ${Object.values(country.languages).join(', ')}</p>
                <p>Capital: ${country.capital}</p>
                <p>Currency: ${Object.values(country.currencies)[0].name} (${Object.values(country.currencies)[0].symbol})</p>
               
            `;
            
            if (country.borders) {
                fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}`)
                    .then(response => response.json())
                    .then(neighborsData => {
                        neighboringCountries.innerHTML = '<h3>Neighboring Countries:</h3>';
                        neighborsData.forEach(neighbor => {
                            neighboringCountries.innerHTML += `
                                <div>
                                    <img src="${neighbor.flags.png}" alt="Flag of ${neighbor.name.common}">
                                    <span>${neighbor.name.common}</span>
                                </div>
                            `;
                        });
                    });
            } else {
                neighboringCountries.innerHTML = '<h3>No neighboring countries found.</h3>';
            }
        })
        .catch(error => {
            countryInfo.innerHTML = '<p>Country not found or an error occurred.</p>';
            neighboringCountries.innerHTML = '';
        });
}