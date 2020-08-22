import React from 'react'

const Filter = ({ searchCountry, handleCountrySearch }) => {

    return (
        <form>
            <div>
            find countries <input value={searchCountry} onChange={handleCountrySearch} />
            </div>
        </form>
    )
}

export default Filter