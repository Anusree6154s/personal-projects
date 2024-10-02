import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import { resetPasswordAsync, selectUserId, sendOTPAsync } from "../../redux";

//TODO: sever part handleSumbit in forgot password
function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
    } = useForm()

    const {
        register: register3,
        handleSubmit: handleSubmit3,
        formState: { errors: errors3 },
    } = useForm()

    const dispatch = useDispatch()
    const [showAlert, setShowAlert] = useState(false)
    const [showForm2, setShowForm2] = useState(false)
    const [showAlert2, setShowAlert2] = useState(false)
    const [showForm3, setShowForm3] = useState(false)
    const [OTP, setOTP] = useState(null)
    const [showAlert3, setShowAlert3] = useState(false)


    const userId = useSelector(selectUserId)

    return (
        <>
            <div
                className={`absolute top-8  ${showAlert ? '' : 'transform -translate-y-20'} w-full flex justify-center text-white `}
                style={{
                    transition: 'transform 0.2s ease-in'
                }}>
                <span className="bg-green-600  p-2 rounded-md">OTP sent to Email</span>
            </div>

            <div
                className={`absolute top-8  ${showAlert2 ? '' : 'transform -translate-y-20'} w-full flex justify-center text-white `}
                style={{
                    transition: 'transform 0.2s ease-in'
                }}>
                <span className="bg-red-600 bg-opacity-80 p-2 rounded-md">Wrong OTP</span>
            </div>

            <div
                className={`absolute top-8  ${showAlert3 ? '' : 'transform -translate-y-20'} w-full flex justify-center text-white `}
                style={{
                    transition: 'transform 0.2s ease-in'
                }}>
                <span className="bg-green-600 p-2 rounded-md flex items-center "><CheckCircleIcon className="mr-2 inline h-5 w-5"></CheckCircleIcon> Password has been reset!</span>
            </div>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-300">
                        Forgot Password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {!showForm2 && !showForm3 &&
                        <form noValidate className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(async (data) => {
                            const otp = Math.floor(Math.random() * 9000 + 1000)
                            setShowForm2(true)
                            setShowAlert(true)
                            setTimeout(() => setShowAlert(false), 3000)
                            if (otp) {
                                setOTP(otp)
                                dispatch(sendOTPAsync({ email: data.email, OTP: otp }))
                            }
                        })}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    Email
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
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-500 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:focus:ring-blue-500 dark:bg-gray-800 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-customBlue dark:bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-opacity-90 hover:bg-opacity-100 dark:hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue dark:focus-visible:outline-blue-700"
                                >
                                    Send Email
                                </button>
                            </div>
                        </form>
                    }

                    {showForm2 && <>
                        <div onClick={() => setShowForm2(false)} className='cursor-pointer p-2 mb-5 inline-block rounded-md hover:bg-gray-50  dark:text-gray-300 dark:hover:bg-gray-700' ><ArrowLeftIcon className='h-6 w-6 inline-block '></ArrowLeftIcon> Back</div>
                        <form noValidate className="space-y-6" action="#" method="POST" onSubmit={handleSubmit2((data) => {
                            if (Number(data.otp) === OTP) {
                                setShowForm2(false)
                                setShowForm3(true)
                            } else {
                                setShowAlert2(true)
                                setTimeout(() => setShowAlert2(false), 3000)
                            }
                        })}>

                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    Enter OTP
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="otp"
                                        {...register2('otp', {
                                            required: 'OTP is required'
                                        })}
                                        type="number"
                                        inputMode="numeric"
                                        onWheel={(e) => e.target.blur()}
                                        autoComplete="otp"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-500 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:focus:ring-blue-500 dark:bg-gray-800 sm:text-sm sm:leading-6"
                                        style={{ /* CSS to hide arrows */
                                            '-moz-appearance': 'textfield', /* Firefox */
                                            'appearance': 'textfield', /* Chrome, Safari, Edge, Opera */
                                        }}
                                    />
                                </div>
                                {errors2.otp && <p className="text-red-500">{errors2.otp.message}</p>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-customBlue dark:bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-opacity-90 hover:bg-opacity-100 dark:hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue dark:focus-visible:outline-blue-700"
                                >
                                    Verify
                                </button>
                            </div>
                        </form>
                    </>}

                    {showForm3 && <>
                        <div onClick={() => {
                            setShowForm2(true)
                            setShowForm3(false)
                        }}
                            className='cursor-pointer p-2 mb-5 inline-block rounded-md hover:bg-gray-50  dark:text-gray-300 dark:hover:bg-gray-700' >
                            <ArrowLeftIcon className='h-6 w-6 inline-block '></ArrowLeftIcon>
                            Back
                        </div>

                        <form noValidate className="space-y-6" action="#" method="POST" onSubmit={handleSubmit3((data) => {
                            dispatch(resetPasswordAsync({ password: data.password, userId }))
                            setShowAlert3(true)
                        })}>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    Enter New Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        {...register3('password', {
                                            required: 'Password is required'
                                        })}
                                        type="password"
                                        autoComplete="password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:ring-gray-500 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:focus:ring-blue-500 dark:bg-gray-800 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors3.password && <p className="text-red-500">{errors3.password.message}</p>}
                            </div>



                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-customBlue dark:bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-opacity-90 hover:bg-opacity-100 dark:hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue dark:focus-visible:outline-blue-700"
                                >
                                    Reset Password
                                </button>
                            </div>
                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                            Go back to {' '}
                            <Link to="/login" className="font-semibold leading-6 text-customBlue dark:text-blue-500">
                                Login
                            </Link>
                        </p>
                    </>}


                </div>


            </div>
        </>
    );
}

export default ForgotPassword;