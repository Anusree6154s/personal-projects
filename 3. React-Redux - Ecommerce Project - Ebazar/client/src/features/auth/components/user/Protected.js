import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthSliceStatus, selectLoggedInUser } from "../../authSlice";

function Protected({ children }) {
    const user = useSelector(selectLoggedInUser)
    const status = useSelector(selectAuthSliceStatus)

    return status === 'loading' ? <div className='col-span-1 lg:col-span-3'><div className="loader"></div></div> : status === 'idle' && !user ? <Navigate to='/login' replace={true}></Navigate> : children
}

export default Protected;