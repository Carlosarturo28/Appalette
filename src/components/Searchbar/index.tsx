import * as React from 'react'

import './style.css'

export const Searchbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      value={searchQuery}
      onInput={e => setSearchQuery((e.target as HTMLInputElement).value)}
      type="text"
      id="header-search"
      placeholder="Search brands"
      name="s"
    />
  )
}