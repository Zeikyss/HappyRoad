import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { Link } from "react-router-dom";
import { URL_HOME } from "../../../constants/urls/urlFrontEnd";
import { Rating } from "@mui/material";

const RateTrip = () => {

    const [data, setData] = useState([]);
    const getData = () => {
        fetch('data.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setData(myJson)
            });
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="w-3/4 pt-36 pb-16 text-b-g dark:text-fond">
            {/* Bouton RETOUR */}
            <Link to={URL_HOME}>
                <div className="bottom-5 right-5 fixed bg-btn-mou opacity-90 p-3 rounded-3xl text-b-g font-text z-10 hover:text-btn-mou hover:bg-b-g">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </Link>
            <h4 className="py-6 ">Qu'avez vous pensé de ce tajet ?</h4>
            <Formik
                initialValues={{
                    commentaire: "",
                }}>
                <Form>
                    <section className="mr-5 mx-auto border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-8 font-text h-fit z-0  leading-loose rounded-3xl">
                        <article className="flex justify-between items-center w-full">
                            <div className="w-1/2">
                                <div>
                                    {
                                        data.map((item) => <h3>{item.pseudoF}</h3>)
                                    }
                                </div>
                                <div className="pb-10">
                                    {
                                        data.map((item) => <img className="w-full" src={item.photo} />)
                                    }
                                </div>
                            </div>
                            <div className="flex items-center justify-center w-1/2">
                                <p className="mx-5 text-2xl">Note :</p>
                                <Rating name="half-rating" defaultValue={0} precision={0.5} size="large" />
                                {/* <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e09e50" className="w-8 h-8">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e09e50" className="w-8 h-8">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e09e50" className="w-8 h-8">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e09e50" className="w-8 h-8">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                </div> */}
                            </div>
                        </article>
                        <Field
                            type='textarea'
                            className="input font-text mx-auto bg-b-g text-fond w-2/3 h-40"
                            name="message"
                            as="textarea"
                            placeholder="Saisissez votre commentaire"
                        />
                        <p>
                            <ErrorMessage
                                name="commentaire"
                                component={"span"}
                                className="text-errorMessage"
                            />
                        </p>
                    </section>
                    <article className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-btn-mou hover:bg-b-g hover:text-btn-mou rounded-xl p-3 group relative w-52 font-button text-xl font-semibold my-10 text-b-g">
                            Envoyer
                        </button>
                    </article>
                </Form>
            </Formik>

        </div >
    )


}
export default RateTrip;