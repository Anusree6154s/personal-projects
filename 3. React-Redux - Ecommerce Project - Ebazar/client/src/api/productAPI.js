import { BASE_URL } from '../app/constants';
// import { cookie } from '../auth/authAPI';

export function fetchProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/products')
    const data = await response.json()
    resolve(data)
  });
}

export function fetchProductsById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/products/' + id)
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
    const response = await fetch(BASE_URL + `/products?role=${role}&` + queryString,
      /* remove before deployment */
      //  {
      //   headers: {
      //     Authorization: 'Bearer ' + localStorage.getItem('cookie')
      //   },
      // }
    )
    const data = await response.json()
    const totalItemData = await fetch(BASE_URL + `/products?role=${role}&_limit=1000`,
      /* remove before deployment */
      //  {
      //   headers: {
      //     Authorization: 'Bearer ' + localStorage.getItem('cookie')
      //   },
      // }
    )
    const total = await totalItemData.json()
    resolve({ products: data, totalItems: total.length })
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/categories',
      /* remove before deployment */
      //  {
      //   headers: {
      //     Authorization: 'Bearer ' + localStorage.getItem('cookie')
      //   },
      // }
    )
    const data = await response.json()
    resolve(data)
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(BASE_URL + '/brands',
      /* remove before deployment */
      //  {
      //   headers: {
      //     Authorization: 'Bearer ' + localStorage.getItem('cookie')
      //   },
      // }
    )
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
      headers: { 'content-type': 'application/json' }
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

