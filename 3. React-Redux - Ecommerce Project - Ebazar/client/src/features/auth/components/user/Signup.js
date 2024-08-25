import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { createUserAsync, selectLoggedInUser } from "../../authSlice";

function Signup() {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const user = useSelector(selectLoggedInUser)

    return (
        <div>
            {(user && !user.error) && (
                user.role === "user" ? <Navigate to='/' replace={true}></Navigate>
                    : user.role === "admin" && <Navigate to='/admin' replace={true}></Navigate>
            )}

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-300 ">
                        Sign up to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate className="space-y-6" action="#" method="POST" onSubmit={handleSubmit((data) => {
                        dispatch(createUserAsync({
                            email: data.email,
                            password: data.password,
                            addresses: [],
                            role: data.role
                            //role will be given vis backend
                        }))
                    })}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300 ">
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            {(user && user.error) && <p className="text-red-500">Email must be unique</p>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                            message: 'const passwordErrorMessage = "Password must be at least 8 characters long and contain at least one letter and one digit.'
                                        }
                                    })}
                                    type="password"
                                    autoComplete="current-password"

                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirm password"
                                    {...register('confirmPassword', {
                                        validate: (value, formValues) => value === formValues.password || 'Password not matching'
                                    })}

                                    type="password"
                                    autoComplete="current-password"

                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
                                />
                                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    Role
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="role"
                                    {...register('role', {
                                        required: 'Email is required'
                                    })}

                                    type="text"

                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-600 dark:placeholder:text-gray-300 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
                                />
                                {errors.role && <p className="text-red-500">{errors.role.message}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-customBlue dark:bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-opacity-90 hover:bg-opacity-100 dark:hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue dark:focus-visible:outline-blue-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                        Already a member?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-customBlue dark:text-blue-500">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;