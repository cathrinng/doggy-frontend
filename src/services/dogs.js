const API_URL = process.env.REACT_APP_API_URL;

export function getUsers() {
  return fetch(`${API_URL}/users`)
    .then((response) => {
      response.json();
    })
    .then((data) => {
      return data;
    });
}

export function getUsersById(id) {
  return fetch(`${API_URL}/users/${id}`)
    .then((response) => response.json())
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

export function getUserMatchesById(myId, matchId) {
  return fetch(`${API_URL}/messages/${myId}/${matchId}`)
  .then((response) => response.json())
  .then((data) => {
    return data;
  });
}

export function getMessages(myId, matchId) {
  return fetch(`${API_URL}/messages/${myId}/${matchId}`)
  .then((response) => response.json())
  .then((data) => {
    return data;
  });
}

export function postMessage(message, toUserId) {
  return fetch(`${API_URL}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('doggytoken')
    },
    body: JSON.stringify({ 
      message,
      toUserId
    })
  })
  .then((res) => res.json());
}
