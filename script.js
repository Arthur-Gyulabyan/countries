const searchBtn = document.querySelector('#search-btn');
const searchField = document.querySelector('#query');
const searchForm = document.querySelector('#search-form');
const countriesContainer = document.querySelector('.countries');
const loadingSpinner = document.querySelector('.lds-default');

searchForm.addEventListener('submit', (e) => {
   e.preventDefault();
});

// class Country {
//     constructor({name, flag, region, population, languages, currencies} = {}) {
//         this.name = name;
//         this.flag = flag;
//         this.region = region;
//         this.population = population;
//         this.languages = languages;
//         this.currencies = currencies;
//     }
//
//     renderCountry(data) {
//         const html = `
//           <article class="country">
//             <img class="country__img" src="${data.flag}" alt="Flag of ${data.name}" />
//             <div class="country__data">
//               <h3 class="country__name">${data.name}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${(Number(data.population) / 1000000).toFixed(1)} million people</p>
//               <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//               <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//             </div>
//           </article>
//         `;
//
//         countriesContainer.insertAdjacentHTML('beforeend', html);
//     }
// }

const renderCountry = (data) => {
    const html = `
      <article class="country">
         <img class="country__img" src="${data.flag}" alt="Flag of ${data.name}" />
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

const requestAllCountries = () => {
    loadingSpinner.style.display = 'inline-block';
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(el => renderCountry(el));
        })
        .finally(() => {
            countriesContainer.style.opacity = '1';
            loadingSpinner.style.display = 'none';
        });
};

const requestCountry = (countryName) => {
    loadingSpinner.style.display = 'inline-block';

    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                renderError('Something went wrong');
            }
        })
        .then(data => {
            clearContainer();
            renderCountry(data[0]);
        })
        .finally(() => {
            countriesContainer.style.opacity = '1';
            loadingSpinner.style.display = 'none';
        });
};

const clearContainer = () => {
    const elemCountries = document.querySelectorAll('.country');

    elemCountries.forEach(el => el.remove());
};

const getCountry = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const countryParam = urlSearchParams.get('country');

    if (countryParam) {
        requestCountry(countryParam);
    }
};


window.addEventListener('load', requestAllCountries);
