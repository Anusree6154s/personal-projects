import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser, signOutsAsync } from "../../redux";

function LogOut() {
    const user = useSelector(selectLoggedInUser)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(signOutsAsync())
    }, [dispatch])

    return (
        <>
            {!user && <Navigate to='/login' replace={true}></Navigate>}
        </>
    );
}

export default LogOut;