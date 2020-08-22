import React from 'react'

const Country = ({ country }) => {
    console.log(country)
    return (
        <div>
            <h1>{country.name}</h1>

            <p>capital {country.capital}</p>
            <p>population {country.population}</p>

            <h2>languages</h2>
            <ul>
                {country.languages.map((language) => {
                    return <li key={language.iso639_1}>{language.name}</li>
                })}
            </ul>
            <img src={country.flag} alt="flag" width="200"></img>
        </div>
    )
}

export default Country