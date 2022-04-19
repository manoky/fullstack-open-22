import { useState, useEffect } from "react";
import axios from "axios";
import { PersonForm, Filter } from "./components/Forms";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((initialData) => setPersons(initialData))
      .catch((err) => console.error(err));
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
          );
        setNewName("");
        setNewNumber("");
      }
      return;
    }

    personsService
      .create(newPerson)
      .then((person) => setPersons(persons.concat(person)));

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
        .then(() => setPersons(persons.filter((p) => p.id !== person.id)));
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
