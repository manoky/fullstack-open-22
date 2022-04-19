const Search = ({ value, onSearch }) => {
  return (
    <div>
      find countries <input value={value} onChange={onSearch} />
    </div>
  );
};

export default Search;
