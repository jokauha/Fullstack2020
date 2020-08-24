import React from 'react'

const Persons = ({ persons, searchName, Person, deletePerson }) => {

    return (

        <ul>
            {persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
                .map(shownPerson => {
                    return  <Person key={shownPerson.name} person={shownPerson} exterminatePerson={() => deletePerson(shownPerson.id, shownPerson.name)} />
                })
            }
        </ul>

    )

}

export default Persons