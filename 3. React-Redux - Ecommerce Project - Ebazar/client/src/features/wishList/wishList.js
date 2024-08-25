import React from 'react';
import { StarIcon, ArrowLeftIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemFromWishListAsync, selectWishList } from './wishListSlice';
import { Link } from 'react-router-dom';

//TODO: on server, code for sortaoptions
//TODO: in own project, fix json server link to show data for multiple filter options , and pagination for multiple limits


function WishList() {


  const products = useSelector(selectWishList)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteItemFromWishListAsync(id))
  }

  return (
    <div >
      <Link to='/' className='p-2 mb-5 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 inline-block' ><ArrowLeftIcon className='h-6 w-6 inline '></ArrowLeftIcon> Back</Link>



      {/* Product grid */}
      {products.length > 0 ?
        <div className="bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 rounded-md">

          {/* Your content  */}
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8 ">
            <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-8 py-8">
              {products && products.map((product) => (
                <div key={product.product.id} className="group relative border-2 dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:border-transparent rounded-md p-2">
                  <span className='absolute z-10 inset-0 hover:opacity-100 opacity-0'>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className='absolute z-20 top-4 right-4 p-2 text-gray-700 bg-gray-50 border-gray-300 border rounded-full w-10 h-10 text-center hover:bg-white hover:text-black hover:border-gray-500 cursor-pointer'>
                      X
                    </button>
                  <Link to={`/product-detail/${product.product.id}`} className='absolute inset-0'></Link>
                  </span>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 dark:opacity-90 dark:group-hover:opacity-100  lg:h-60">
                    <img
                      src={product.product.thumbnail}
                      alt={product.product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full "
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-medium text-gray-700 dark:text-gray-200">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex gap-2 items-center ">
                        <StarIcon className='h-4 w-4'></StarIcon>
                        {product.product.rating}
                      </p>
                    </div>
                    <div className='flex flex-col items-end'>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">₹{(product.product.price - (product.product.price * (product.product.discountPercentage / 100))).toFixed(2)}</p>
                      <p className="text-sm font-medium line-through text-gray-400 dark:text-gray-500 ">₹{product.product.price}</p>
                    </div>
                  </div>
                  {product.product.stock === 0 && <p className='text-red-500'>out of stock</p>}
                </div>
              ))}
            </div>

          </div>
        </div> :
        products.length === 0 ? <div className='text-center text-gray-400 text-lg w-full'>WishList is Empty</div>
          : <div className='col-span-1 lg:col-span-3'><div className="loader"></div></div>
      }


    </div >
  );
}





export default WishList