import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createUserAsync, selectLoggedInUser } from "../../redux";

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const user = useSelector(selectLoggedInUser)

    if (user && !user.error) {
        if (user.role === "user") {
            return <Navigate to='/' replace={true}></Navigate>
        } else {
            return <Navigate to='/admin' replace={true}></Navigate>
        }
    }

    return (
        <div>
            {/* {(user && !user.error) && (
                user.role === "user" ? <Navigate to='/' replace={true}></Navigate>
                    : user.role === "admin" && <Navigate to='/admin' replace={true}></Navigate>
            )} */}

            {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
                            {errors.email && <p className="text-warning">{errors.email.message}</p>}
                            {(user && user.error) && <p className="text-warning">Email must be unique</p>}
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
                            {errors.password && <p className="text-warning">{errors.password.message}</p>}
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
                                {errors.confirmPassword && <p className="text-warning">{errors.confirmPassword.message}</p>}
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
                                {errors.role && <p className="text-warning">{errors.role.message}</p>}
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
            </div> */}

            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center h-screen overflow-hidden">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="flex-1 bg-[#afe3ffed] text-center hidden lg:flex justify-center">
                        <img src="/images/signup-image.png" alt="" />
                    </div>
                    <div className="lg:w-1/2 xl:w-5/12 ">
                        <div className="mt-6 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="mx-auto max-w-xs">
                                    <form
                                        noValidate
                                        method="POST"
                                        onSubmit={handleSubmit((data) => {
                                            dispatch(createUserAsync({
                                                email: data.email,
                                                password: data.password,
                                                addresses: [],
                                                role: data.role
                                                //role will be given vis backend
                                            }))
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
                                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="email"
                                            placeholder="Email"
                                        />
                                        {errors.email && <p className="text-warning">{errors.email.message}</p>}
                                        {(user && user.error) && <p className="text-warning">Email must be unique</p>}
                                        <input
                                            {...register('password', {
                                                required: 'Password is required'
                                            })}
                                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                                            type="password"
                                            placeholder="Password"
                                        />
                                        {errors.password && <p className="text-warning">{errors.password.message}</p>}
                                        <input
                                            {...register('confirmPassword', {
                                                validate: (value, formValues) => value === formValues.password || 'Password not matching'
                                            })}
                                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                                            type="password"
                                            placeholder="Confirm Password"
                                        />
                                        {errors.confirmPassword && <p className="text-warning">{errors.confirmPassword.message}</p>}
                                        <select
                                            {...register('role', {
                                                required: 'Role is required'
                                            })}
                                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                                            name="role" id="role"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        {errors.role && <p className="text-warning">{errors.role.message}</p>}

                                        <button type="submit" className="mt-7 tracking-wide font-semibold bg-primary text-gray-100 w-full py-4 rounded-lg hover:bg-primary-hover transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            <svg
                                                className="w-6 h-6 -ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy={7} r={4} />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg>
                                            <span className="ml-3">Sign Up</span>
                                        </button>

                                    </form>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        <span>Already a member? </span>
                                        <button onClick={() => navigate('/login')} className="border-b border-primary border-dotted text-primary hover:text-primary-hover font-bold">
                                            Sign In
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;