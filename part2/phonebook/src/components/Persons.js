const Persons = ({ persons, handleDelete }) => {
  return (
    <table className="persons-table">
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={() => handleDelete(person)}>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Persons;
