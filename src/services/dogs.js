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

export function getPotentialMatchesByUserId(id) {
  return fetch(`${API_URL}/swipecards/${id}`)
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

export async function editUser(user) {
  return fetch(`${API_URL}/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export function postMessage(message, id) {
  return fetch(`${API_URL}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('doggytoken')
    },
    body: JSON.stringify({ 
      newMessage: message,
      toUserId: id
    })
  })
  .then((res) => res.json());
}

export function postReaction(userId, boolean) {
  return fetch(`${API_URL}/swipecards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('doggytoken')
    },
    body: JSON.stringify({ 
      to_user_id: userId,
      likes: boolean
    })
  })
  .then((res) => res.json());
}

export function getDogBreeds() {
  return fetch(`https://api.thedogapi.com/v1/breeds`, {
    headers: {
      "x-api-key": "7c5c1b88-b0d3-4fe8-be31-4111a3eb5eed"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

