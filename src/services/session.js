const API_URL = process.env.REACT_APP_API_URL;

export async function getLoginToken({ email, password }) {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
  .then((res) => res.json());
}
