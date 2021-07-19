import Notiflix from "notiflix";

export const fetchCountries = (name) => {
    Notiflix.Loading.hourglass()
    let countryUrl;
    if (name) { 
        countryUrl = `https://restcountries.eu/rest/v2/name/${name}`;
        countryUrl += `?fields=name;capital;population;flag;languages`;
    } else {
        countryUrl = `https://restcountries.eu/rest/v2/all`;
    }
    return fetch(countryUrl)
        .then(responce => {
            Notiflix.Loading.remove();
            if (responce.ok) {
                return responce.json()
            }
            else {
                
                return [];
            }
        })
        .then(data => data)
        .catch(e => e);
}

