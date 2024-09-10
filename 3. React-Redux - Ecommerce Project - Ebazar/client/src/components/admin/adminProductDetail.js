import React, { useEffect } from 'react'
import { StarIcon, ArrowLeftIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { selectProductById, fetchProductByIdAsync, resetNewProduct, selectNewProduct, editProductAsync } from '../../../product/productSlice'
import { Link, useParams } from 'react-router-dom'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function ProductDetail() {

    const dispatch = useDispatch()
    const product = useSelector(selectProductById)
    const params = useParams()

    useEffect(() => {
        dispatch(fetchProductByIdAsync(params.id))
    }, [params.id])

    useEffect(() => {
        dispatch(resetNewProduct())
    }, [])


    const handleDelete = () => {
        const product = { ...product }
        product.deleted = true
        dispatch(editProductAsync(product))
    }
    return (
        <div>

            <div className='flex items-center justify-between mb-2 '>
                <Link to='/admin' className='p-2 rounded-md hover:bg-gray-50  dark:text-gray-300 dark:hover:bg-gray-700' ><ArrowLeftIcon className='h-6 w-6 inline-block '></ArrowLeftIcon> Back</Link>
                <div >
                    {product && <Link to={`/admin/edit-product-form/${product.id}?path=productPage`} className='inline-block'>
                        <button className='p-2 block items-center rounded-md h-10 bg-customBlue dark:bg-blue-500 text-sm font-medium text-white bg-opacity-90 hover:bg-opactiy-100 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-customBlue dark:focus:ring-blue-600 focus:ring-offset-2'>
                            Edit
                        </button>
                    </Link>}
                    <button onClick={handleDelete} className='p-2 ml-2 rounded-md h-10 bg-red-500 dark:bg-red-800  text-sm font-medium text-white bg-opacity-90 hover:bg-opactiy-100 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-customBlue dark:focus:ring-red-800 focus:ring-offset-2 '>
                        Delete
                    </button>
                </div>
            </div>


            <div className="bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 rounded-md">
                {product && <div className="pt-6">
                    {/* Breadcrumb  */}
                    <Link to='/admin' aria-current="page" className="pl-10 text-sm font-medium text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-100 cursor-pointer">
                        Products &gt;
                        <span className='text-sm font-medium text-gray-500 dark:text-gray-200 cursor-auto'> {product.title} </span>
                    </Link>

                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 dark:opacity-85">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                src={product.images[2]}
                                alt={product.title}
                                className="h-full w-full object-cover object-center "
                            />
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    src={product.images[3]}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>
                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <img
                                src={product.images[1]}
                                alt={product.title}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 dark:lg:border-gray-500 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-3xl">{product.title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <div className='grid grid-cols-1 gap-y-2'>
                                <span className="text-5xl tracking-tight text-gray-900 dark:text-gray-300">₹ {(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}</span>
                                <div className='flex gap-5'>
                                    <span className=" font-bold text-lg tracking-tight text-red-500 dark:text-orange-500">-{product.discountPercentage}%</span>
                                    <p className="text-lg tracking-tight text-gray-400 dark:text-gray-300">M.R.P: <span className='line-through'>₹ {product.price}</span></p>
                                </div>
                            </div>


                            {/* Reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    product.rating > rating ? 'text-gray-900 dark:text-gray-200' : 'text-gray-200 dark:text-gray-700',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{product.rating} out of 5 stars</p>
                                </div>
                            </div>

                            <div className='mt-6'>
                                {product.deleted && <p className='text-red-500 dark:text-orange-700'>Product is deleted</p>}
                                {product.stock === 0 && <p className='text-red-500 dark:text-orange-700'>Out of Stock</p>}
                            </div>


                            <div className='mt-12'>
                                <label className='text-sm font-medium dark:text-gray-300'>Quantity:</label>
                                <select name="Quantity" id="quantity" className='border border-gray-300  dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 rounded-md pt-0 pb-0 ml-4'>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-customBlue bg-white dark:bg-gray-800 px-8 py-3 text-base font-medium text-customBlue hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-customBlue focus:ring-offset-2"
                            >
                                Add to WishList
                            </button>
                            <button
                                type="submit"
                                className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-customBlue dark:bg-blue-500 px-8 py-3 text-base font-medium text-white bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-customBlue focus:ring-offset-2"
                            >
                                Add to Cart
                            </button>
                            <button
                                type="submit"
                                className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-orange-500  px-8 py-3 text-base font-medium text-white  hover:bg-orange-600  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                Buy Now
                            </button>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 dark:lg:border-gray-500 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}

                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900 dark:text-gray-300">{product.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Brand </h3>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{product.brand}</span>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Highlights</h3>
                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {product.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400 dark:text-gray-100">
                                                <span className="text-gray-600 dark:text-gray-400">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default ProductDetail;