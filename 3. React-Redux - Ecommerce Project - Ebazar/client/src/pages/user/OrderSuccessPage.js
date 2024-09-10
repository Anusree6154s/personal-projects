import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetOrder } from "../../redux/slices/ordersSlice";
import NavBar from "../../components/common/Navbar";

function OrderSuccessPage() {
    const params = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(resetOrder())
    }, [dispatch])

    return (
        <NavBar>
            <div className="px-24 py-8 sm:py-24 lg:px-24 sm:px-6 ">
                {!params.id && <Navigate to='/' replace={true}></Navigate>
                }
                <main
                    className=" min-h-full place-items-center bg-white dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-800 px-6 py-24 sm:py-32 lg:px-8 sm:px-6 "
                >
                    <div className="text-center">
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-customBlue dark:text-blue-500 sm:text-5xl">Order Placed! ✅</h1>
                        <br />
                        <p className="mt-4 text-base font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-lg"> <span className="text-gray-700 dark:text-gray-500 sm:text-lg">Order Number</span> #{params.id}</p>
                        <br />
                        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">You can check your orders at Accounts &gt; My Orders</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link to='/'
                                href="#"
                                className="rounded-md bg-customBlue dark:bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm bg-opacity-80 hover:bg-opacity-100  dark:hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue"
                            >
                                Go back home
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </NavBar>



    );
}

export default OrderSuccessPage;