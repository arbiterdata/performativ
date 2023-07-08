import { sortPeople } from './peopleSorting';
import { Person } from './Person';

describe('sortPeople', () => {
  const people: Person[] = [
    { id: 1, first_name: 'John', last_name: 'Doe', url: 'https://example.com/johndoe' },
    { id: 2, first_name: 'Alice', last_name: 'Smith', url: 'https://example.com/alicesmith' },
    { id: 3, first_name: 'Bob', last_name: 'Johnson', url: 'https://example.com/bobjohnson' },
  ];

  it('should sort people by first name in ascending order', () => {
    const sortedPeople = sortPeople(people, 'first_name', 'asc');

    expect(sortedPeople).toEqual([
      { id: 2, first_name: 'Alice', last_name: 'Smith', url: 'https://example.com/alicesmith' },
      { id: 3, first_name: 'Bob', last_name: 'Johnson', url: 'https://example.com/bobjohnson' },
      { id: 1, first_name: 'John', last_name: 'Doe', url: 'https://example.com/johndoe' },
    ]);
  });

  it('should sort people by last name in descending order', () => {
    const sortedPeople = sortPeople(people, 'last_name', 'desc');

    expect(sortedPeople).toEqual([
        { id: 2, first_name: 'Alice', last_name: 'Smith', url: 'https://example.com/alicesmith' },
        { id: 3, first_name: 'Bob', last_name: 'Johnson', url: 'https://example.com/bobjohnson' },
        { id: 1, first_name: 'John', last_name: 'Doe', url: 'https://example.com/johndoe' },
    ]);
  });
});