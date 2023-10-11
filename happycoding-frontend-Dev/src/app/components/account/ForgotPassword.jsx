import React, { useState, useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";


import { Link } from "react-router-dom";
import {
    URL_HOME,
    URL_LOGIN
} from "../../constants/urls/urlFrontEnd";

const ForgotPassword = () => {

    const ForgotPasswordSchema = yup.object().shape({

        email: yup
            .string()
            .max(180, 'Votre email ne doit pas comporter plus de 180 caractères !')
            .email("Vous devez saisir un email valide !")
            .required('Vous devez saisir un email !'),

        newpassword: yup
            .string()
            .min(8, 'Le mot de passe doit comporter au minimum 8 caractères !')
            .max(20, 'Le mot de passe ne doit pas comporter plus de 20 caractères !')
            .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[&#@%$=*\-+/_?.,;:!])[A-Za-z\d&#@%$=*\-+/_?.,;:!]{8,20}$/,
                "Vous devez respecter le format du mot de passe !")
            .required('Vous devez saisir un mot de passe !'),
        validnewpassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'La confirmation doit être identique au mot de passe !')
            .required('Vous devez confirmez le mot de passe !'),

    })


    return (
        <div className="w-full mt-40">
            {/* Bouton RETOUR */}
            <Link to={URL_LOGIN}>
                <div className="bottom-5 right-5 fixed bg-btn-mou opacity-90 p-3 rounded-3xl text-b-g font-text z-10 hover:text-btn-mou hover:bg-b-g">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </Link>
            <div className="flex justify-around text-left w-2/3 items-center p-5 m-auto">
                <div className="w-full opacity-90 max-w-md space-y-8 rounded-3xl border text-b-g dark:text-fond border-navfoo dark:border-fond p-4 py-12 px-4 shadow-xl shadow-white500/100">
                    <div>
                        <h2 className="mt-6 text-3xl font-extrabold">Mot de passe oublié</h2>
                    </div>
                    <Formik
                        initialValues={{
                            email: "",
                            newpassword: "",
                            validnewpassword: "",

                        }}
                        validationSchema={ForgotPasswordSchema}
                        onSubmit={ForgotPassword}
                    >
                        <Form className="mt-8 space-y-6">
                            <div className="flex flex-col space-y-3">
                                <label htmlFor="email">Votre adresse mail</label>
                                <Field
                                    type="text"
                                    name="email"
                                    maxLength={180}
                                    placeholder="Votre email"
                                    className="input font-text"
                                />
                                <p className="h-5 pl-2 mb-3">
                                    <ErrorMessage name="email" component={"span"} className="text-errorMessage" />
                                </p>
                                <label htmlFor="newpassword">Nouveau mot de passe</label>
                                <Field
                                    type="password"
                                    name="newpassword"
                                    placeholder="Mot de passe"
                                    minLength={8}
                                    maxLength={20}
                                    className="input font-text"
                                />
                                <p className="h-5 pl-2 mb-3">
                                    <ErrorMessage name="newpassword" component={"span"} className="text-errorMessage" />
                                </p>
                                <label htmlFor="validnewpassword">Confirmation mot de passe</label>
                                <Field
                                    type="password"
                                    name="validnewpassword"
                                    placeholder="Confirmer le mot de passe"
                                    minLength={8}
                                    maxLength={20}
                                    className="input font-text"
                                />
                                <p className="h-5 pl-2 mb-3">
                                    <ErrorMessage name="validnewpassword" component={"span"} className="text-errorMessage" />
                                </p>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="font-medium text-xl text-b-g bg-btn-mou hover:bg-b-g group hover:text-btn-mou p-3 rounded-xl group relative w-full font-button"
                                >
                                    Valider
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div className="">
                    <img src="..\src\app\assets\img\reservation2.png" className="w-full" alt="Echange entre 2 personnes et voiture" />
                </div>
            </div>
        </div>
    )
};

export default ForgotPassword;