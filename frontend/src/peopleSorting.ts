import { Person } from './Person';

export function sortPeople(people: Person[], sortKey: string, sortOrder: string): Person[] {
    let sortedArray: Person[] = [...people];
  
    if (sortKey === 'first_name') {
      sortedArray.sort((a, b) => {
        const nameA = a.first_name.toUpperCase();
        const nameB = b.first_name.toUpperCase();
  
        if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortKey === 'last_name') {
      sortedArray.sort((a, b) => {
        const nameA = a.last_name.toUpperCase();
        const nameB = b.last_name.toUpperCase();
  
        if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
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
    // Toggle the sort order if the same key is clicked
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  } else {
    // Set the new sort key and default to ascending order
    setSortKey(key);
    setSortOrder('asc');
  }
}
