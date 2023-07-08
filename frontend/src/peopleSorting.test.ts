import { sortPeople } from './peopleSorting';
import { Person } from './Person';

describe('sortPeopleAndDuplicates', () => {
    const people: Person[] = [
      { id: 1, first_name: 'John', last_name: 'Doe', url: 'https://example.com/johndoe' },
      { id: 2, first_name: 'Alice', last_name: 'Smith', url: 'https://example.com/alicesmith' },
      { id: 3, first_name: 'Bob', last_name: 'Johnson', url: 'https://example.com/bobjohnson' },
      { id: 4, first_name: 'Bob', last_name: 'Smith', url: 'https://example.com/bobsmith' },
    ];
  
    it('should sort by last name in ascending order and order duplicates by first name in ascending order', () => {
        const sortedPeople = sortPeople(people, 'last_name', 'asc');
        expect(sortedPeople).toEqual([
            { id: 1, first_name: 'John', last_name: 'Doe', url: 'https://example.com/johndoe' },
            { id: 3, first_name: 'Bob', last_name: 'Johnson', url: 'https://example.com/bobjohnson' },
            { id: 2, first_name: 'Alice', last_name: 'Smith', url: 'https://example.com/alicesmith' },
            { id: 4, first_name: 'Bob', last_name: 'Smith', url: 'https://example.com/bobsmith' },
        ]);
    });

    it('should sort by last name in desecending order and order duplicates by first number in descending order', () => {
        const sortedPeople = sortPeople(people, 'last_name', 'desc');

        expect(sortedPeople).toEqual([
            { id: 4, first_name: 'Bob', last_name: 'Smith', url: 'https://example.com/bobsmith' },
            { id: 2, first_name: 'Alice', last_name: 'Smith', url: 'https://example.com/alicesmith' },
            { id: 3, first_name: 'Bob', last_name: 'Johnson', url: 'https://example.com/bobjohnson' },
            { id: 1, first_name: 'John', last_name: 'Doe', url: 'https://example.com/johndoe' },
        ]);
    });

    it('should sort by first name in ascending order and order duplicates by first name in ascending order', () => {
        const sortedPeople = sortPeople(people, 'first_name', 'asc');

        expect(sortedPeople).toEqual([
            { id: 2, first_name: 'Alice', last_name: 'Smith', url: 'https://example.com/alicesmith' },
            { id: 3, first_name: 'Bob', last_name: 'Johnson', url: 'https://example.com/bobjohnson' },
            { id: 4, first_name: 'Bob', last_name: 'Smith', url: 'https://example.com/bobsmith' },
            { id: 1, first_name: 'John', last_name: 'Doe', url: 'https://example.com/johndoe' },
        ]);
    });

    it('should sort by first name in ascending order and order duplicates by first name in ascending order', () => {
        const sortedPeople = sortPeople(people, 'first_name', 'dec');

        expect(sortedPeople).toEqual([
            { id: 1, first_name: 'John', last_name: 'Doe', url: 'https://example.com/johndoe' },
            { id: 4, first_name: 'Bob', last_name: 'Smith', url: 'https://example.com/bobsmith' },
            { id: 3, first_name: 'Bob', last_name: 'Johnson', url: 'https://example.com/bobjohnson' },
            { id: 2, first_name: 'Alice', last_name: 'Smith', url: 'https://example.com/alicesmith' },
        ]);
    });
});
