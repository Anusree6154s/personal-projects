import { Link } from "react-router-dom";
import NavBar from "../common/Navbar";

function PageNotFound() {
    return (
        <NavBar>
            <div className="px-24 py-8 sm:py-24 lg:px-24 sm:px-6 ">
                <main
                    className=" min-h-full place-items-center bg-white dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-800 px-6 py-24 sm:py-32 lg:px-8 sm:px-6 "
                >
                    <div className="text-center">
                        <p className="text-lg font-semibold text-customBlue dark:text-blue-500">404</p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-5xl">Page not found</h1>
                        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">Sorry, we couldn't find the page you're looking for.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link to='/'
                                href="#"
                                className="rounded-md bg-customBlue dark:bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue dark:focus-visible:outline-blue-700"
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

export default PageNotFound;