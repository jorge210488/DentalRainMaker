type SearchAndSortProps = {
    searchQuery: string;
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    sortField: "name" | "age" | null;
    sortOrder: "asc" | "desc" | null;
    onSort: (field: "name" | "age") => void;
  };
  
  export const SearchAndSort: React.FC<SearchAndSortProps> = ({
    searchQuery,
    onSearch,
    sortField,
    sortOrder,
    onSort,
  }) => {
    return (
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="px-4 py-2 border rounded w-full"
          value={searchQuery}
          onChange={onSearch}
        />
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => onSort("name")}
        >
          Sort by Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => onSort("age")}
        >
          Sort by age {sortField === "age" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
      </div>
    );
  };
  