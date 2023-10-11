import React from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignUp from '../components/account/SignUp';

// import { ROLE_ADMIN } from '../constants/rolesConstant';
// import { URL_ADMIN_HOME } from '../constants/urls/urlFrontEnd';
// import { selectHasRole } from '../redux-store/authenticationSlice';

const SignUpView = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center bg-SignupBG bg-cover bg-center h-full w-full bg-no-repeat pt-16">
            <SignUp className="" />
        </div>
    );
};

export default SignUpView;
