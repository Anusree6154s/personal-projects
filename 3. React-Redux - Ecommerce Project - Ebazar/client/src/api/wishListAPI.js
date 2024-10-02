import { BASE_URL } from '../app/constants';


export function addToWishList(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/wishlist', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchWishListByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/wishlist', { credentials: 'include', })
    const data = await response.json()
    resolve({ data })
  });
}


export function deleteItemFromWishList(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/wishlist/' + itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await response.json();
    resolve({ data });
  });
}
