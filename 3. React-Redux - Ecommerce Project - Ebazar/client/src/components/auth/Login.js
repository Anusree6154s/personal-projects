import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LoginUserAsync, selectError, selectLoggedInUser } from "../../redux";


function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const user = useSelector(selectLoggedInUser)
  const error = useSelector(selectError)

  if (user && user.role === 'user') {
    return <Navigate to='/' replace={true}></Navigate>
  }

  if (user && user.role === 'admin') {
    return <Navigate to='/admin' replace={true}></Navigate>
  }

  // {(user && user.role === 'user') && <Navigate to='/' replace={true}></Navigate>}
  // {(user && user.role === 'admin') && <Navigate to='/admin' replace={true}></Navigate>}

  return (
    <>
      {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-300">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" action="#" method="POST" onSubmit={handleSubmit((data) => {
            dispatch(
              LoginUserAsync({ email: data.email, password: data.password })
            )
          })}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Email not valid'
                    }
                  })}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  dark:ring-gray-500 dark:placeholder:text-gray-300 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                  Password
                </label>
                <div className="text-sm">
                  <Link to='/forgot-password' className="font-semibold text-customBlue dark:text-blue-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register('password', {
                    required: 'Password is required'
                  })}
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  dark:ring-gray-500 dark:placeholder:text-gray-300 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && <p className="text-red-700">{errors.password.message}</p>}
              {error && <p className="text-red-500">{error.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-customBlue dark:bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue dark:focus-visible:outline-blue-700"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            Not a member?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-customBlue dark:text-blue-500 ">
              Create an Account
            </Link>
          </p>
        </div>
      </div> */}
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center h-screen">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 ">
            <div className="mt-10 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <form
                    noValidate
                    method="POST"
                    onSubmit={handleSubmit((data) => {
                      dispatch(
                        LoginUserAsync({ email: data.email, password: data.password })
                      )
                    })}
                  >
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: 'Email not valid'
                        }
                      })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                    />
                    {errors.email && <p className="text-xs text-warning">{errors.email.message}</p>}
                    <input
                      {...register('password', {
                        required: 'Password is required'
                      })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                    />
                    <p className="flex">
                      {errors.password &&
                        <span className="text-xs text-warning flex-1 text-left">{errors.password.message}</span>
                      }
                      {error &&
                        <span className="text-xs text-warning flex-1 text-left">{error.message}</span>
                      }
                      <button onClick={() => navigate('/forgot-password')} className="text-xs text-gray-600 flex-1 text-right">
                        Forgot Password?
                      </button>
                    </p>

                    <button type="submit" className="mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-4 rounded-lg hover:bg-primary-hover transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="feather feather-user-check w-6 h-6 -ml-2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <polyline points="17 11 19 13 23 9"></polyline>
                      </svg>
                      <span className="ml-3">Sign In</span>
                    </button>

                  </form>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    <span>Not a member? </span>
                    <button onClick={() => navigate('/signup')} className="border-b border-primary border-dotted text-primary hover:text-primary-hover font-bold">
                      Create an Account
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-[#afe3ffed] text-center hidden lg:flex justify-center">
            <img src="/images/login-image.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login