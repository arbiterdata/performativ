import { Person } from './Person';

export function sortPeople(people: Person[], sortKey: string, sortOrder: string): Person[] {
  let sortedArray: Person[] = [...people];

  if (sortKey === 'first_name') {
    sortedArray.sort((a, b) => {
      const firstNameA = a.first_name.toUpperCase();
      const firstNameB = b.first_name.toUpperCase();

      if (firstNameA < firstNameB) return sortOrder === 'asc' ? -1 : 1;
      if (firstNameA > firstNameB) return sortOrder === 'asc' ? 1 : -1;
      
      const nameA = a.last_name.toUpperCase();
      const nameB = b.last_name.toUpperCase();
      
      return sortOrder === 'asc' ? sameName(nameA, nameB) : sameName(nameA, nameB) * -1

    });
  } else if (sortKey === 'last_name') {
    sortedArray.sort((a, b) => {
      const lastNameA = a.last_name.toUpperCase();
      const lastNameB = b.last_name.toUpperCase();

      if (lastNameA < lastNameB) return sortOrder === 'asc' ? -1 : 1;
      if (lastNameA > lastNameB) return sortOrder === 'asc' ? 1 : -1;
      
      const nameA = a.first_name.toUpperCase();
      const nameB = b.first_name.toUpperCase();

      return sortOrder === 'asc' ? sameName(nameA, nameB) : sameName(nameA, nameB) * -1
    });
  }

  return sortedArray;
}

export function handleSort(
  key: string,
  sortKey: string,
  sortOrder: string,
  setSortKey: React.Dispatch<React.SetStateAction<string | null>>,
  setSortOrder: React.Dispatch<React.SetStateAction<string>>
) {
  if (key === sortKey) {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  } else {
    setSortKey(key);
    setSortOrder('asc');
  }
}

function sameName(
  nameA : string,
  nameB : string,
): number {
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0
}
