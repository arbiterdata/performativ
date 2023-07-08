import axios, { AxiosResponse } from 'axios';

export async function getPeople(): Promise<AxiosResponse> {
  return await axios.get('/api/people');
}

export async function addPerson(firstName: string, lastName: string): Promise<any> {
  try {
    const response = await axios.post('/api/people', {
      first_name: firstName,
      last_name: lastName,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletePerson(personId: number): Promise<boolean> {
  try {
    await axios.delete(`/api/people/${personId}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updatePerson(
  personId: number,
  editedFirstName: string,
  editedLastName: string
): Promise<boolean> {
  try {
    await axios.put(`/api/people/${personId}`, {
      first_name: editedFirstName,
      last_name: editedLastName,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
