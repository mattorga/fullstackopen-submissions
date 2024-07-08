import countryServices from '../services/countries'
import { useState, useEffect } from 'react'

const Table = ({ countries }) => {

    const [country, setCountry] = useState(0)
    const [weather, setWeather] = useState(0)
    const [languages, setLanguages] = useState(0)

    // Automatic detailed view
    useEffect(() => {
        if (countries.length === 1){
            countryServices
            .getCountry(countries[0])
            .then(country => {
                setCountry(country)
            }).catch(error => console.log(error))
        }
        setCountry(0)
    },[countries.length])

  
    useEffect(() => {
        if (country !== 0){
            countryServices
            .getWeather(country.capital)
            .then(weather => {
                setWeather(weather)
            })

            let langs = []
            for (const key in country.languages){
                langs.push(country.languages[key])
            }
            setLanguages(langs)
            
        }
    }, [country])
   
    if (countries.length > 10) {
        if (countries.length === 250) {
            return(
                <div>
                    {countries.map((country, i) => <p key={i}>{country}</p>)}
                </div>
            )
        }
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else {
        if (countries.length === 1 && country != 0){
            if (weather === 0){
                return null
            }
            return (
                <div>
                    <h1>{country.name.common}</h1>
                    <p>Capital: {country.capital}</p>
                    <p>Area: {country.area} m<sup>2</sup></p>
                    <h2>Languages:</h2>
                    <ul>
                        {languages.map( (language, i) => 
                            <li key={i}>{language}</li>
                        )}
                    </ul>
                    <img src={country.flags.svg} alt={country.flags.png} height="130"/>
                    <h2>Weather in {country.capital}</h2>
                    <p>Temperature: {weather.main.temp} °Celcius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    <p>Wind: {weather.wind.speed} <sup>m</sup>&frasl;<sub>s</sub></p>
                </div>
            )
        }

        return (
            <div>
                {countries.map((country, i) => <p key={i}>{country}</p>)}
            </div>
        )
    }
}

export default Table