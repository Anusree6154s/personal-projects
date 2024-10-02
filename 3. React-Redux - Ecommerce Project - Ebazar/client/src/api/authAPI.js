import { BASE_URL } from "../app/constants";

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function LoginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email
    const password = loginInfo.password
    const response = await fetch(BASE_URL + '/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    })
    if (response.ok) {
      const data = await response.json()
      resolve({ data })
    } else {
      const error = await response.text();
      reject(error)
    }

  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(BASE_URL + '/auth/check',
      { credentials: 'include', })
    if (response.ok) {
      const data = await response.json()
      resolve({ data })
    } else {
      const error = await response.text();
      reject(error)
    }
  });
}

export function sendOTP(item) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(BASE_URL + '/auth/sendOTP', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    })
    if (response.ok) {
      const data = await response.json()
      resolve({ data })
    } else {
      const error = await response.json();
      reject({ error })
    }

  });
}

export function resetPassword(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/auth/resetpassword/' + item.userId, {
      method: 'PATCH',
      body: JSON.stringify({ password: item.password }),
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/users/user/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function signOut() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(BASE_URL + '/auth/logout', { credentials: 'include', })
    if (response.ok) {
      resolve({ data: "signout success" })
    } else {
      reject({ data: "signout error" })
    }

  });
}