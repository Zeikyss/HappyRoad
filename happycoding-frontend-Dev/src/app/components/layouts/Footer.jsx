import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLogged } from "./../../redux-store/authenticationSlice";
import { URL_CONTACT, URL_HOME } from "../../constants/urls/urlFrontEnd";

const Footer = () => {
    const isLoggued = useSelector(selectIsLogged);

    return (
        <div className="relative w-full bg-navfoo text-b-g px-2 border border-fond  shadow-sm font-text rounded-t text-2xl">
            <div className="flex items-center justify-between py-6 md:space-x-10 mx-10">
                <p>FAQ</p>
                <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e09e50" className="w-6 h-6 mx-2">
                        <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clipRule="evenodd" />
                    </svg>
                    <Link to={URL_CONTACT} className="hover:text-btn-mou">Contact</Link>
                </div>


            </div>
            <div className="flex items-center w-full justify-between p-6 md:space-x-10">
                <p>Mentions légales</p>
                <div className="">
                    <Link to={URL_HOME}>
                        <div className="flex items-center justify-center ab">
                            <img className="w-10 mr-4" src="\src\app\assets\img\CopyRight.png" alt="Copyright" />
                            <img className="w-56" src="\src\app\assets\img\HappyWhite.png" alt="Logo HappyRoad blanc" />
                            <h4 className="ml-4">2023</h4>
                        </div>
                    </Link>
                </div>
                <p className="text-right">
                    HappyRoad - Siège Social <br />
                    4, avenue des Saules <br />
                    59000 Lille
                </p>
            </div>
        </div>
    );
};

export default Footer;