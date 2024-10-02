import { useSelector } from 'react-redux';
import '../../styles/index.css';
import { useNavigate } from 'react-router-dom';
import { selectLoggedInUser } from '../../redux';

function Home() {
    const navigate = useNavigate()
    const user = useSelector(selectLoggedInUser)

    if (user) {
        if (user.role === 'user') {
            return navigate('/', { replace: true })
        } else {
            return navigate('/admin', { replace: true })
        }
    }

    return (
        <div className='flex justify-center bg-white overflow-hidden h-screen'>
            <div className='w-3/4  flex flex-col gap-16'>

                <header>
                    <div className="mx-auto ">
                        <div className="flex items-center justify-between h-16 lg:h-14">
                            <div className="flex-shrink-0">
                                <button title="" className="flex">
                                    <img className="h-8" src='/favicon3.ico' alt="Logo" />
                                </button>
                            </div>
                            <button onClick={() => navigate('/signup')} title="" className="hidden lg:inline-flex items-center justify-center px-5 py-2 text-base transition-all duration-200 hover:bg-primary-hover hover:text-white focus:text-white focus:bg-primary-hover font-semibold text-white bg-primary rounded-full">Sign Up</button>
                        </div>
                    </div>
                </header>
                <section className=''>
                    <div className=" mx-auto max-w-7xl ">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                            <div>
                                <h1 className="font-montserrat font-bold text-black text-4xl sm:text-5xl xl:text-7xl">
                                    Discover the
                                    <span className='italic font-extrabold text-pink-500 '> BEST DEALS </span>
                                    on Products You <span className='font-allison font-extralight text-pink-500 '> Love</span>
                                </h1>
                                <p className="font-montserrat text-sm text-black lg:mt-8 ">From fashion to electronics, find everything in one place with unbeatable prices and fast delivery.</p>

                                <button onClick={() => navigate('/login')} title="" className="inline-flex items-center px-6 py-4 mt-4 font-bold text-white transition-all duration-200 bg-primary rounded-full lg:mt-8 hover:bg-primary-hover focus:bg-primary-hover " >
                                    Start Shopping
                                    <svg class="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            </div>

                            <div className='flex justify-center'>
                                <img className='h-[80%]' src='/hero-image2.png' alt="Hero" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    );
}

export default Home;
