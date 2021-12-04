import { useState, useEffect } from 'react';
import person from './services/phonebook';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    person.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id) => {
    const people = persons.find((person) => person.id === id);
    const konfirm = window.confirm(`Delete ${people.name}`);

    if (konfirm) {
      person.deletePerson(id).then((_) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const personToShow =
    filter.length < 1
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  const handleSubmit = (event) => {
    event.preventDefault();
    const duplicate = persons.find((person) => person.name === newName);
    const insertNewPerson = { name: newName, number: newNumber };
    if (duplicate) {
      const konfirm = window.confirm(
        `${duplicate.name} is already added to the phone book, replace with a new number?`
      );

      if (konfirm) {
        const newContact = { ...duplicate, number: newNumber };
        person.updatePhoneBook(duplicate.id, newContact).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === duplicate.id ? response : person
            )
          );
        });
      }
      return;
    }
    person.create(insertNewPerson).then((response) => {
      setPersons(persons.concat(response));
    });

    setNewName('');
    setNewNumber('');
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personToShow.map((person) => (
          <div key={person.id}>
            {person.name} {person.number}{' '}
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
