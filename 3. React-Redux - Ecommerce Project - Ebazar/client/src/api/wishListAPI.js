import { BASE_URL } from '../app/constants';

// import { cookie } from '../auth/authAPI';


export function addToWishList(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/wishlist', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchWishListByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/wishlist',
      /* remove before deployment */
      // {
      //   headers: {
      //     Authorization: 'Bearer ' + localStorage.getItem('cookie')
      //   },
      // }
    )
    const data = await response.json()
    resolve({ data })
  });
}


export function deleteItemFromWishList(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/wishlist/' + itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    resolve({ data });
  });
}
