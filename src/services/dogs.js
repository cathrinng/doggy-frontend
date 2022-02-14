const API_URL = process.env.REACT_APP_API_URL;

export function getUsers() {
  return fetch(`${API_URL}/users`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}

export function getUsersById(id) {
  return fetch(`${API_URL}/users/${id}`)
    .then((response) => {
      response.json();
    })
    .then((data) => {
      return data;
    });
}

export async function createUser(user) {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    console.log(response);
    return response.json();
  });
}
