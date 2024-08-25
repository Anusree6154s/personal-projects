import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { LoginUserAsync, selectError, selectLoggedInUser } from "../authSlice";


function Login() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const user = useSelector(selectLoggedInUser)
  const error = useSelector(selectError)
  return (
    <>
      {(user && user.role === 'user') && <Navigate to='/' replace={true}></Navigate>}
      {(user && user.role === 'admin') && <Navigate to='/admin' replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
              {/* {} */}
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
      </div>
    </>
  );
}

export default Login