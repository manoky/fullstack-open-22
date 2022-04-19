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
        name: <input value={newName} onChange={addNewName} />
        <div>
          number: <input value={newNumber} onChange={addNewNumber} />
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
