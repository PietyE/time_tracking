import React from 'react'
import './style.scss'

function Search({ setSearchTerm }) {
  return (
    <form
      className="search"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <input
        className="search-input"
        type="text"
        placeholder="Search by name"
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
      />
    </form>
  )
}

export default Search
