import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { selectLoggedInUser, updateUserAsync } from "../../auth/authSlice";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { selectUserInfo } from "../../user/userSlice";

//TODO: payment will be added when working on server

function AdminProfile() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)

    const [addFormVisibility, setaddFormVisibility] = useState(false)

    const handleAdd = (data) => {
        if (data.image2.length!==0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                dispatch(updateUserAsync({
                    ...user,
                    name: data.name,
                    image: data.image,
                    phone: data.phone,
                    image: data.image || e.target.result,
                    address: {
                        ...user.address,
                        place: data.place,
                        street: data.street,
                        city: data.city,
                        state: data.state,
                        country: data.country,
                        pincode: data.pincode
                    }
                }))
            };
            reader.readAsDataURL(data.image2[0]);
        } else {
            dispatch(updateUserAsync({
                ...user,
                name: data.name,
                image: data.image,
                phone: data.phone,
                image: data.image || null,
                address: {
                    ...user.address,
                    place: data.place,
                    street: data.street,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    pincode: data.pincode
                }
            }))
        }


    }

    
    return (
         <>
            <div className="mb-5 flex justify-between">
                <Link to='/admin' className='p-2 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 inline-block' ><ArrowLeftIcon className='h-6 w-6 inline '></ArrowLeftIcon> Back</Link>

                <button
                    onClick={() => {
                        user.name && setValue('name', user.name)
                        user.image && setValue('image', user.image)
                        user.image && setValue('image2', user.image)
                        user.phone && setValue('phone', user.phone);
                        if (user.address) {
                            user.address.place && setValue('place', user.address.place);
                            user.address.street && setValue('street', user.address.street);
                            user.address.city && setValue('city', user.address.city);
                            user.address.state && setValue('state', user.address.state);
                            user.address.country && setValue('country', user.address.country);
                            user.address.pincode && setValue('pincode', user.address.pincode);
                        }
                        setaddFormVisibility(!addFormVisibility)
                    }}
                    className={"rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue " + (addFormVisibility ? "hidden mt-6" : "")}>
                    Edit
                </button>
            </div>

            {user
                ? <div className=" bg-white dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-800 max-w-7xl px-6 py-14 sm:px-6 lg:px-8 mb-6">
                    <div className={`flex flex-col items-center gap-10  ${!addFormVisibility ? '' : "hidden mt-6"}`}>

                        <img src={user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZbXR5XmpH1OOJhigJF4nWkJIITHis1Y4dA&s"} alt="image" className="w-40 h-40 rounded-full" />

                        <div className="inline-flex text-gray-900 dark:text-gray-300 text-xl font-medium flex-col gap-5 ">
                            {user.name && <p>Name: <span className="ml-12 font-normal dark:text-gray-400">{user.name}</span></p>}
                            <p>Email: <span className="ml-12 font-normal dark:text-gray-400">{user.email}</span></p>
                            <p>Role: <span className="ml-14 font-normal dark:text-gray-400">{user.role}</span></p>
                            {user.address && <div className="flex ">
                                <p>Address: </p>
                                <div className="ml-7 font-normal dark:text-gray-400 flex flex-col">
                                    <span>{user.address.place}, {user.address.street} </span>
                                    <span>{user.address.city}, {user.address.state}</span>
                                    <span>{user.address.country}, {user.address.pincode}</span>
                                </div>
                            </div>}
                            {user.phone && <p>Phone: <span className="ml-8 font-normal dark:text-gray-400">{user.phone}</span></p>}
                        </div>
                    </div>

                    <form
                        noValidate
                        onSubmit={handleSubmit((data) => {
                            handleAdd(data)
                            setaddFormVisibility(!addFormVisibility)
                        })}
                        className={addFormVisibility ? '' : "hidden mt-6"}
                    >
                        <div className="pt-6 border-b border-gray-300 dark:border-gray-700 pb-12  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    Full name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('name')}
                                        id="name"
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full ">
                                <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    Profile Image
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('image')}
                                        id="image"
                                        autoComplete="image"
                                        placeholder="Place image url here"
                                        className=" w-1/2 rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6 "
                                    />
                                    <span className="mx-2 text-sm leading-6 font-medium text-gray-900 dark:text-gray-300">OR</span>
                                    <input
                                        type="file"
                                        {...register('image2')}
                                        id="image2"
                                        autoComplete="image2"
                                        className="w-50 rounded-md  py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                                    />

                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        {...register('country')}
                                        autoComplete="country"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:bg-gray-800 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>India</option>
                                        <option>China</option>
                                        <option>Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="place" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    Place
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('place')}
                                        id="place"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('street')}
                                        id="street"
                                        autoComplete="street"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.street && <p className="text-red-500">* required</p>}
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('city')}
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-cutomBlue sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    State
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('state')}
                                        id="state"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-cutomBlue sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="pincode" className="block text-sm font-medium leading-6  dark:text-gray-300">
                                    Pin code
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {...register('pincode')}
                                        id="pincode"
                                        name="pincode"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-cutomBlue sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    Phone
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {...register('phone')}
                                        id="phone"
                                        autoComplete="phone"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-cutomBlue sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="m-6 flex items-center justify-end gap-x-6">
                            <button
                                type="button"
                                onClick={() => setaddFormVisibility(!addFormVisibility)}
                                className="rounded-md border px-3 py-2 text-sm font-semibold dark:text-gray-100 dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue"
                            >
                                Save
                            </button>
                        </div>
                    </form>

                </div>
                : <div className="loader"></div>
            }


        </>
    );
}

export default AdminProfile