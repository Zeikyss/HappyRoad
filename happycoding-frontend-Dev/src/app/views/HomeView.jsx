import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Home from '../components/home/Home';
import SearchBar from '../components/home/SearchBar';
// import { ROLE_ADMIN } from '../constants/rolesConstant';
// import { URL_ADMIN_HOME } from '../constants/urls/urlFrontEnd';
// import { selectHasRole } from '../redux-store/authenticationSlice';


const HomeView = () => {
    // const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
    // const navigate = useNavigate();
    return (
        <div>

            <SearchBar className="" />
            <Home className="" />


            {/* {isAdmin && (
                <button
                    className="text-xl ml-2 font-medium bg-btn-mou hover:bg-b-g hover:text-btn-mou rounded-xl p-3 w-32 font-button my-5 fixed top-36 right-10 z-20"
                    onClick={() => navigate(URL_ADMIN_HOME)}
                >
                    Admin
                </button>
            )} */}
        </div>
    );
};

export default HomeView;
