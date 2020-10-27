import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

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
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ isError, setIsError ] = useState(false)

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
      if(window.confirm(newName + " is already added to phonebook, replace the old number with a new one?")) {
        const person = persons.find(n => n.id === result.id)
        const updatedPerson = { ...person, number: newNumber}

        personService
          .update(result.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== result.id ? person : returnedPerson))
          })
          .catch(error => {
            setNotificationMessage(
              `${newName} was already deleted from server!`
            )
            setIsError(true)
            setTimeout(() => {
              setNotificationMessage(null)
              setIsError(false)
            }, 5000)
          })
        setNotificationMessage(
          `The number for ${updatedPerson.name} was updated.`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }
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
          setNotificationMessage(
            `${personObject.name} was added to the phonebook.`
          )
        })
        .catch((error) => {
          setIsError(true)
          setNotificationMessage('Give both a name and a number!')
        })
      setTimeout(() => {
        setNotificationMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  const deletePerson = (id, name) => {
    if(window.confirm("Delete " + name + "?")) {
      personService
        .exterminate(id)
        .then(returnedPerson => {
          setPersons(persons.filter(n => n.id !== id))
      })

    setNotificationMessage(
      `${name} was deleted from the phonebook.`
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
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

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} isError={isError}/>

      <Filter searchName={searchName} handleNameSearch={handleNameSearch}/>

      <h3>Add a new</h3>

      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} searchName={searchName} Person={Person} deletePerson={deletePerson}/>

    </div>
  )

}

export default App