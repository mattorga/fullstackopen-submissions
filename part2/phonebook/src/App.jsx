import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({person, remove}) =>  
  <p key={person.id}>
    {person.name} {person.number}
    <button onClick={remove}>delete</button>
  </p>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') // For controlling form element
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [showAll, setShowAll] = useState('') // False - filter has value

  // GETS information from the db
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    }).catch(error =>
      console.log('fail')
    )
  },[]);

  // POSTS (adds) data into the db
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    };
    
    if (persons.some(person => person.name === newName)){
      alert(`${newName} already exists`)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('fail')
        })
    }
  }
  const deletePerson = id => {

    const remainingPersons = persons.filter(person => id !== person.id)

    personService
    .remove(id)
    .then(deletedPerson => {
      setPersons(remainingPersons)
    })
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

      {personsToShow.map(person => 
        <Persons 
          key={person.id} 
          person={person}
          remove={() => deletePerson(person.id)}
        />
       )}

    </div>
  )
}

export default App