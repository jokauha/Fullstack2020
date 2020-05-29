import React from 'react'

const Countries = ({ showCountries, filter, Country }) => {

    if(filter.length === 0) {
        return <p>Too many matches, specify another filter</p>
    }
    else if(showCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    else if(showCountries.length === 0) {
        return <p>No matches</p>
    }
    else if(showCountries.length === 1) {
        console.log(showCountries[0])
        return <Country country={showCountries[0]} />
    }
    else {
        return (
            <div>
                {showCountries.map((country) => {
                    return <p key={country.alpha3Code}>{country.name}</p>
                })}
            </div>
        )
    }
    

}

export default Countries