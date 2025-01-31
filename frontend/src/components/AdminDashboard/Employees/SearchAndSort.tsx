type SearchAndSortProps = {
  searchQuery: string
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  
}

export const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchQuery,
  onSearch,
  
}) => {
  return (
    <div className='mb-4 flex items-center gap-4'>
      <input
        type='text'
        placeholder='Search by doctor name...'
        className='w-full rounded border px-4 py-2'
        value={searchQuery}
        onChange={onSearch}
      />
      
    </div>
  )
}
