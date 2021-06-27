const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = (data, className = '') => {
    const html = `
      <article class="country ${className}">
         <img class="country__img" src="${data.flag}" />
         <div class="country__data">
           <h3 class="country__name">${data.name}</h3>
           <h4 class="country__region">${data.region}</h4>
           <p class="country__row"><span>👫</span>${(Number(data.population) / 1000000).toFixed(1)} million people</p>
           <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
           <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
         </div>
       </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
};


const renderError = (message) => {
    countriesContainer.insertAdjacentText('beforeend', message);
};

const getAllCountries = () => {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => {
            data.slice(0, 10).forEach(el => renderCountry(el));
        })
        .finally(() => {
            countriesContainer.style.opacity = '1';
        });
};


window.addEventListener('load', getAllCountries);

