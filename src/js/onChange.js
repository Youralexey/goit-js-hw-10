import { fetchCountries } from "./fetchCountries";
import { refs } from "./refs";
import listTpl from '../templates/countries.hbs';
import infoTpl from '../templates/country-card.hbs';
import Notiflix from "notiflix";


export const onChange = e => {
    let inputValue;
    if (!e.srcElement.value) {
        inputValue = e.target.textContent.value.trim()
    } else {
        inputValue = e.srcElement.value.trim();
    }
    for (let i = 0; i < inputValue.length; i++) {
        if (parseInt(inputValue[i])) {
            Notiflix.Notify.failure(refs.FAILURE_MESSAGE);
            createList({ error: ' ' });
            return;
        }
    };
    if (inputValue.length < 2) {
        createList({ error: ' ' }); //для вывода ошибки на экран
        if (inputValue.length !== 0) Notiflix.Notify.info(refs.INFO_MESSAGE);
        return;
    }
    fetchCountries(inputValue)
        .then(countries => {
            const len = countries.length;
            if (len === 0) {
                createList({ error: ' ' }); //для вывода ошибки на экран
                Notiflix.Notify.failure(refs.FAILURE_MESSAGE);
            };
            if (len === 1) {
                let country = countries[0];
                country.stringLanguages = '';
                country.languages.forEach(lang => {
                    country.stringLanguages += lang.name + ',';
                });
                country.stringLanguages = country.stringLanguages.slice(0, -1);
                createInfo(country);
            }
            if (len > 1 && len <= 10) {
                createList(countries);
            }
            if (len > 10) {
                createList({ error: ' ' }); //для вывода ошибки на экран
                Notiflix.Notify.info(consts.INFO_MESSAGE);
            }
        })  
        .catch(e => console.log(e));
};

const createList = (obj) => {
    if (obj.error) {
      refs.countryList.innerHTML = `<li class="country-list__item">${obj.error}</li>`;
        refs.countryInfo.innerHTML = '<p></p>';
        return;
    }
      refs.countryList.innerHTML = obj.map(el => listTpl(el)).join('');
      refs.countryInfo.innerHTML = '<p></p>';
}
const createInfo = (arr) => {
      refs.countryInfo.innerHTML = infoTpl(arr);
      refs.countryList.innerHTML = '<p></p>';
}