
import { refs } from './js/refs'
import API from './js/fetchCountries';
import _debounce from '../node_modules/lodash.debounce';
import { onChange } from "./js/onChange";
import { copyItemDblClick } from "./js/copyItemClick";


refs.searchBox.addEventListener('input', _debounce((e) => {
    onChange(e);
  }, refs.DEBOUNCE_DELAY))
refs.countryList.addEventListener('click',  e => {
  refs.searchBox.value = e.target.textContent;
  onChange(e);
});