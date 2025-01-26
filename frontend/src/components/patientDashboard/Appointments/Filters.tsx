type FiltersProps = {
  primaryFilter: 'History' | 'Upcoming'
  setPrimaryFilter: (filter: 'History' | 'Upcoming') => void
  secondaryFilter: 'All' | 'In-person' | 'Virtual'
  setSecondaryFilter: (filter: 'All' | 'In-person' | 'Virtual') => void
}

const Filters = ({
  primaryFilter,
  setPrimaryFilter,
  secondaryFilter,
  setSecondaryFilter,
}: FiltersProps) => {
  return (
    <div>
      {/* Primary filters */}
      <div className='mb-4 flex items-center gap-4'>
        <button
          onClick={() => setPrimaryFilter('History')}
          className={`rounded-lg px-4 py-2 ${
            primaryFilter === 'History'
              ? 'bg-green-600 text-white'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          History
        </button>
        <button
          onClick={() => setPrimaryFilter('Upcoming')}
          className={`rounded-lg px-4 py-2 ${
            primaryFilter === 'Upcoming'
              ? 'bg-green-600 text-white'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Upcoming
        </button>
      </div>

      {/* Secondary filters */}
      <div className='mb-4 flex items-center gap-4'>
        <button
          onClick={() => setSecondaryFilter('All')}
          className={`rounded-lg px-4 py-2 ${
            secondaryFilter === 'All'
              ? 'bg-green-600 text-white'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSecondaryFilter('In-person')}
          className={`rounded-lg px-4 py-2 ${
            secondaryFilter === 'In-person'
              ? 'bg-green-600 text-white'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          In-person
        </button>
        <button
          onClick={() => setSecondaryFilter('Virtual')}
          className={`rounded-lg px-4 py-2 ${
            secondaryFilter === 'Virtual'
              ? 'bg-green-600 text-white'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Virtual
        </button>
      </div>
    </div>
  )
}

export default Filters
