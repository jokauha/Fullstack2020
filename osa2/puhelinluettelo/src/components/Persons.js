import React from 'react'

const Persons = ({ persons, searchName, Person}) => {

    return (

        <ul>
            {persons.map((person) => {
            if(person.name.toLowerCase().includes(searchName.toLowerCase())) {
                return  <Person key={person.name} person={person} />
            }
            else return void 0
            }    
            )}
        </ul>

    )

}

export default Persons