import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectItems } from '../user/cart/cartSlice'
import { selectLoggedInUser } from '../../auth/authSlice'





function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar({ children, name, preview }) {
  const user = useSelector(selectLoggedInUser)
  const items = useSelector(selectItems)

  const [dark, setDark] = useState(false)

  let userNavigation
  if (user) {
    if (user.role === 'user') {
      userNavigation = [
        { name: 'Your Profile', link: '/profile' },
        { name: 'My Orders', link: '/my-orders' },
        { name: 'Sign out', link: '/logout' },
      ]
    } else {
      userNavigation = [
        { name: 'Your Profile', link: '/admin/profile' },
        { name: 'Orders', link: '/admin/orders' },
        { name: 'Sign out', link: '/logout' },
      ]
    }

  }



  const handleTheme = () => {
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      setDark(true)
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      setDark(false)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'dark') {
        document.documentElement.classList.add('dark');
        setDark(true)
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      localStorage.setItem('color-theme', 'light');
    }
  }, [])


  return (
    <>
      {userNavigation && <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800 dark:bg-gray-900">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <Link to={user.role === 'user' ? '/' : '/admin'}>
                    <h1 className='text-white text-3xl flex gap-2 '>
                      <img className='h-10 w-100' src="/favicon2.ico" alt="" />
                    </h1>
                  </Link>

                  <div className="hidden md:block">
                    <div className="ml-4 flex gap-2 items-center md:ml-6 ">

                      <button
                        id="theme-toggle"
                        onClick={handleTheme}
                        type="button"
                        className="flex items-center text-gray-400  hover:text-gray-100  focus:outline-none focus:ring-4 focus:ring-transparent rounded-lg text-sm p-2.5 dark:border-gray-600">
                        {dark ? 'Light Mode' : 'Dark Mode'}
                        <svg
                          id="theme-toggle-dark-icon"
                          className={`${dark ? 'hidden' : ''}  w-5 h-5 ml-2`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                        <svg
                          id="theme-toggle-light-icon"
                          className={`${dark ? '' : 'hidden'}  w-5 h-5 ml-2`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </button>

                      <Link to='/wishlist' className={user.role === 'user' ? '' : "hidden"}>
                        <button
                          type="button"
                          className=" rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none  focus:ring-transparent  dark:bg-gray-900 dark:text-gray-400  dark:hover:text-gray-100  "
                        >
                          <span className="sr-only">View WishList</span>
                          <HeartIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </Link>

                      <Link to='/cart' className={user.role === 'user' ? '' : "hidden"}>
                        <button
                          type="button"
                          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none  focus:ring-transparent  dark:bg-gray-900 dark:text-gray-400  dark:hover:text-gray-100  "
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View cart</span>
                          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                          {items.length > 0 && <span className="absolute items-center rounded-md bg-red-50 -mt-10 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 ">
                            {items.length}
                          </span>}
                        </button>
                      </Link>



                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 dark:bg-gray-700">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZbXR5XmpH1OOJhigJF4nWkJIITHis1Y4dA&s'} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg  dark:bg-gray-700  ">
                            {userNavigation.map((item, index) => (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? 'bg-gray-100' : 'dark:bg-gray-700',
                                      'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300',
                                      'hover:bg-gray-100 dark:hover:bg-gray-600', // Adding hover colors
                                      'transition-colors ease-in-out duration-150' // Adding transition effect
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  <div className="-mr-2 flex items-center gap-3 md:hidden">

                    {/* Mobile menu button */}
                    <button id="theme-toggle" onClick={handleTheme} type="button" className="flex items-center text-gray-500 dark:text-gray-400  hover:text-gray-100 dark:hover:text-gray-100 focus:outline-none focus:ring-4 focus:ring-transparent rounded-lg text-sm p-2.5 dark:border-gray-600">
                      {dark ? 'Light Mode' : 'Dark Mode'}
                      <svg id="theme-toggle-dark-icon" className={`${dark ? 'hidden' : ''}  w-5 h-5 ml-2`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                      </svg>
                      <svg id="theme-toggle-light-icon" className={`${dark ? '' : 'hidden'}  w-5 h-5 ml-2`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </button>

                    <Link to='/wishlist' className={user.role === 'user' ? '' : "hidden"}>
                      <button
                        type="button"
                        className=" rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none  focus:ring-transparent  dark:bg-gray-900 dark:text-gray-400  dark:hover:text-gray-100  "
                      >
                        <span className="sr-only">View WishList</span>
                        <HeartIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </Link>

                    <Link to='/cart' className={user.role === 'user' ? '' : "hidden"}>
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none  focus:ring-transparent  dark:bg-gray-900 dark:text-gray-400  dark:hover:text-gray-100 "
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View cart</span>
                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                        {items.length > 0 && <span className="absolute items-center rounded-md bg-red-50 -mt-10 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          {items.length}
                        </span>}
                      </button>
                    </Link>
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZbXR5XmpH1OOJhigJF4nWkJIITHis1Y4dA&s'} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item, index) => (
                      <Link key={index} to={item.link}>
                        <Disclosure.Button
                          key={item.name}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                        >
                          {item.name}
                        </Disclosure.Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {name && <header className="bg-white dark:bg-gradient-to-r dark:from-blue-900 dark:to-customBlue shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{name} {preview && <span className='text-xl text-gray-500 dark:text-gray-300 font-medium italic'>(Preview)</span>}</h1>

          </div>
        </header>}
        <main className='dark:bg-gray-900'>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
            {/* Your content */}
            {children}
          </div>
        </main>
      </div >}
    </>
  )
}
