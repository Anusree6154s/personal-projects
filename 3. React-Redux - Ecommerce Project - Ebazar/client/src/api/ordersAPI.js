import { BASE_URL } from '../app/constants';

export function createOrder(item) {
    return new Promise(async (resolve) => {
        const response = await fetch(BASE_URL + '/orders', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: { 'content-type': 'application/json' }
        })
        const data = await response.json()
        resolve({ data })
    }
    );
}

export function makePayment(item) {
    return new Promise(async (resolve) => {
        // const stripe = await loadStripe('pk_test_51OzsYKSEvg4ni96G0o8oXWwkoOKQ4IgvrNnPF86rxihl5866nDtsS6LzY8i6HEpgvukiPOgofvzO3qUj1yW1E1Wy00BsBbS4Jo');
        const response = await fetch(BASE_URL + '/create-payment-intent', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: { 'content-type': 'application/json' }
        })
        const data = await response.json()
        resolve({ data: data.clientSecret })
    }
    );
}