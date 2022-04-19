import { useState, useEffect } from "react";
import axios from "axios";
import { PersonForm, Filter } from "./Forms";
import Persons from "./Persons";

const API_URL = "http://localhost:3001";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = () => {
    axios
      .get(`${API_URL}/persons`)
      .then((res) => setPersons(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(fetchData, []);

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: Math.max(...persons.map((person) => person.id)) + 1,
    };

    const exist = persons.find((person) => person.name === newName);

    if (exist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(newPerson));
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
      <Persons persons={results} />
    </div>
  );
};

export default App;
