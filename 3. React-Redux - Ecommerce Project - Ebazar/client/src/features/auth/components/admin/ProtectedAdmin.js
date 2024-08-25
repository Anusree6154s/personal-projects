import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../../authSlice";

function ProtectedAdmin({ children }) {
    const user = useSelector(selectLoggedInUser)
    return (
        <>
            {!user ? <Navigate to='/login' replace={true}></Navigate> : children}
            {user && user.role !== 'admin' ? <Navigate to='/login' replace={true}></Navigate> : children}
        </>

    )
}

export default ProtectedAdmin;