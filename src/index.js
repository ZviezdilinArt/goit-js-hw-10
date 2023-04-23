import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  width: '100%',
  position: 'left-bottom',
  fontSize: '30px',
  closeButton: false,
});

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1';
const ENDPOINT = 'translation';
const FILTER_PARAM = '?fields=name,capital,languages,population,flags';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    let userInput = e.target.value.trim();
    if (!userInput) {
      deleteMarkup()  
      return;
    }

    const urlQuery = `${BASE_URL}/${ENDPOINT}/${userInput}/${FILTER_PARAM}&=`;

  fetchCountries(urlQuery)
    .then(data => {
      if (data.length === 1) {
        deleteMarkup();
        countryInfo.innerHTML = createMarkupCountry(data);
      } else if (data.length > 1 && data.length <= 10) {
        deleteMarkup();
        countryList.innerHTML = createMarkupCountryList(data);
      } else {
        deleteMarkup();
        Notify.info('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch(err => {
      deleteMarkup();
      if (err.message === '404') {
        Notify.failure('Oops, there is no country with that name');
      }else {Notify.failure(`Oops,${err.message}`);}
    });
}

function createMarkupCountryList(arr) {
    return arr
      .map(({ flags: { svg }, name: { common } }) => `
        <li class="list">
            <img src="${svg}" alt="${common}" width="50" heigth="40">
            <p>${common}</p>
        </li>`)
      .join('');
}

function createMarkupCountry(arr) {
    return arr
      .map(
        ({
          flags: { svg },
          name: { common },
          capital,
          population,
          languages,
        }) => `
        <div class="list">
        <img src="${svg}" alt="${common}" width="50" heigth="40">
        <h2>${common}</h2>
        </div>
        <p><strong>Capital: </strong><span>${capital}</span></p>
        <p><strong>Population: </strong><span>${population}</span></p>
        <p><strong>Languages: </strong><span>${Object.values(languages).join(', ')}</span></p>
    `
      )
      .join('');
}

function deleteMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  return;
}