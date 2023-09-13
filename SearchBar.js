function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
