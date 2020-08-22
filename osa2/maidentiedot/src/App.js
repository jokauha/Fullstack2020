import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries'
import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {

 const [ allCountries, setAllCountries ] = useState([])
 const [ searchCountry, setSearchCountry ] = useState('')
 const [ showCountries, setShowCountries ] = useState([])


 const countriesToShow = (props) => {
   var showCountries = []
   allCountries.map((country) => {
     //console.log(country.name)
     if(country.name.toLowerCase().includes(props.toString().toLowerCase()) && props.toString() !== '') {
       //console.log(country)
       showCountries.push(country)
       //console.log({showCountries})
     }
     return showCountries
   })
   setShowCountries(showCountries)
 }

  useEffect(() => {
    axios
      .get('http://restcountries.eu/rest/v2/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleCountrySearch = (event) => {
    setSearchCountry(event.target.value)
    countriesToShow(event.target.value)
    //console.log({showCountries})
  }

  const handleShowButton = (props) => {
    setShowCountries(props)
  }

  return (
    <div>
      <Filter searchCountry={searchCountry} handleCountrySearch={handleCountrySearch} />

      <Countries showCountries={showCountries} filter={searchCountry} Country={Country} handleShowButton={handleShowButton}/>
    </div>
  )
}

export default App;
