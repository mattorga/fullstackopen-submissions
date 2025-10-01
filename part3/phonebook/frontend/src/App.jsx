import { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') // For controlling form element
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [showAll, setShowAll] = useState('') // False - filter has value
  const [notificationMessage, setNotification] = useState(null)
  const [error, setError] = useState(null)

  // GETS information from the db
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    }).catch(error =>
      console.log(error)
    )
  },[]);

  // POSTS (adds) data into the db
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const target = persons.find(person => person.name === newName)

    if (target){
      if (target.number !== newNumber){
        if(window.confirm(`${target.name} is already added to phonebook, replace the old number with a new one?`)){
          const changedPerson = {...target, number: newNumber}
          personService
            .update(target._id, changedPerson)
            .then(updatedPerson => {
              setPersons(persons
                .map(person => 
                  person._id !== target._id // Does the current person and target person ID match?
                  ? person // Add current person to persons
                  : updatedPerson // Add updated (response) person to persons instead
                ))
            })
            .catch (error => {
              console.log(error)
              setNotification(`Information on ${target.name} has already been removed from the server`)
              setError(true)

              setTimeout(() => {
                setNotification(null)
                setError(null)
              }, 5000)
            })
        }
      } else {
        alert(`${newName} is already added to the phonebook`)
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${returnedPerson.name}`)
          setError(false)

          setTimeout(() => {
            setNotification(null)
            setError(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          alert('There was an error adding the person.')
        })
    }
  }

  // DELETES data from the db
  const deletePerson = id => {
    const target = persons.find(person => id === person._id)

    if(window.confirm(`Delete ${target.name} ?`)){
      personService
      .remove(id)
      .then(       
        setPersons(persons.filter(person => id !== person._id))
      ).catch (error => console.log(error))
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

      <Notification message={notificationMessage} isError={error}/>

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
          key={person._id}
          person={person}
          remove={() => deletePerson(person._id)}
        />
      )}

    </div>
  )
}

export default App