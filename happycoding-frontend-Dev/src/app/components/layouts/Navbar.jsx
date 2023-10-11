import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLogged } from "./../../redux-store/authenticationSlice";
import {
  URL_HOME,
  URL_LOGIN,
  URL_REGISTER,
  URL_SEARCHTRIP,
  URL_SUGGESTTRIP,
  URL_PROFILE,
  URL_ACCOUTMANAGEMENT,
  URL_ASKTRIP,
  URL_FAVORITES,
  URL_CHAT,
  URL_CURRENTTRIP,
  URL_ADMIN_HOME,
  URL_COMMENT
} from "../../constants/urls/urlFrontEnd";

import { ROLE_ADMIN } from '../../constants/rolesConstant';
import { selectHasRole } from '../../redux-store/authenticationSlice';

import { signOut } from "../../redux-store/authenticationSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggued = useSelector(selectIsLogged);
  // Dropdown Trajet
  const [dropdown1, setDropdown1] = useState("");

  const handleOpen1 = () => {
    setDropdown1(!dropdown1);
  };
  const outsideClick1 = useCallback((e) => {
    if (dropdown1) {
      setDropdown1(false);
    }
  });
  useEffect(() => {
    window.addEventListener("click", outsideClick1);
    return () => {
      window.removeEventListener("click", outsideClick1);
    };
  });

  // Dropdown User
  const [dropdown2, setDropdown2] = useState("");

  const handleOpen2 = () => {
    setDropdown2(!dropdown2);
  };


  const outsideClick2 = useCallback((e) => {
    if (dropdown2) {
      setDropdown2(false);
    }
  });

  useEffect(() => {
    window.addEventListener("click", outsideClick2);
    return () => {
      window.removeEventListener("click", outsideClick2);
    };
  });

  const handleLogout = (values) => {
    dispatch(signOut());
    navigate(URL_HOME);
  };

  return (
    <div className=" w-full relative">
      <div className="fixed left-16 top-4 w-11/12 z-20 justify-center bg-navfoo border border-navfoo dark:border-fond text-b-g text-2xl shadow-xl shadow-slate500/40 rounded-full">
        <div className="flex items-center p-4 justify-between py-4 md:space-x-10">
          <div className="w-20 mx-8">
            <Link to={URL_HOME}>
              <img src="\src\app\assets\img\Logo_HappyRoad_White.png" alt="Logo HappyRoad" className="ml-4" />
            </Link>
          </div>
          <div className="flex flex-col justify-center space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 ">
            <div>
              {/* ---------------MENU DEROULANT TRAJET-------------------- */}
              <div className="flex items-center">
                <div className="flex items-center">
                  <Link to={URL_HOME}>
                    <p className=" flex items-center font-text text-b-g hover:text-fond px-8 ">
                      Accueil</p>
                  </Link>
                </div>
                <button onClick={handleOpen1} className="flex items-center relative px-8 font-text text-b-g hover:text-fond">
                  Trajets
                </button>
                {/* CONNECTER */}
                {isLoggued ? (
                  <><div className="flex items-center">
                    {/* DROPDOWN TRAJET */}
                    {dropdown1 && (
                      <div className="absolute top-24 right-44 bg-navfoo border border-fond m-2 shadow-xl shadow-slate500/40 rounded-xl w-80 text-xl">
                        <div>
                          <Link to={URL_SEARCHTRIP} >
                            <p className="flex justify-between text-b-g  hover:bg-b-g hover:text-btn-mou p-3 font-button rounded-t-lg w-full">Rechercher un trajet
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </p>
                          </Link>
                        </div>
                        <div>
                          <Link to={URL_SUGGESTTRIP}>
                            <p className="flex justify-between text-b-g hover:bg-b-g hover:text-btn-mou p-3 font-button w-full">Proposer un trajet
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </p>
                          </Link>
                        </div>
                        <div>
                          <Link to={URL_CURRENTTRIP}>
                            <p className="flex justify-between  hover:bg-b-g hover:text-btn-mou p-3 font-button rounded-b-lg w-full">Trajets en cours
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </p>
                          </Link>
                        </div>
                      </div>
                    )}
                    {/* FIN DROPDOWN TRAJET */}
                    {/* HEROICONS CHAT*/}
                    <div>
                      <Link to={URL_CHAT}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e09e50" className="w-10 h-10 mx-8">
                          <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                          <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                        </svg>
                      </Link>
                    </div>
                    {/* HEROICONS FAVORIS*/}
                    <div>
                      <Link to={URL_FAVORITES}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e09e50" className="w-10 h-10 mx-8">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>

                      </Link>
                    </div>
                    {/* HEROICONS USER*/}
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e09e50" className="w-10 h-10 mx-8 cursor-pointer" onClick={handleOpen2}>
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {/* DROPDOWN USER */}
                    {dropdown2 && (
                      <div className="absolute top-24 right-0 bg-navfoo border border-fond   shadow-xl shadow-slate500/40  rounded-xl w-64 text-xl">
                        <div >
                          <Link to={URL_PROFILE}>
                            <button className="flex justify-between text-b-g text-left hover:bg-b-g hover:text-btn-mou p-3 font-button rounded-t-lg w-full">Mon profil
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>

                            </button>
                          </Link>
                        </div>
                        <div>
                          <Link to={URL_ACCOUTMANAGEMENT}>
                            <button className="flex justify-between text-b-g text-left hover:bg-b-g hover:text-btn-mou p-3 font-button rounded-b-lg w-full">Gérer mon profil
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </button>
                          </Link>
                        </div>
                        <div>
                          {isAdmin && (
                            <button
                              className="flex justify-between text-b-g text-left hover:bg-b-g hover:text-btn-mou p-3 font-button w-full"
                              onClick={() => navigate(URL_ADMIN_HOME)}
                            >
                              Admin
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <button onClick={handleLogout} className="flex justify-between text-b-g text-left hover:bg-b-g hover:text-btn-mou p-3 font-button rounded-b-lg w-full">Se déconnecter
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg></button>
                      </div>
                    )}
                    {/* FIN DROPDOWN USER */}
                  </div></>
                ) : (
                  <>
                    {/* NON CONNECTER */}
                    {/* DROPDOWN TRAJET */}
                    {dropdown1 && (
                      <div className="absolute top-24 right-44 bg-navfoo border border-fond shadow-xl shadow-slate500/40 rounded-xl w-80 text-xl">
                        <div>
                          <Link to={URL_SEARCHTRIP} >
                            <p className="flex justify-between text-b-g  hover:bg-b-g hover:text-btn-mou p-3 font-button rounded-t-lg w-full">Rechercher un trajet
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </p>
                          </Link>
                        </div>
                        <div>
                          <Link to={URL_SUGGESTTRIP}>
                            <p className="flex justify-between text-b-g hover:bg-b-g hover:text-btn-mou p-3 font-button w-full">Proposer un trajet
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </p>
                          </Link>
                        </div>
                        <div>
                          <Link to={URL_CURRENTTRIP}>
                            <p className="flex justify-between  hover:bg-b-g hover:text-btn-mou p-3 font-button rounded-b-lg w-full">Trajets en cours
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </p>
                          </Link>
                        </div>

                      </div>
                    )}
                    {/* FIN DROPDOWN TRAJET */}
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e09e50" className="w-10 h-10 relative mx-8 cursor-pointer" onClick={handleOpen2}>
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {/* DROPDOWN USER */}
                    {dropdown2 && (
                      <div className="absolute top-24 right-0 bg-navfoo border border-fond   shadow-xl shadow-slate500/40  rounded-xl w-64 text-xl">
                        <div >
                          <Link to={URL_LOGIN}>
                            <button className="flex justify-between text-b-g text-left hover:bg-b-g hover:text-btn-mou p-3 font-button rounded-t-lg w-full">Se connecter
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </button>
                          </Link>
                        </div>
                        <div>
                          <Link to={URL_REGISTER}>
                            <button className="flex justify-between text-b-g text-left hover:bg-b-g hover:text-btn-mou p-3 font-button rounded-b-lg w-full">S'inscrire
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                    {/* FIN DROPDOWN USER */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
export default Navbar;
