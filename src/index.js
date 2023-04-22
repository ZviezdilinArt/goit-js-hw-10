import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


export function createMarkUpForCountry(arr) {
    return arr
      .map(({ name, capital, population, languages, flags }) => {
        return `<li>
          <img src="${flags.svg}" alt="country" width=40 height=auto>
          <h2>${name.official}</h2>
          <p><span>Capital:</span> ${capital}</p>
          <p><span>Population:</span> ${population}</p>
          <p><span>Languages:</span> ${Object.values(languages).join(',')}</p>
        </li>`;
      })
      .join('');
  }
  
  export function createMarkup(arr) {
    return arr
      .map(
        ({ name, flags }) =>
          `<li>
          <img src="${flags.svg}" alt="country" width=40 height=auto>
          <h2>${name.official}</h2>
        </li>`
      )
      .join('');
  }




const DEBOUNCE_DELAY = 300;
