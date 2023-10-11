import React, { useState, useEffect } from "react";
import { profilView } from "../../api/backend/profil";
import { getToken } from "../../services/tokenServices";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    URL_HOME,
    URL_ACCOUTMANAGEMENT,
    URL_LOGIN
} from "../../constants/urls/urlFrontEnd";
import { Rating } from "@mui/material";
import { signOut } from "../../redux-store/authenticationSlice";
import { useDispatch } from "react-redux";


const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [Error, setError] = useState(false);

    const [data] = useState({
        pseudo: '',
        avatar: '',
        carPicture: '',
        brand: '',
        model: '',
        color: '',
        places: '',
        smallBagage: '',
        largeBagage: '',
        silence: 'Silence',
        smoke: 'Non fumeur'
    });

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }
        profilView(config)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.pseudo) {
                        data.pseudo = response.data.pseudo;
                    }
                    else {
                        setError(true);
                    }
                    if (response.data.avatar) {
                        data.avatar = response.data.avatar;
                    }
                    else {
                        setError(true);
                    }
                    if (response.data.car) {
                        data.carPicture = response.data.car[0].carPicture;
                        data.brand = response.data.car[0].brand;
                        data.model = response.data.car[0].model;
                        data.places = response.data.car[0].places;

                    }
                    else {
                        setError(true);
                    }
                    if (response.data.silence) {
                        data.silence = response.data.silence;
                    }
                    else {
                        setError(true);
                    }
                    if (response.data.smoke) {
                        data.smoke = response.data.smoke;
                    }
                    else {
                        setError(true);
                    }
                }
                else {
                    Alert("Une erreur s'est produite !");
                }
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        if (error.response.data.userErr) {
                            alert("Une erreur s'est produite ! Vous allez être redirigé vers la page de connexion.")
                            navigate(URL_LOGIN);
                        }
                    }
                    else if (error.response.status === 401) {
                        if (error.response.data.message) {
                            switch (error.response.data.message) {
                                case "Expired JWT Token":
                                    alert("Session expirée ! Vous allez être redirigé vers la page de connexion.");
                                    dispatch(signOut());
                                    navigate(URL_LOGIN);
                                    return null;
                                case "Invalid JWT Token":
                                    alert("Session invalide ! Vous allez être redirigé vers la page de connexion.");
                                    dispatch(signOut());
                                    navigate(URL_LOGIN);
                                    return null;
                                case "JWT Token not found":
                                    alert("Session introuvable ! Vous allez être redirigé vers la page de connexion.");
                                    dispatch(signOut());
                                    navigate(URL_LOGIN);
                                    return null;
                                case "Invalid credentials":
                                    alert("L'utilisateur ou le mot de passe n'existe pas ! Vous allez être redirigé vers la page de connexion.");
                                    dispatch(signOut());
                                    navigate(URL_LOGIN);
                                    return null;
                                default:
                                    alert("Une erreur s'est produite ! Vous allez être redirigé vers la page de connexion.");
                                    dispatch(signOut());
                                    navigate(URL_LOGIN);
                                    return null;
                            }
                        }
                    }
                    else {
                        alert("Une erreur s'est produite !");
                    }
                }
                else if (error.request) {
                    alert("Une erreur s'est produite !");
                }
                else {
                    alert("Une erreur s'est produite !");
                }
            }
            )
    }, [])

    return (
        <div className="w-3/4 pt-56 pb-16 text-b-g dark:text-fond">
            {/* Bouton RETOUR */}
            <Link to={URL_HOME}>
                <div className="bottom-5 right-5 fixed bg-btn-mou opacity-90 p-3 rounded-3xl text-b-g font-text z-10 hover:text-btn-mou hover:bg-b-g">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </Link>

            <div className=" flex w-full justify-around">
                {/* Partie Profil */}
                <div className="pb-6 mr-5 w-1/2 mx-auto border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-8 font-text h-fit z-0  leading-loose rounded-3xl">
                    <div>

                        <h3>{data.pseudo}</h3>

                    </div>
                    <div className="mt-5">
                        <div className="pb-10">
                            <img src={"src/app/assets/img/profils/" + data.avatar} alt="" />
                        </div>
                        <div className="flex justify-between text-left items-center p-5 bg-navfoo m-auto">
                            <div className="font-text ">
                                <p className="text-fond">Note :</p>
                            </div>
                            <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} size="large" readOnly />
                        </div>

                    </div>
                    <div className="border border-navfoo dark:border-fond my-5"></div>
                    <div div className="flex flex-wrap justify-between text-left">
                        <div className=" flex items-center w-1/2">
                            <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                            <div className="mr-2">
                                <p>{data.brand}</p>
                            </div>
                            <div>
                                <p>{data.model}</p>
                            </div>
                        </div>
                        <div className="flex items-center w-1/2">
                            <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                            <div className="mr-2">
                                <p>{data.places} places</p>
                            </div>
                        </div>
                        <div className="flex items-center w-1/2">
                            <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                            <div className="mr-2">
                                <p>{data.silence}</p>
                            </div>
                        </div>
                        <div className="flex items-center w-1/2">
                            <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                            <div className="mr-2">
                                <p>{data.smoke}</p>
                            </div>
                        </div>
                    </div>
                    <div className="border border-navfoo dark:border-fond my-5"></div>
                    <div>
                        <div className="m-auto mt-10">
                            <img src={"src/app/assets/img/voitures/" + data.carPicture} alt="" />
                        </div>
                    </div>
                </div>
                {/* Partie Avis */}
                <div className="ml-5 w-1/2 mx-auto border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-8 font-text h-fit z-0  leading-loose rounded-3xl opacity-90">
                    <h3>Avis</h3>
                </div>
            </div>
            <div className="flex justify-center pt-10">
                <div className="text-b-g dark:text-fond text-xl font-medium">
                    <Link to={URL_ACCOUTMANAGEMENT}>
                        <p className="hover:text-navfoo underline">Modifier mon profil</p>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Profile;