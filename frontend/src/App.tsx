import React, { useState, useEffect } from 'react';
import { addPerson, deletePerson, updatePerson, getPeople } from './peopleApi.ts';
import { Person } from './Person';
import { sortPeople, handleSort } from './peopleSorting.ts';

function App(): JSX.Element {
  const [people, setPeople] = useState<Person[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [firstNameLengthFilter, setFirstNameLengthFilter] = useState<number>(0);

  const editPerson = (personId: number, firstName: string, lastName: string) => {
    setEditingPersonId(personId);
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
  };

  useEffect(() => {
    fetchPeople();

    window.addEventListener('focus', fetchPeople);

    return () => {
      window.removeEventListener('focus', fetchPeople);
    };
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await getPeople();
      setPeople(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPerson = async () => {
    try {
      const newPerson = await addPerson(firstName, lastName);
      setPeople([...people, newPerson]);
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePerson = async (personId: number) => {
    const deleted = await deletePerson(personId);
    if (deleted) {
      setPeople(people.filter((person) => person.id !== personId));
    }
  };

  const handleUpdatePerson = async () => {
    const updated = await updatePerson(editingPersonId!, editedFirstName, editedLastName);
    if (updated) {
      fetchPeople();
      setEditedFirstName('');
      setEditedLastName('');
      setEditingPersonId(null);
    }
  };

  const handleSortClick = (key: string) => {
    handleSort(key, sortKey, sortOrder, setSortKey, setSortOrder);
  };

  const sortedPeople = sortPeople(people, sortKey, sortOrder).filter(
    (person) => person.first_name.length >= firstNameLengthFilter
  );

  return (
    <div>
      <h2>Add Person</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={handleAddPerson}>Add</button>

      <h2>People</h2>
      <input
        type="number"
        placeholder="First name length filter"
        value={firstNameLengthFilter}
        onChange={(e) => setFirstNameLengthFilter(parseInt(e.target.value))}
      />
      <button onClick={() => handleSortClick('first_name')}>
        Sort by First Name ({sortKey === 'first_name' ? sortOrder.toUpperCase() : 'None'})
      </button>
      <button onClick={() => handleSortClick('last_name')}>
        Sort by Last Name ({sortKey === 'last_name' ? sortOrder.toUpperCase() : 'None'})
      </button>

      <ul>
        {sortedPeople.map((person) => (
          <li key={person.id}>
            <span>
              <a href={person.url}>{person.first_name} {person.last_name}</a>
            </span>
            {editingPersonId === person.id ? (
              <>
                <input
                  type="text"
                  value={editedFirstName}
                  onChange={(e) => setEditedFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={editedLastName}
                  onChange={(e) => setEditedLastName(e.target.value)}
                />
                <button onClick={handleUpdatePerson}>Save</button>
                <button onClick={() => setEditingPersonId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => editPerson(person.id, person.first_name, person.last_name)}>Edit</button>
                <button onClick={() => handleDeletePerson(person.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;