import React from 'react'

const Filter = ({ searchName, handleNameSearch }) => {
    
    return (
        <form>
            <div>
            filter shown with <input value={searchName} onChange={handleNameSearch} />
            </div>
        </form>
    )
}

export default Filter