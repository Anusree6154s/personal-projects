import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/20/solid'
import { selectLoggedInUser, updateUserAsync } from "../../redux";

//TODO: payment will be added when working on server

function UserProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    formState: { errors: errors2 },
  } = useForm()

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    setValue: setValue3,
    // formState: { errors: errors3 },
  } = useForm()


  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

  const [visibilityIndex, setVisibilityIndex] = useState(null)
  const [addFormVisibility, setaddFormVisibility] = useState(false)
  const [editProfileVisibility, setEditProfileVisibility] = useState(false)

  const handleDelete = (index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(newUser))
  }

  const handleEdit = (data, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1, data)
    dispatch(updateUserAsync(newUser))
  }

  const handleOpenForm = (index) => {
    setVisibilityIndex(index)
    setValue2('name', user.addresses[index].name)
    setValue2('email', user.addresses[index].email)
    setValue2('country', user.addresses[index].country)
    setValue2('street', user.addresses[index].street)
    setValue2('city', user.addresses[index].city)
    setValue2('state', user.addresses[index].state)
    setValue2('pincode', user.addresses[index].pincode)
    setValue2('phone', user.addresses[index].phone)
  }

  const handleAdd = (data) => {
    dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }))
  }

  const handleEditProfile = (data) => {
    if (data.image2.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(data.image2[0]);
      reader.onload = (e) => dispatch(updateUserAsync({ ...user, name: data.name, image: data.image || e.target.result }))
    } else {
      dispatch(updateUserAsync({ ...user, name: data.name, image: data.image || null }))
    }
  }

  return (
    <>
      <Link to='/' className='p-2 mb-5 inline-block rounded-md hover:bg-gray-50  dark:text-gray-300 dark:hover:bg-gray-700' ><ArrowLeftIcon className='h-6 w-6 inline-block '></ArrowLeftIcon> Back</Link>

      {user
        ? <div className="flex flex-col bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 max-w-7xl px-6 py-8 sm:px-6 lg:px-8 mb-6">
          <form
            noValidate
            onSubmit={handleSubmit3((data) => {
              handleEditProfile(data)
              setEditProfileVisibility(!editProfileVisibility)
            })}
            className={editProfileVisibility ? '' : "hidden mt-6"}>
            <div className="border-b border-gray-300 dark:border-gray-700 pb-12  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register3('name')}
                    id="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-full ">
                <label htmlFor="image" className=" block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                  Profile Image
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register3('image')}
                    id="image"
                    autoComplete="image"
                    placeholder="Place image url here"
                    className="inline md:w-1/3 w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                  />
                  <span className="md:ml-2 block md:inline mt-2 md:mt-0 font-medium text-sm dark:text-gray-300">OR</span>
                  <input
                    type="file"
                    {...register3('image2')}
                    id="image2"
                    autoComplete="image2"
                    className="md:ml-2 mt-2 md:mt-0 inline md:w-1/3 w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="m-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={() => setEditProfileVisibility(!editProfileVisibility)}
                className="rounded-md border px-3 py-2 text-sm font-semibold dark:text-gray-100 dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue"
              >
                Add
              </button>
            </div>
          </form>
          {!editProfileVisibility && <div>
            <div className="flex justify-between ">
              <p className="text-gray-900 dark:text-gray-300 text-lg mb-8 flex flex-col items-center border border-gray-400 dark:border-gray-600 p-5 rounded-md h-full">
                <img src={user.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZbXR5XmpH1OOJhigJF4nWkJIITHis1Y4dA&s'} alt={user.name} className="w-20 h-20 rounded-full" />
                <div className="mt-4">
                  {user.name && <p className=" font-bold whitespace-nowrap">Name: <span className="font-normal dark:text-gray-400">{user.name}</span></p>}
                  <p className=" font-bold whitespace-nowrap">Email: <span className="font-normal dark:text-gray-400">{user.email}</span></p>
                  <span
                    onClick={() => {
                      setValue3('recovery_email', user.recovery_email)
                      setEditProfileVisibility(!editProfileVisibility)
                    }}
                    className="text-sm font-medium text-gray-500 hover:text-black  dark:hover:text-white  cursor-pointer mt-4 flex justify-center items-center">
                    <PencilIcon className="h-4 w-4 inline"></PencilIcon>
                    Edit Profile
                  </span>
                </div>
              </p>

              <div className="ml-10 w-full p-5 rounded-md bg-gray-100 dark:bg-gray-900">
                <p className="text-gray-900 dark:text-gray-300 font-bold text-lg flex justify-between">
                  <span>Your Addresses:</span>
                  <button
                    onClick={() => {
                      setValue('email', user.email)
                      setaddFormVisibility(!addFormVisibility)
                    }}
                    className={"rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue " + (addFormVisibility ? "hidden mt-6" : "")}>Add Address</button>
                </p>
                <form
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    handleAdd(data)
                    setaddFormVisibility(!addFormVisibility)
                  })}
                  className={addFormVisibility ? '' : "hidden mt-6"}
                >
                  <div className="pt-6 border-b border-gray-400 dark:border-gray-700 pb-12  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('name', { required: 'required' })}
                          id="name"
                          autoComplete="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.name && <p className="text-red-500">* required</p>}
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register('email')}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.email && <p className="text-red-500">* required</p>}
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          {...register('country', { required: 'required' })}
                          autoComplete="country"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:bg-gray-800 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>India</option>
                          <option>China</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('street', { required: 'required' })}
                          id="street"
                          autoComplete="address-level3"
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
                          {...register('city', { required: 'required' })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.city && <p className="text-red-500">* required</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                        State
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('state', { required: 'required' })}
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.state && <p className="text-red-500">* required</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900">
                        Pin code
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          {...register('pincode', { required: 'required' })}
                          id="pincode"
                          name="pincode"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.pincode && <p className="text-red-500">* required</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          {...register('phone', { required: 'required' })}
                          id="phone"
                          autoComplete="phone"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500">* required</p>}
                    </div>
                  </div>

                  <div className="m-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      onClick={() => setaddFormVisibility(!addFormVisibility)}
                      className="rounded-md border px-3 py-2 text-sm font-semibold dark:text-gray-100 dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 bg-white">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue"
                    >
                      Add
                    </button>
                  </div>
                </form>

                <div className="mt-2 space-y-6">
                  <ul className='flex flex-col gap-2'>
                    {user.addresses.map((address, index) => (
                      <li key={index} className='items-baseline border dark:border-transparent px-5 bg-white dark:bg-gray-800'>
                        <div className="flex justify-between items-baseline px-5">
                          <div className='flex-col justify-between  items-baseline gap-x-6 py-5 '>
                            <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">{address.name}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-300">{address.street}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-300">{address.city}</p>
                          </div>

                          <div className="hidden shrink-0 sm:flex sm:flex-col ">
                            <p className="text-sm leading-6 text-gray-900 dark:text-gray-100">{address.phone}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-300">{address.pincode}</p>
                          </div>

                          <div className="flex shrink-0 sm:flex sm:flex-col sm:items-end">
                            <button
                              onClick={() => handleDelete(index)}
                              type="button"
                              className="font-medium text-customBlue bg-opacity-80 hover:bg-opacity-100 dark:text-blue-400 dark:hover:text-blue-500"
                            >
                              Remove
                            </button>
                            <button
                              onClick={() => handleOpenForm(index)}
                              type="button"
                              className="font-medium text-customBlue bg-opacity-80 hover:bg-opacity-100 dark:text-blue-400 dark:hover:text-blue-500"
                            >
                              Edit
                            </button>
                          </div>
                        </div>

                        <form
                          noValidate
                          onSubmit={handleSubmit2((data) => {
                            handleEdit(data, index)
                            setVisibilityIndex(null)
                          })}
                          className={visibilityIndex !== index ? 'hidden' : ''}
                        >
                          <div className="pt-6 border-b border-t border-gray-900/10 pb-12  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                              <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                Full name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register2('name', { required: 'required' })}
                                  id="full-name"
                                  autoComplete="given-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors2.name && <p className="text-red-500">* required</p>}
                            </div>

                            <div className="sm:col-span-4">
                              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  {...register2('email', { required: 'required' })}
                                  type="email"
                                  autoComplete="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors2.email && <p className="text-red-500">* required</p>}
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                Country
                              </label>
                              <div className="mt-2">
                                <select
                                  id="country"
                                  {...register2('country', { required: 'required' })}
                                  autoComplete="country-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:bg-gray-800 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option>India</option>
                                  <option>China</option>
                                  <option>Mexico</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register2('street', { required: 'required' })}
                                  id="street"
                                  autoComplete="street"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors2.street && <p className="text-red-500">* required</p>}
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register2('city', { required: 'required' })}
                                  id="city"
                                  autoComplete="address-level2"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors2.city && <p className="text-red-500">* required</p>}
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                State
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register2('state', { required: 'required' })}
                                  id="region"
                                  autoComplete="address-level1"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors2.state && <p className="text-red-500">* required</p>}
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                Pin code
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register2('pincode', { required: 'required' })}
                                  id="pincode"
                                  autoComplete="pincode"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors2.pincode && <p className="text-red-500">* required</p>}
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                Phone
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register2('phone', { required: 'required' })}
                                  id="phone"
                                  autoComplete="phone"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-700 dark:placeholder:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                                />
                              </div>
                              {errors2.phone && <p className="text-red-500">* required</p>}
                            </div>
                          </div>

                          <div className="m-6 flex items-center justify-end gap-x-6">
                            <button type="button"
                              onClick={() => setVisibilityIndex(null)}
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
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>}

        </div>
        : <div className="loader"></div>
      }


    </>
  );
}

export default UserProfile