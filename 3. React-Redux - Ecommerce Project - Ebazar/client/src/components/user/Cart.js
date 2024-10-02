import { useDispatch, useSelector } from "react-redux"
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { Link, Navigate } from "react-router-dom"
import { deleteItemFromCartAsync, selectCartStatus, selectItems, updateCartAsync } from "../../redux"

function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(selectItems)
  const status = useSelector(selectCartStatus)

  const totalPrice = items.length > 0 ? items.reduce((amount, item) => item.product.price * item.quantity + amount, 0) : 0
  const totalItems = items.length > 0 ? items.reduce((amount, item) => item.quantity + amount, 0) : 0

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, product: item.product.id, quantity: +e.target.value }))
  }
  const handleDelete = (item) => {
    dispatch(deleteItemFromCartAsync(item.id))
  }

  return (
    <div >
      {!items.length && status === 'idle' && <Navigate to='/' replace={true}></Navigate>}
      <Link to='/' className='p-2 mb-5 inline-block rounded-md hover:bg-gray-50  dark:text-gray-300 dark:hover:bg-gray-700' ><ArrowLeftIcon className='h-6 w-6 inline-block '></ArrowLeftIcon> Back</Link>

      <div className="flex flex-col bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex-1 px-4 py-6 sm:px-6 flow-root">
          <ul className="-my-6 divide-y divide-gray-200 dark:divide-gray-500">
            {items.map((item, index) => (
              <li key={index} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-500">
                  <Link to={`/product-detail/${item.product.id}`}>
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </Link>
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-300">
                      <h3>
                        <a href={item.href}>{item.product.title}</a>
                      </h3>
                      <p className="ml-4">₹ {item.product.price * item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500 ">
                      <label className='mr-3 dark:text-gray-300'>Qty</label>
                      <select onChange={(e) => handleQuantity(e, item)} className='py-0 rounded-md dark:text-gray-200 dark:bg-gray-700' value={item.quantity} name="" id="">
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                      </select>

                    </p>

                    <div className="flex">
                      <button
                        onClick={() => handleDelete(item)}
                        type="button"
                        className="font-medium text-customBlue dark:text-blue-400 "
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>


        </div>

        <div className="border-t border-gray-200 dark:border-gray-600  px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base  font-medium text-gray-900 dark:text-gray-300">
            <p>Subtotal</p>
            <p>₹ {totalPrice}</p>
          </div>
          <div className="flex justify-between text-base my-4 font-medium text-gray-900 dark:text-gray-300">
            <p>Total number of Items</p>
            <p>{totalItems} Items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link to='/checkout'
              className="flex items-center justify-center rounded-md border border-transparent bg-customBlue dark:bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:bg-opacity-100 dark:hover:bg-opacity-80">
              Checkout
            </Link>


          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-300">
            <p>
              or{' '}
              <Link to='/'>
                <button
                  type="button"
                  className="font-medium text-customBlue dark:text-blue-400"

                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>

            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart