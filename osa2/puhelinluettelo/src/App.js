import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {

  /*
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) */
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const result = persons.find( ({ name }) => name.toLowerCase() === newName.toLowerCase())

    if(result!==undefined) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameSearch = (event) => {
    setSearchName(event.target.value)
  }

  const deletePerson = (id, name) => {
    if(window.confirm("Delete " + name)) {
      personService
        .exterminate(id)
        .then(returnedPerson => {
          setPersons(persons.filter(n => n.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchName={searchName} handleNameSearch={handleNameSearch}/>

      <h3>Add a new</h3>

      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={persons} searchName={searchName} Person={Person} deletePerson={deletePerson}/>

    </div>
  )

}

export default App