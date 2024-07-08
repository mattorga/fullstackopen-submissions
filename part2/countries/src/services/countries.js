import axios from "axios";
const base_url = 'https://api.openweathermap.org/data/2.5/weather?'
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then(response => response.data)
}

const getCountry = name => {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name.toLowerCase()}`)
    return request.then(response => response.data)
}

const getWeather = city => {
    const request = axios.get(`${base_url}&appid=${api_key}&q=${city}&units=metric`)
    return request.then(response => response.data)
}

export default { getAll, getCountry, getWeather }