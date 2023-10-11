import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { URL_HOME } from "../../../constants/urls/urlFrontEnd";

const SearchTrip = () => {

    const SearchtrajetSchema = yup.object().shape({
        depart: yup.string()
            .min(1, 'Le nom de la ville doit comporter au minimum un caractère !')
            .max(55, 'Le nom de la ville ne doit pas comporter plus de 55 caractères !')
            .required('Vous devez saisir un nom de ville de départ !'),
        arrivee: yup.string()
            .min(1, 'Le nom de la ville doit comporter au minimum un caractère !')
            .max(55, 'Le nom de la ville ne doit pas comporter plus de 55 caractères !')
            .required('Vous devez saisir un nom de ville d\'arrivée !'),
        dateHeureDepart: yup.string()
            .required('Vous devez saisir une date de départ !'),
        nbPlaces: yup.string()
            .required('Vous devez saisir un nombre de places souhaitées !'),
    })

    return (
        <div className="w-3/4 py-36 text-b-g dark:text-fond">
            {/* Bouton RETOUR */}
            <Link to={URL_HOME}>
                <div className="bottom-5 right-5 fixed bg-btn-mou opacity-90 p-3 rounded-3xl text-b-g font-text z-10 hover:text-btn-mou hover:bg-b-g">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </Link>
            <div className="flex w-full justify-around m-auto">
                <div className="w-1/2">
                    <div className="font-text">
                        <h2 className="my-6 text-3xl font-extrabold ">
                            Recherchez votre trajet
                        </h2>
                    </div>
                    <Formik
                        initialValues={{
                            depart: "",
                            arrivee: "",
                            dateHeureDepart: "",
                            nbPlaces: "",
                            nbPetitsBagages: "",
                            nbGrosBagages: "",
                            silence: "",
                            fumeur: "",
                            musique: "",
                        }}
                        validationSchema={SearchtrajetSchema}
                    >
                        <Form>
                            <div className="mr-5  mx-auto  border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-8  h-fit z-0  leading-loose rounded-3xl opacity-90">
                                <div >
                                    <div className="flex flex-col my-3">
                                        <label htmlFor="depart" className="pl-2 mt-4">Ville de départ</label>
                                        <Field
                                            type="text"
                                            name="depart"
                                            autoComplete=""
                                            maxLength={55}
                                            className="text-fond"
                                        />
                                        <p className="h-5 pl-2 mb-1">
                                            <ErrorMessage name="depart" component={"span"} className="text-errorMessage" />
                                        </p>

                                        <label htmlFor="arrivee" className="pl-2 mt-4">Ville d'arrivée</label>
                                        <Field
                                            type="text"
                                            name="arrivee"
                                            autoComplete=""
                                            maxLength={55}
                                            className="text-fond"
                                        />
                                        <p className="h-5 pl-2 mb-1">
                                            <ErrorMessage name="arrivee" component={"span"} className="text-errorMessage" />
                                        </p>

                                        <label htmlFor="dateHeureDepart" className="pl-2 mt-4">Date /Heure de départ</label>
                                        <Field
                                            type="datetime-local"
                                            name="dateHeureDepart"
                                            className="text-fond"
                                        />
                                        <p className="h-5 pl-2 mb-1">
                                            <ErrorMessage name="dateHeureDepart" component={"span"} className="text-errorMessage" />
                                        </p>

                                        <label htmlFor="nbPlaces" className="pl-2 mt-4">Nombre de places souhaitées</label>
                                        <Field
                                            type="number"
                                            name="nbPlaces"
                                            min={1}
                                            max={8}
                                            className="text-fond"
                                        />
                                        <p className="h-5 pl-2 mb-1">
                                            <ErrorMessage name="nbPlaces" component={"span"} className="text-errorMessage" />
                                        </p>

                                        <label htmlFor="nbPetitsBagages" className="pl-2 mt-4">Nombre de petits bagages</label>
                                        <Field
                                            type="number"
                                            name="nbPetitsBagages"
                                            min={0}
                                            // max={8}
                                            className="text-fond"
                                        />

                                        <label htmlFor="nbGrosBagages" className="pl-2 mt-4">Nombre de gros bagages</label>
                                        <Field
                                            type="number"
                                            name="nbGrosBagages"
                                            min={0}
                                            // max={8}
                                            className="text-fond"
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="flex justify-end mt-10 mr-6">
                                <button type="submit" className="text-b-g text-xl font-medium bg-btn-mou  hover:bg-b-g hover:text-btn-mou rounded-xl p-3 group relative w-60 font-button">
                                    Rechercher
                                </button>
                            </div>

                        </Form>
                    </Formik>
                </div>
                <div className="w-1/2">
                    {/* N'apparait qu'après la recherche effectuée */}

                    <h2 className="my-6 text-3xl font-extrabold font-text">
                        Voici les trajets trouvés
                    </h2>
                    <div className="mr-5 mx-auto border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-8 font-text h-fit z-0  leading-loose rounded-3xl opacity-90">
                    </div>
                    <img src="..\src\app\assets\img\Départ_ticket.png" alt="Icket covoiturage" className="my-10 mx-auto w-2/3" />
                </div>

            </div>
        </div >
    )
};

export default SearchTrip;