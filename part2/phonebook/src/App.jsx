import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, onChange}) => {
  return (
    <div>
      filter shown with
      <input value={value} onChange={onChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmit}>
        <div>
          name:
          <input value={props.name} onChange={props.onNameChange}/>
        </div>
        <div>
          number:
          <input value={props.number} onChange={props.onNumberChange}/>
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

const Persons = ({persons}) => persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') // For controlling form element
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [showAll, setShowAll] = useState('') // False - filter has value

  useEffect(() => {axios
    .get('http://localhost:3001/persons')
    .then(response =>{
      setPersons(response.data)
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    
    if (persons.some(person => person.name === newName)){
      alert(`${newName} already exists`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
    event.target.value.length > 0 || event.target.value.length != '' 
    ? setShowAll(false) 
    : setShowAll(true)
  }

  const personsToShow = showAll 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(filterName))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filterName} onChange={handleFilterChange}/>

      <h2>add a new</h2>

      <PersonForm 
        onSubmit={addPerson} 
        name={newName} onNameChange={handleNameChange}
        number={newNumber} onNumberChange={handleNumberChange} 
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} />

    </div>
  )
}

export default App