import { useEffect, useState } from 'react'

import Table from './components/Table'
import SearchBar from './components/SearchBar'

import countryService from './services/countries'

function App() {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState(null)
  const [filteredCountries, setFilter] = useState({})
  const [showAll, setShowAll] = useState(true)


  // 1. Get all countries
  useEffect(() => {
    countryService
    .getAll()
    .then(countries => setAllCountries(
      countries.map(country=>country.name.common))
      )
    .catch (error => console.log('error'))
    }, [])

  if (!allCountries) {
    return null
  }
  
  // 2. Filter countries based on search
  const countriesToShow = showAll
  ? allCountries
  : allCountries.filter(country => country.toLowerCase().includes(search))

  const handleOnChange = (event) => {
    setSearch(event.target.value)
    if (event.target.value.length>0){
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }

  return (
    <>
      <SearchBar search={search} onChange={handleOnChange} />
      <Table countries={countriesToShow} />
    </>
  )
}

export default App
