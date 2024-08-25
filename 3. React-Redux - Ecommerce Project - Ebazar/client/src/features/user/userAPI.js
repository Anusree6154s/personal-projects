import { BASE_URL } from '../../app/constants';
import { cookie } from '../auth/authAPI';

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/users/user/',
        /* remove before deployment */
    // {
    //   headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('cookie')
    //   },
    // }
    )
    const data = await response.json()
    resolve({ data })
  }
  );
}



export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/orders?user=' + userId,
        /* remove before deployment */
    // {
    //   headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('cookie')
    //   },
    // }
    )
    const data = await response.json()
    resolve({ data })
  }
  );
}
