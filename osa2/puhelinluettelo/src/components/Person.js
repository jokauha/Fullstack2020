import React from 'react'

const Person = ({ person, exterminatePerson }) => {
    return (
        <li>
            {person.name}
            {person.number}
            <button onClick={exterminatePerson}>delete</button>
        </li>
    )
}

export default Person