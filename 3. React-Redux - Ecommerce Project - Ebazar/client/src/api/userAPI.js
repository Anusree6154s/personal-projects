import { BASE_URL } from '../app/constants';

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/users/user/',
      { credentials: 'include', }  )
    const data = await response.json()
    resolve({ data })
  }
  );
}



export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/orders?user=' + userId,{credentials: 'include',}   )
    const data = await response.json()
    resolve({ data })
  }
  );
}
