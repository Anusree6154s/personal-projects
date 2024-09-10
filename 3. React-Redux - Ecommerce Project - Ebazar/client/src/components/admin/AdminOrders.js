
import { ChevronLeftIcon, ChevronRightIcon, PencilIcon, ArrowDownIcon, ArrowUpIcon, ArrowLeftIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from '../../app/constants';
import { fetchAllOrdersAsync, selectAllOrders, selectTotalOrders, updateOrderAsync } from '../../redux/slices/adminSlice';
import { Link } from 'react-router-dom';

function AdminOrders() {
    const dispatch = useDispatch()
    const orders = useSelector(selectAllOrders)

    const [page, setPage] = useState(1)
    const [editStatusIndex, setEditStatusIndex] = useState(null)
    const [sort, setSort] = useState({ _sort: 'id', _order: 'asc' })
    const [show, setShow] = useState(false)

    const handlePage = (pageNumber) => {
        setPage(pageNumber)
    }

    useEffect(() => {
        const pagination = { _page: page }
        dispatch(fetchAllOrdersAsync({ sort, pagination }))
    }, [sort, page, dispatch])

    const handleUpdateOrder = (e, index) => {
        const order = { ...orders[index], status: e.target.value }
        dispatch(updateOrderAsync(order))
        setEditStatusIndex(null)
        setShow(false)
    }

    const handleSort = () => {
        sort._order === 'asc' ? setSort({ _sort: '_id', _order: 'desc' }) : setSort({ _sort: '_id', _order: 'asc' })
    }

    return (
        <div>
            <Link to='/admin' className='p-2  rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 inline-block' ><ArrowLeftIcon className='h-6 w-6 inline '></ArrowLeftIcon> Back</Link>

            {/* component */}
            <table className="min-w-max w-full lg:w-full  min-h-screen overflow-auto table-auto  bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 shadow-md  my-6 ">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 uppercase  text-sm leading-normal ">
                        <th className="py-3 px-6 text-center ">Sr. No.</th>
                        <th
                            className="py-3 w-20 px-0 text-center md:px-6 md:w-auto"
                            onClick={handleSort}>
                            Order Number
                            {sort._order === 'asc' ?
                                <ArrowUpIcon className='w-6 inline'></ArrowUpIcon> :
                                <ArrowDownIcon className='w-6 inline'></ArrowDownIcon>}

                        </th>
                        <th className="py-3 px-6 text-left hidden lg:table-cell">Items</th>
                        <th className="py-3 px-6 text-left hidden lg:table-cell">Total Amount</th>
                        <th className="py-3 px-6 text-left hidden lg:table-cell">Shipping Address</th>
                        <th className="py-3 px-6 text-center hidden lg:table-cell">Order Date</th>
                        <th className="py-3 px-0 w-10 text-center md:px-6 md:w-auto">Status</th>
                        <th className="py-3 px-0 w-10 text-center md:px-6 md:w-auto">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400 text-sm  font-semibold ">
                    {orders && orders.map((order, index) =>
                        <tr key={index} className="border-b border-gray-200 dark: hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800 cursor-auto">
                            <td className="py-3  px-0 w-10 text-center md:px-6 md:w-auto ">
                                <span className="font-medium ">{(page - 1) * 10 + index + 1}</span>
                            </td>

                            <td className="py-3 w-20 break-all px-0 text-center md:px-6 md:w-auto">
                                <span className="font-medium">{order.id}</span>
                            </td>

                            <td className="py-3 px-6 text-left hidden lg:table-cell">
                                {order.items.map((item, index) =>
                                    <div key={index} className="flex">
                                        <div className="mr-2 ">
                                            <img
                                                className="w-6 h-6 rounded-full"
                                                src={item.product.thumbnail}
                                                alt={item.product.title}
                                            />
                                        </div>
                                        <span>{item.product.title}</span>
                                    </div>
                                )}
                            </td>

                            <td className="py-3 px-6 text-left whitespace-nowrap hidden lg:table-cell">
                                <span className="font-medium ml-8">₹ {order.totalPrice}</span>
                            </td>

                            {order.selectedAddress && (<td className="py-3 px-6 text-left whitespace-nowrap hidden lg:table-cell">
                                <div className="font-medium">{order.selectedAddress.street}, {order.selectedAddress.city}</div>
                                <div className="font-medium">{order.selectedAddress.state}, {order.selectedAddress.country}</div>
                                <div className="font-medium">{order.selectedAddress.pincode}</div>
                            </td>)}

                            {order.date && <td className="py-3 px-6 text-center whitespace-nowrap hidden lg:table-cell">
                                <span className="font-medium">{order.date}</span>
                            </td>}

                            <td className="py-3  px-0 w-10 text-center md:px-6 md:w-auto">
                                {
                                    show && editStatusIndex === index ?
                                        <select onChange={e => handleUpdateOrder(e, index)} className='border border-gray-300 rounded-3xl dark:bg-gray-800 dark:border-gray-600 focus:ring-transparent'>
                                            <option value="" >--choose one--</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Dispatched">Dipatched</option>
                                            <option value="Delivered">Delivered</option>
                                        </select> :
                                        <span className={`font-semibold ${order.status === 'Pending' ? 'bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs' : order.status === 'Dispatched' ? 'bg-yellow-200 text-yellow-900 py-1 px-3 rounded-full text-xs' : 'bg-green-200 text-green-900 py-1 px-3 rounded-full text-xs'}`}>
                                            {order.status}
                                        </span>
                                }
                            </td>

                            <td className="py-3  px-0 w-10 text-center md:px-6 md:w-auto">
                                <PencilIcon
                                    className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110 inline"
                                    onClick={() => { setEditStatusIndex(index); setShow(!show) }}
                                ></PencilIcon>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
            <div>

                <Pagination
                    handlePage={handlePage}
                    page={page}
                    orders={orders}
                ></Pagination>
            </div>

        </div>
    );
}

function Pagination({ handlePage, page }) {
    const totalOrders = useSelector(selectTotalOrders)
    const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE)
    return (

        <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:border-transparent dark:bg-gray-800 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={e => handlePage(page > 1 ? page - 1 : page)}
                    className={`relative inline-flex items-center rounded-md border border-gray-300   px-4 py-2 text-sm font-medium ${(page - 1) < 1 ? 'bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 ' : 'text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 '}`}
                >
                    Previous
                </button>
                <p className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-300">Page {page}</p>
                <button
                    onClick={e => handlePage(page < totalPages ? page + 1 : page)}
                    className={`relative inline-flex items-center rounded-md border border-gray-300   px-4 py-2 text-sm font-medium ${(page + 1) > totalPages ? 'bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 ' : 'text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 '}`}
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p
                        className="text-sm text-gray-700 dark:text-gray-300">
                        Showing <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{page * ITEMS_PER_PAGE > totalOrders ? totalOrders : page * ITEMS_PER_PAGE}</span> of{' '}
                        <span className="font-medium">{totalOrders}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <div
                            onClick={() => handlePage(page > 1 ? page - 1 : page)}
                            className={`relative inline-flex items-center rounded-l-md border px-2 py-2 text-sm font-medium ${(page - 1) < 1 ? 'bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 ' : 'text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 '}`}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5 cursor-pointer"
                                aria-hidden="true"
                            />
                        </div>

                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

                        {Array.from({ length: totalPages }).map((items, index) =>
                            <div
                                key={index}
                                onClick={() => handlePage(index + 1)}
                                aria-current="page"
                                className={`relative z-10 inline-flex items-center dark:border-gray-500 ${(index + 1) === page ? 'bg-customBlue dark:bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-gray-100 '} px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue cursor-pointer ring-gray-300 dark:ring-gray-700  border border-gray-300 `}
                            >
                                {index + 1}

                            </div>
                        )}

                        <div
                            onClick={() => handlePage(page < totalPages ? page + 1 : page)}
                            className={`relative inline-flex items-center rounded-r-md border px-2 py-2 text-sm font-medium ${(page + 1) > totalPages ? 'bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 ' : 'text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 '}`}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                className="h-5 w-5 cursor-pointer"
                                aria-hidden="true" />
                        </div>


                    </nav>
                </div>
            </div>
        </div >
    )
}


export default AdminOrders;