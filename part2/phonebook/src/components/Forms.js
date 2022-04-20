const PersonForm = ({
  addPerson,
  newName,
  addNewName,
  newNumber,
  addNewNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <label htmlFor="name">name:</label>
        <input value={newName} onChange={addNewName} id="name" />
        <div>
          <label htmlFor="number">number:</label>
          <input value={newNumber} onChange={addNewNumber} id="number" />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      filter shown with <input value={searchTerm} onChange={handleSearch} />
    </div>
  );
};

export { PersonForm, Filter };
