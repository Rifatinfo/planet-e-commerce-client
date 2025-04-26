/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { BiX } from "react-icons/bi";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
const Navbar = () => {
    // const {user} = useAuth()
    const [open, setOpen] = useState(false);
    const menuItems = [
        { name: "", link: "/" },
        { name: "", link: "/" },
        { name: "", link: "/" },
    ];

    const handleNavClick = (item) => {
        setOpen(false);
    }

    return (
        <div>
            <div className="fixed top-0 left-0 w-full z-50 shadow-xl  ">
                <header className="max-w-7xl mx-auto bg-transparent  w-full flex justify-between items-center px-5 py-3 ">
                    {/* logo */}
                    <div>
                        <img className="h-[40px] w-auto" src="https://plantnet-39615.web.app/assets/logo-flat-Phd-YyJA.png" alt="logo" />
                        {/* <p className="md:text-3xl text-xl font-bold">Shopping</p> */}
                    </div>

                    {/* desktop menu */}
                    <ul className="hidden xl:flex items-center gap-2 font-semibold text-xl">
                        {menuItems.map(item => (
                            <li key={item.name}
                                onClick={() => handleNavClick(item.name)}
                                className={`text-xl px-4 py-2 rounded-md cursor-pointer transition-all  text-orange-600" hover:text-orange-600}`}
                            >
                                <a href={item.link}>{item.name}</a>
                            </li>
                        ))}
                    </ul>

                    <div className="dropdown dropdown-end ml-auto md:ml-0">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <Link to="/sign-up"><li><a>Sign Up</a></li></Link>
                            <Link to="/sign-in"><li><a>Sign In</a></li></Link>
                        </ul>
                    </div>

                    {/* mobile Menu Toggle Button  */}
                    <span className="lg:hidden block text-xl cursor-pointer mr-3"
                        onClick={() => setOpen(true)}
                    >
                        <IoMenu className="text-white" />
                    </span>
                </header>

                {/* background Overlay with Slide-in Effect */}
                <div className={`fixed inset-0 h-screen bg-gradient-to-r to-orange-600/70 z-50 transition-transform duration-500 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>
                    {/* Click Outside to close  */}
                    <div className="absolute insert-0" onClick={() => setOpen(false)}></div>
                </div>

                {/* Mobile menu contain with Roll down effect  */}
                <div className={`fixed top-0 left-0 h-full bg-white w-full max-w-[350px] shadow-lg z-50 transition-all duration-500 ease-in-out transform ${open ? "translate-x-0" : "-translate-x-full"} ${open ? "max-h-screen overflow-hidden" : "max-h-0"}`}>
                    {/* close Button */}
                    <span className="absolute top-4 right-6 text-3xl cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        <BiX className="text-orange-600" />
                    </span>

                    {/* Mobile menu Item */}
                    <ul className="font-semibold flex flex-col pt-10">
                        {menuItems.map((item) => (
                            <li key={item.name}
                                onClick={() => handleNavClick(item.name)}
                                className={`w-full list-none border-b text-xl px-6 py-3 cursor-pointer transition-all  text-orange-600 }`}>
                                <a href={item.link}>{item.name}</a>
                            </li>
                        ))}

                    </ul>
                </div>
            </div >
        </div >
    );
};

export default Navbar;