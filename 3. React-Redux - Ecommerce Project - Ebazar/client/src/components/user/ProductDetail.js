import React, { useEffect, useState } from 'react'
import { StarIcon, ArrowLeftIcon, CheckCircleIcon, HeartIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addToCartAsync, addToWishListAsync, fetchProductByIdAsync, resetNewProduct, selectItems, selectLoggedInUser, selectProductById, selectWishList, updateCartAsync } from '../../redux'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function ProductDetail() {
    const dispatch = useDispatch()
    const product = useSelector(selectProductById)
    const user = useSelector(selectLoggedInUser)
    const params = useParams()

    const [showAlert, setShowAlert] = useState(null)
    const [quantity, setQuantity] = useState(1)

    const wishList = useSelector(selectWishList)
    const cartItems = useSelector(selectItems)

    useEffect(() => {
        dispatch(fetchProductByIdAsync(params.id))
    }, [dispatch, params.id])

    useEffect(() => {
        dispatch(resetNewProduct())
    }, [dispatch])


    const handleQuantity = (e) => {
        setQuantity(+e.target.value)
    }

    const handleWishList = () => {
        const productExistsInWishlist = wishList.some(item => item.product.title === product.title);

        if (productExistsInWishlist) {
            setShowAlert('item');
            setTimeout(() => {
                setShowAlert(null);
            }, 2000);
        } else {
            dispatch(addToWishListAsync({ product: product.id, user: user.id }));
            setShowAlert('wishlist');
            setTimeout(() => {
                setShowAlert(null);
            }, 2000);
        }
    }

    const handleAdd = () => {
        const productInCart = cartItems.find(item => item.product.title === product.title);

        if (product.stock !== 0) {
            if (productInCart) {
                const newQuantity = productInCart.quantity + quantity <= 4 ? productInCart.quantity + quantity : productInCart.quantity
                dispatch(updateCartAsync({ ...productInCart, product: productInCart.product.id, quantity: newQuantity }))
                setShowAlert('cart')
                setTimeout(() => {
                    setShowAlert(null)
                }, 2000)
            } else {
                dispatch(addToCartAsync({ product: product.id, quantity: quantity, user: user.id }))
                setShowAlert('cart')
                setTimeout(() => {
                    setShowAlert(null)
                }, 2000)
            }

        }
    }

    const handleBuy = () => {
        if (product.stock !== 0) {
            dispatch(addToCartAsync({ product: product.id, quantity: quantity, user: user.id }))
        }
    }

    return (
        <div>

            <div
                className={`fixed flex items-center bottom-10 left-1/2 transform -translate-x-1/2  p-3 dark:bg-opacity-50 dark:bg-green-400 bg-green-600 bg-opacity-80 text-white font-bold rounded-md ${showAlert === 'cart' ? 'translate-y-0' : 'translate-y-[120px]'}`}
                style={{
                    transition: 'transform 0.2s ease-in'
                }}>
                <CheckCircleIcon className='w-8 h-8 inline mr-2'></CheckCircleIcon> <span>Added to Cart !</span>
            </div>

            <div
                className={`fixed flex items-center bottom-10 left-1/2 transform -translate-x-1/2  p-3 dark:bg-opacity-50 dark:bg-pink-500 bg-pink-500 bg-opacity-80 text-white font-bold rounded-md ${showAlert === 'wishlist' ? 'translate-y-0' : 'translate-y-[120px]'}`}
                style={{
                    transition: 'transform 0.2s ease-in'
                }}>
                <HeartIcon className='w-8 h-8 inline mr-2'></HeartIcon><span>Added to WishList !</span>
            </div>

            <div
                className={`fixed flex items-center bottom-10 left-1/2 transform -translate-x-1/2  p-3 dark:bg-opacity-50 border dark:border-pink-500 border-pink-500 bg-opacity-80 text-pink-500 font-bold rounded-md ${showAlert === 'itemexists' ? 'translate-y-0' : 'translate-y-[120px]'}`}
                style={{
                    transition: 'transform 0.2s ease-in'
                }}>
                <HeartIcon className='w-8 h-8 inline mr-2'></HeartIcon><span>Already in WishList !</span>
            </div>

            <Link to='/' className='p-2 mb-5 inline-block rounded-md hover:bg-gray-50  dark:text-gray-300 dark:hover:bg-gray-700' ><ArrowLeftIcon className='h-6 w-6 inline-block '></ArrowLeftIcon> Back</Link>

            <div className="bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 rounded-md">
                {product && <div className="pt-6">
                    {/* Breadcrumb  */}
                    <Link to='/' aria-current="page" className="pl-10 text-sm font-medium text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-100 cursor-pointer">
                        Products &gt;
                    </Link>
                    <span className='text-sm font-medium text-gray-500 dark:text-gray-200 cursor-auto'> {product.title} </span>

                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 dark:opacity-85">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                src={product.images && product.images[2]}
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
                                {product.stock === 0 && <p className='text-red-500 dark:text-orange-700'>Out of Stock</p>}
                            </div>


                            <div className='mt-12'>
                                <label className='text-sm font-medium dark:text-gray-300'>Quantity:</label>
                                <select onChange={(e) => handleQuantity(e)}
                                    // value={product.quantity || 1} 
                                    name="Quantity" id="quantity" className='border border-gray-300  dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 rounded-md pt-0 pb-0 ml-4'>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>

                            <button
                                onClick={handleWishList}
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-customBlue bg-white dark:bg-gray-800 px-8 py-3 text-base font-medium text-customBlue hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-customBlue focus:ring-offset-2"
                            >
                                Add to WishList
                            </button>
                            <button
                                onClick={handleAdd}
                                type="submit"
                                className={`mt-2 flex w-full items-center justify-center rounded-md border border-transparent   px-8 py-3 text-base font-medium text-white bg-opacity-80  focus:outline-none focus:ring-2 focus:ring-customBlue focus:ring-offset-2 ${product.stock === 0 ? 'bg-gray-300' : 'bg-customBlue dark:bg-blue-500 hover:bg-opacity-100 dark:hover:bg-blue-600'}`}
                            >
                                Add to Cart
                            </button>
                            <Link to='/checkout'>
                                <button
                                    onClick={handleBuy}
                                    type="submit"
                                    className={`mt-2 flex w-full items-center justify-center rounded-md border border-transparent   px-8 py-3 text-base font-medium text-white   focus:outline-none focus:ring-2 focus:ring-customBlue focus:ring-offset-2 ${product.stock === 0 ? 'bg-gray-300' : 'bg-orange-500 hover:bg-orange-600 '}`}
                                >
                                    Buy Now
                                </button>
                            </Link>

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
                                    <ul  className="list-disc space-y-2 pl-4 text-sm">
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