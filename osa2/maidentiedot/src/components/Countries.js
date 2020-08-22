import React from 'react'

const Countries = ({ showCountries, filter, Country, handleShowButton }) => {

    //console.log(showCountries)

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
        //console.log(showCountries[0])
        return <Country country={showCountries[0]} />
    }
    else if(!Array.isArray(showCountries)) {
        return <Country country={showCountries} />
    }
    else {
        //console.log(showCountries)
        return (
            <div>
                {showCountries.map((country) => {
                    return (
                        <div key={country.alpha3Code}>
                            <p>{country.name}</p>
                            <button onClick={() => handleShowButton(country)}>show</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Countries