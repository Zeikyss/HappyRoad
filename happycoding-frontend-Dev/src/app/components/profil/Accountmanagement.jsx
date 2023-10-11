import React, { useState, useEffect, useRef } from "react";
import { getToken } from "../../services/tokenServices";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { profilUpdateRead, profilUpdateWrite } from "../../api/backend/profil";
import { Link } from "react-router-dom";
import {
    URL_HOME,
    URL_MODIFPASSWORD,
    URL_ACCOUTMANAGEMENT,
    URL_PROFILE,
    URL_ROADHISTORY
} from "../../constants/urls/urlFrontEnd";
import { suppUser } from "../../api/backend/account";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux-store/authenticationSlice";
import { useDispatch } from "react-redux";

const Accountmanagement = () => {

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showModal1, setShowModal1] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);

    


    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [carPicture, setCarPicture] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [totalCredits, setTotalCredits] = useState("");

    function updateProfilJSON(values) {
        return ({
            "pseudo": values.pseudo,
            "email": values.email,
        })
    }

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }
        profilUpdateRead(config)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.pseudo) {
                        setPseudo(response.data.pseudo)
                    }
                    else {
                        setError(true);
                    }
                    if (response.data.email) {
                        setEmail(response.data.email)
                    }
                    else {
                        setError(true);
                    }
                    if (response.data.avatar) {
                        setAvatar(response.data.avatar)
                    }
                    else {
                        setError(true);
                    }
                    if (response.data.car) {
                        setCarPicture(response.data.car[0].carPicture)
                    }
                    else {
                        setError(true);
                    }
                    if (response.data.totalCredits) {
                        setTotalCredits(response.data.totalCredits)
                    }
                    else {
                        setError(true);
                    }

                }
                else {
                    Alert("Une erreur s'est produite 4 !");
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
                }
            })


    }, [])



    const handleUpdate = () => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }
        profilUpdateWrite(updateProfilJSON(values))
            .then((response) => {
                if (response.status === 200) {
                    alert("Vos informations ont bien été modifiées")
                }
                else {
                    Alert("Une erreur s'est produite !");
                }

            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        if (error.response.data.userErr) {
                            alert("Une erreur s'est produite !")
                        }
                    }
                }
            })


    }

    const handleSupp = (values) => {
        suppUser(values)

            .then((res) => {
                if (res.status === 201) {
                    alert("Message envoyé.");
                    // dispatch(signOut());
                    navigate(URL_HOME);
                } else {
                    alert("Message n'a pu être envoyer.");
                }
            })
    }

    const AccountmanagementSchema = yup.object().shape({
        pseudo: yup.string()
            .min(1, 'Le nom de la ville doit comporter au minimum un caractère !')
            .max(25, 'Le nom de la ville ne doit pas comporter plus de 25 caractères !')
            .required('Vous devez saisir un email !'),
        email: yup.string()
            .email(180)
            .required('Vous devez saisir un email !'),

    })
    return (
        <div className="w-3/4 py-24 text-b-g dark:text-fond">
            {/* Bouton RETOUR */}
            <Link to={URL_HOME}>
                <div className="bottom-5 right-5 fixed bg-btn-mou opacity-90 p-3 rounded-3xl text-b-g font-text z-10 hover:text-btn-mou hover:bg-b-g">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </Link>
            {/* PAGE */}
            <div className="flex w-full justify-around m-auto">
                {/* Partie Gestion */}

                <div className="w-1/2">
                    <div className="my-5 text-3xl font-extrabold ">
                        <h4>Editer mon profil</h4>
                    </div>
                    <Formik
                        initialValues={{
                            pseudo: "",
                            email: "",
                            datedenaissance: "",
                            photoprofil: "",
                            marques: "",
                            modeles: "",
                            photoVoiture: "",
                            nbPlaces: "",
                            nbPetitsBagages: "",
                            nbGrosBagages: "",
                            silence: "",
                            fumeur: "",
                            musique: "",
                        }}
                        validationSchema={AccountmanagementSchema}
                        onSubmit={handleUpdate}
                    >
                        <Form>
                            <div className="mr-5 mx-auto border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-8 font-text h-fit z-0  leading-loose rounded-3xl">
                                <div>
                                    <div className="flex flex-col my-3 dark:text-fond">
                                        <h6>Profil</h6>
                                        <label htmlFor="pseudo">Nom d'utilisateur</label>
                                        <Field
                                            type="text"
                                            name="pseudo"
                                            maxLength={25}
                                            placeholder={pseudo}
                                            className="text-fond mb-5"
                                        />
                                        {/* <p className="h-5 pl-2 mb-3">
                                        <ErrorMessage name="pseudo" component={"span"} className="text-errorMessage" />
                                    </p> */}

                                        <label htmlFor="email">Adresse Mail</label>
                                        <Field
                                            type="text"
                                            name="email"
                                            maxLength={25}
                                            placeholder={email}
                                            className="text-fond mb-5"
                                        />
                                        {/* <p className="h-5 pl-2 mb-3">
                                        <ErrorMessage name="email" component={"span"} className="text-errorMessage" />
                                    </p> */}
                                        <label htmlFor="photoProfil">Photo de profil</label>
                                        <div className="flex justify-between items-center">

                                            <img src={"src/app/assets/img/profils/" + avatar} className="w-1/3 border border-solid border-navfoo" alt="" />
                                            <Field
                                                type="file"
                                                name="photoProfil"
                                            />
                                        </div>

                                        <h6 className="mt-6">Voiture</h6>
                                        <label htmlFor="photoVoiture">Photo de ma voiture</label>
                                        <div className="flex justify-between items-center mb-5">
                                            <img src={"src/app/assets/img/voitures/" + carPicture} className="w-1/3 border border-solid border-navfoo" alt="" />
                                            <Field
                                                type="file"
                                                name="photoVoiture"
                                            />
                                        </div>

                                        <div className=" flex my-5">
                                            <label htmlFor="marque" className="pr-5">Marque</label>
                                            <Field
                                                type="checkbox"
                                                name="marque"
                                                className="input w-2 mr-3"
                                            />
                                            <select name="marque" id="" className="text-fond">
                                                <option value="">Peugeot</option>
                                                <option value="">Renault</option>
                                                <option value="">Citroen</option>

                                            </select>
                                        </div>

                                        <div className="mt-5">
                                            <h6>Options</h6>
                                            <div className="flex items-center my-3">
                                                <Field
                                                    type="checkbox"
                                                    name="Silence"
                                                    className="input w-2 mr-3"
                                                />
                                                <p>Silence</p>
                                            </div>
                                            <div className=" flex items-center my-3">
                                                <Field
                                                    type="checkbox"
                                                    name="Fumeur"
                                                    className="input w-2 mr-3"
                                                />
                                                <p>Fumeur</p>
                                            </div>
                                            <div className=" flex mb-3 ">
                                                <label htmlFor="musique" className="pr-5">Musique</label>
                                                <select name="musique" id="" className="text-fond">
                                                    <option value="">Choisissez votre musique</option>
                                                    <option value="">Variété</option>
                                                    <option value="">Rock</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="text-lg text-b-g dark:text-fond">
                                    <Link to={URL_MODIFPASSWORD}>
                                        <span className="underline font-medium  hover:text-navfoo">
                                            Nouveau mot de passe ?
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-center mt-10 text-b-g">
                                <button type="submit" className="text-xl font-medium bg-btn-mou  hover:bg-b-g hover:text-btn-mou rounded-xl p-3 group relative w-28 font-button">
                                    Valider
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>


                {/* Partie Crédit */}
                <div className="w-1/2 mt-20">
                    <div className="mr-5 mx-auto border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-8 font-text h-fit z-0  leading-loose rounded-3xl">
                        <div className="mt-6">
                            <h4>Mon crédit de points</h4>
                        </div>
                        <div className="relative">
                            <input type="text" className="w-full my-3" placeholder={totalCredits} />
                            <div className="absolute right-5 top-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000000" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            </div>

                        </div>
                        <div className="mt-6">
                            {/* -----------POP-UP----------- */}
                            <h4>Achats / Ventes de point</h4>
                            <>
                                <div className="flex justify-center ">
                                    <button type="button" className="text-xl text-b-g font-medium bg-btn-mou hover:bg-b-g hover:text-btn-mou rounded-xl p-3 group relative w-32 font-button my-5 "
                                        onClick={() => setShowModal1(true)}>
                                        Voir
                                    </button>
                                    {showModal1 ? (
                                        <>
                                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                                <div className="relative w-auto my-10 mx-auto max-w-6xl">
                                                    <div className="border-navfoo dark:border-fond rounded-3xl shadow-lg relative flex flex-col w-full bg-fond dark:bg-fond-clair outline-none focus:outline-none border border-solid">
                                                        <div className="flex items-start justify-between p-10">
                                                            <h4>Achats de point</h4>
                                                            <button
                                                                className="p-1 ml-auto bg-transparent text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                onClick={() => setShowModal1(false)}
                                                            >
                                                                <span className="bg-transparent text-btn-mou h-6 w-6 text-2xl block absolute top-2 right-2">
                                                                    X
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className="">
                                                            <div className="m-5 flex items-center">
                                                                <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                                                                <p>25 points = 2.5 €</p>
                                                            </div>
                                                            <div className="m-5 flex items-center">
                                                                <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                                                                <p>50 points = 5 €</p>
                                                            </div>
                                                            <div className="m-5 flex items-center">
                                                                <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                                                                <p>100 points + 10 offerts = 10 €</p>
                                                            </div>
                                                            <div className="flex justify-center text-b-g">
                                                                <button type="submit" className="text-xl font-medium bg-btn-mou hover:bg-b-g hover:text-btn-mou rounded-xl p-3 group relative w-32 font-button my-5">
                                                                    Valider
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                        </>
                                    ) : null}
                                </div>
                            </>
                        </div>
                        <div className="mt-6">
                            <h4>Vente de mes points</h4>
                            <div className="relative">
                                <input type="text" className="w-full my-3" />
                                <div className="absolute right-5 top-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000000" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                </div>
                                <div className="flex justify-center ">
                                    <button type="submit" className="text-b-g text-xl font-medium bg-btn-mou hover:bg-b-g hover:text-btn-mou rounded-xl p-3 group relative w-32 font-button my-5">
                                        Valider
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="text-b-g text-xl font-medium bg-navfoo hover:bg-b-g hover:text-navfoo rounded-xl p-3 group relative w-50 font-button w-1/3 my-16">
                            Désactiver mon compte
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="text-b-g text-xl font-medium bg-btn-mou hover:bg-b-g hover:text-btn-mou rounded-xl p-3 group relative w-50 font-button w-1/3"
                            onClick={() => setShowModal2(true)}>
                            Supprimer mon compte
                        </button>
                        {showModal2 ? (
                            <>
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                    <div className="relative w-auto my-10 mx-auto max-w-6xl">
                                        <div className="p-5 border-navfoo dark:border-fond rounded-3xl shadow-lg relative flex flex-col w-full bg-fond dark:bg-fond-clair outline-none focus:outline-none border border-solid">
                                            <h4>Etes-vous sûr ?</h4>
                                            <hr className="border dark:border-fond" />
                                            <div className="flex items-start justify-between text-b-g">
                                                <button type="submit" className="text-xl mr-2 font-medium bg-navfoo hover:bg-b-g hover:text-navfoo rounded-xl p-3 group relative w-32 font-button my-5"
                                                    onClick={() => setShowModal2(false)}>
                                                    Non
                                                </button>

                                                <button type="submit" className="text-xl ml-2 font-medium bg-btn-mou hover:bg-b-g hover:text-btn-mou rounded-xl p-3 group relative w-32 font-button my-5"
                                                    onClick={handleSupp}
                                                >
                                                    Oui
                                                </button>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                    </div>

                    <div className="flex justify-center">
                        <div className="underline p-3 text-center text-xl font-medium hover:text-navfoo mt-16 ">
                            <Link to={URL_ROADHISTORY}>
                                <p>Historique de mes trajets</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accountmanagement;