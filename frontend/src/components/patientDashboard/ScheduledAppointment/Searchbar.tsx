// SearchBar.tsx
import React from 'react'

type SearchBarProps = {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <div className='mb-6 lg:w-[90vw]'>
      <label
        htmlFor='search'
        className='mb-2 block text-sm font-medium text-gray-700'
      >
        Search for a doctor
      </label>
      <input
        id='search'
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter doctor's name"
        className='block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-green-500 focus:ring-green-500'
      />
    </div>
  )
}

export default SearchBar
