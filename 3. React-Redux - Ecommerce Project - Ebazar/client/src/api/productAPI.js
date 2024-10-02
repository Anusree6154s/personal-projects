import { BASE_URL } from '../app/constants';

export function fetchProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/products', { credentials: 'include', })
    const data = await response.json()
    resolve(data)
  });
}

export function fetchProductsById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/products/' + id, { credentials: 'include', })
    const data = await response.json()
    resolve(data)
  });
}

export function fetchProductsByFilters(role, filter, sort, pagination) {
  let queryString = ``
  for (let key in filter) {
    const categoryValues = filter[key]
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`

  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}`
  }


  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + `/products?role=${role}&` + queryString, { credentials: 'include', })
    const data = await response.json()
    const totalItemData = await fetch(BASE_URL + `/products?role=${role}&_limit=1000`, { credentials: 'include', })
    const total = await totalItemData.json()
    resolve({ products: data, totalItems: total.length })
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/categories', { credentials: 'include', } )
    const data = await response.json()
    resolve(data)
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/brands', { credentials: 'include', } )
    const data = await response.json()
    resolve(data)
  }
  );
}

//admin
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    })
    const data = await response.json()
    resolve(data)
  }
  );
}

export function editProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/products/' + product.id, {
      method: 'PATCH',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve(data)
  }
  );
}

