import { useState, useEffect } from "react";
import { PersonForm, Filter } from "./components/Forms";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notice, setNotice] = useState({ message: "", type: "" });

  useEffect(() => {
    personsService
      .getAll()
      .then((initialData) => setPersons(initialData))
      .catch(() =>
        setNotice({ message: "Error getting phonebook list", type: "error" })
      );
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(
      (person) =>
        person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace old number with new one?`
        )
      ) {
        personsService
          .update(existingPerson.id, {
            ...existingPerson,
            number: newNumber,
          })
          .then((person) =>
            setPersons(persons.map((p) => (p.id !== person.id ? p : person)))
          )
          .catch(() =>
            setNotice({ message: `Error updating ${newName}`, type: "error" })
          );

        setNotice({ message: `Updated ${newName}`, type: "success" });
        setNewName("");
        setNewNumber("");
      }
      return;
    }

    personsService
      .create(newPerson)
      .then((person) => setPersons(persons.concat(person)))
      .catch(() =>
        setNotice({ message: `Error adding ${newName}`, type: "error" })
      );

    setNotice({ message: `Added ${newName}`, type: "success" });
    setNewName("");
    setNewNumber("");
  };

  const addNewName = (e) => {
    setNewName(e.target.value);
  };

  const addNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personsService
        .remove(person.id)
        .then(() => setPersons(persons.filter((p) => p.id !== person.id)))
        .catch(() =>
          setNotice({
            message: `Information of ${person.name} has already been removed from server`,
            type: "error",
          })
        );

      setNotice({
        message: `Removed ${person.name} from server`,
        type: "error",
      });
    }
  };

  const results = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notice.message}
        setMessage={setNotice}
        type={notice.type}
      />
      <Filter handleSearch={handleSearch} searchTerm={searchTerm} />
      <h3>add a new</h3>
      <PersonForm
        newNumber={newNumber}
        newName={newName}
        addNewName={addNewName}
        addPerson={addPerson}
        addNewNumber={addNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={results} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
