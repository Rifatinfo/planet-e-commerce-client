import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const Root = () => {
    const location = useLocation();

    const isLogin = location.pathname.includes('sign-in') || location.pathname.includes('sign-up');
    console.log(location);
    return (
        <div>
           {isLogin ||  <Navbar/>}
            <Outlet/>
        </div>
    );
};

export default Root;