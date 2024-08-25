import { BASE_URL } from '../../app/constants';
// import { cookie } from '../auth/authAPI';

export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/cart',
      /* remove before deployment */
      // {
      //   headers: {
      //     Authorization: 'Bearer ' +  localStorage.getItem('cookie')
      //   },
      // }
    )
    const data = await response.json()
    resolve({ data })
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/cart/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/cart/' + itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    resolve({ data });
  });
}

export async function resetCart(userId) {
  // [in case of server cart reset] fetch all items of user's cart and delete ech item
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId)
    const items = response.data
    for (let item of items) {
      await deleteItemFromCart(item.id)
    }
    resolve({ status: 'success' });
  });

}
