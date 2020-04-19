import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState(
    ''
  )

  const addName = (event) => {
    event.preventDefault()
    const result = persons.find( ({ name }) => name.toLowerCase() === newName.toLowerCase())
    
    if(result!==undefined) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName
      }

      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) =>
          <Person key={person.name} person={person} />        
        )}
      </ul>
    </div>
  )

}

export default App