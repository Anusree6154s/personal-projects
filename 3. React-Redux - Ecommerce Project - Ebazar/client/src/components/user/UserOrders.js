import { useEffect } from "react";
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectLoggedInUser, selectUserOrders } from "../../redux";

//TODO: add arrival date in form of Thu, 24 Apr 2024

function UserOrders() {
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)
    const orders = useSelector(selectUserOrders)
    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync(user.id))
    }, [dispatch, user.id])


    return (
        <>
            <Link to='/' className='p-2 mb-5 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 inline-block' ><ArrowLeftIcon className='h-6 w-6 inline '></ArrowLeftIcon> Back</Link>

            {orders
                && orders.map((order, index) =>

                    <div key={index} className="flex flex-col bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 max-w-7xl px-6 py-8 sm:px-6 lg:px-8 mb-6">
                        <div className="mb-8 flex justify-between">
                            <span className="text-gray-900 dark:text-gray-300 font-bold text-2xl ">Order #{order.id}</span>
                            {order.date && <span className="text-gray-400 dark:text-gray-500 font-md text-lg">Ordered on: {order.date}</span>}
                        </div>

                        <div className="flex flex-col border dark:border-gray-500 px-4 py-2  sm:px-6">
                            <p className="text-gray-900 dark:text-gray-300 font-bold text-lg">Items:</p>
                            <div className="flex-1 py-6 flow-root">
                                <ul  className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                                    {order.items.map((item, index) => (
                                        <li key={index} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md ">
                                                <img
                                                    src={item.product.thumbnail}
                                                    alt={item.product.title}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100">
                                                        <h3>
                                                            {item.product.title}
                                                        </h3>
                                                        <p className="ml-4">₹ {item.product.price * item.quantity}</p>
                                                    </div>
                                                    <p className="dark:text-gray-300">Qty: {item.product.quantity}</p>
                                                    <p className={`mt-1 text-sm ${order.status === 'Pending' ? 'text-red-700 dark:text-orange-500' : order.status === 'Dispatched' ? 'text-yellow-600' : 'text-green-600'} `}>Order Status: {order.status}</p>
                                                    {order.date && order.status !== 'Delivered' && <p className="mt-1 text-sm dark:text-gray-400"> Delivery Expected By:<span className="font-bold dark:text-gray-300 "> {`${parseInt(order.date.split("-")[0]) + 7}-${order.date.substring(3)}`}</span></p>}
                                                </div>

                                            </div>
                                        </li>
                                    ))}
                                </ul>


                            </div>

                            <div className="border-t border-gray-300 dark:border-gray-700  px-4 pt-6 sm:px-6">
                                <div className="flex justify-between text-base  font-medium text-gray-900 dark:text-gray-300">
                                    <p>Subtotal</p>
                                    <p>₹ {order.totalPrice}</p>
                                </div>
                                <div className="flex justify-between text-base my-4 font-medium text-gray-900 dark:text-gray-300">
                                    <p>Total number of Items</p>
                                    <p>{order.totalItems} Items</p>
                                </div>
                            </div>
                        </div>

                        {order.selectedAddress &&
                            <div className="border dark:border-gray-500 mt-6 space-y-2 items-baseline p-5 px-4 py-6 sm:px-6">
                                <p className="text-gray-900 dark:text-gray-300 font-bold text-lg">{order.status !== 'Delivered' ? 'Shipping to:' : 'Shipped To:'}</p>
                                <div className=" flex justify-between   ">
                                    <div className="hidden shrink-0 sm:flex sm:flex-col  ">
                                        <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">{order.selectedAddress.name}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-300">{order.selectedAddress.city}</p>
                                    </div>

                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900 dark:text-gray-100">{order.selectedAddress.phone}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-300">{order.selectedAddress.pincode}</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )

            }
        </>
    );
}

export default UserOrders;