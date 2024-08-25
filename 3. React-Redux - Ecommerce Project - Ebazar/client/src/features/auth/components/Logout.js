import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutsAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

function LogOut() {
    const user = useSelector(selectLoggedInUser)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(signOutsAsync())
    }, [])

    return (
        <>
            {!user && <Navigate to='/login' replace={true}></Navigate>}
        </>
    );
}

export default LogOut;