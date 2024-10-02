import { BASE_URL } from '../app/constants';


export function fetchAllOrders(sort, pagination) {
  let queryString = ''
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`

  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}`
  }
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/orders/admin?' + queryString, {credentials: true,})
    const data = await response.json()
    const totalOrderData = await fetch(BASE_URL + '/orders/admin?_limit=1000')
    const total = await totalOrderData.json()
    resolve({ orders: data, totalOrders: total.length })
  });
}


export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/orders/' + order.id, {
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
      credentials: true,
    })
    const data = await response.json()
    resolve({ data })
  });
}


