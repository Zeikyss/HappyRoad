import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { URL_HOME } from "../../../constants/urls/urlFrontEnd";

const SuggestTrip = () => {

    const SearchtrajetSchema = yup.object().shape({
        depart: yup.string()
            .min(1, 'Le nom de la ville doit comporter au minimum un caractère !')
            .max(55, 'Le nom de la ville ne doit pas comporter plus de 55 caractères !')
            .required('Vous devez saisir un nom de ville de départ!'),
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
        <div className="w-full mt-56 mb-16 text-b-g relative">
            {/* Bouton RETOUR */}
            <Link to={URL_HOME}>
                <div className="bottom-5 right-5 fixed bg-btn-mou opacity-90 p-3 rounded-3xl text-b-g font-text z-10 hover:text-btn-mou hover:bg-b-g">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </Link>
            <div>
                <img src="..\src\app\assets\img\happyroad_eco.png" className="absolute top-0 right-52 w-52 z-10" alt="Vignette éco covoiturage" />
            </div>
            <div className="ml-80 dark:text-fond pb-5 text-3xl font-extrabold">
                <h4>Proposez votre trajet</h4>
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
                validationSchema={SearchtrajetSchema}>
                <Form>
                    <div className="m-auto border border-navfoo dark:border-fond text-b-g shadow-xl shadow-white500/100 opacity-90 p-5 rounded-3xl font-text w-2/3">
                        <div className="flex justify-around">
                            <div className="flex flex-col my-3 text-b-g dark:text-fond w-1/3 ">
                                <label htmlFor="ville" className="pl-2 mt-6">Votre point de départ</label>
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

                                <label htmlFor="arrivee" className="pl-2 mt-4">Votre point d'arrivée</label>
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

                                <label htmlFor="nbPlaces" className="pl-2 mt-4">Nombre de places disponibles</label>
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

                                <label htmlFor="nbPetitsBagages" className="pl-2 mt-4">Nombre de petits bagages autorisés</label>
                                <Field
                                    type="number"
                                    name="nbPetitsBagages"
                                    min={0}
                                    className="text-fond"
                                // max={8}
                                />

                                <label htmlFor="nbGrosBagages" className="pl-2 mt-4">Nombre de gros bagages autorisés</label>
                                <Field
                                    type="number"
                                    name="nbGrosBagages"
                                    min={0}
                                    className="text-fond"
                                // max={8}
                                />


                            </div>
                            <div className="border-r border-navfoo dark:border-fond"></div>
                            {/* ------------PARTIE OPTIONS-------------------- */}
                            <div className="w-1/3 text-b-g dark:text-fond">
                                <h4 className="mt-6 pb-8 text-3xl  font-subtitle">Options</h4>
                                <div className="flex mb-3">
                                    <Field
                                        type="checkbox"
                                        name="Silence"
                                        className="input w-2 mr-3"
                                    />
                                    <p>Silence</p>
                                </div>
                                <div className=" flex mb-3">
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
                    <div className="flex justify-end mt-10 mr-80">
                        <button type="submit" className="text-xl font-medium bg-btn-mou  hover:bg-b-g hover:text-btn-mou rounded-xl p-3  group relative w-60 font-button">
                            Valider le trajet
                        </button>
                    </div>
                </Form>
            </Formik>

        </div>
    )
};

export default SuggestTrip;