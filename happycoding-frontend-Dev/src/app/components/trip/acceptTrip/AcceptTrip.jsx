import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Link } from "react-router-dom";
import {
    URL_SEARCHTRIP,
    URL_PROFILE
} from "../../../constants/urls/urlFrontEnd";

const AcceptTrip = () => {

    const [showModal, setShowModal] = React.useState(false);

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
        <div className="w-full my-28 text-b-g dark:text-fond font-text">
            <div className="m-auto w-2/3 mb-10">
                {
                    data.map((item) => <h4>{item.pseudoF} souhaite voyager avec vous sur le trajet :</h4>)
                }
            </div>
            <div className="flex w-full justify-around">
                <div className="w-2/3 border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-8 font-text h-fit z-0  leading-loose rounded-3xl">
                    <div className="flex items-center">
                        <div className="w-1/2">
                            <div className="pb-10">
                                {
                                    data.map((item) => <img className="w-3/4" src={item.photo} />)
                                }
                            </div>
                            <div className="flex justify-between text-left items-center p-2 bg-navfoo w-3/4 mb-4">
                                <div className="font-text ">
                                    <p>Note :</p>
                                </div>
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e09e50" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e09e50" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e09e50" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e09e50" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="m-auto mt-10">
                                {
                                    data.map((item) => <img className="" src={item.photoVoiture} />)
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-around text-left w-full items-center p-2 bg-navfoo m-auto mt-4">
                            <div>
                                {
                                    data.map((item) => <p> {item.depart}</p>)
                                }
                                {
                                    data.map((item) => <p> {item.adresseD}</p>)
                                }
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={5} stroke="#e09e50" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                            <div>
                                {
                                    data.map((item) => <p> {item.arrivee}</p>)
                                }
                                {
                                    data.map((item) => <p> {item.adresseA}</p>)
                                }
                            </div>
                            <div className="text-center">
                                {
                                    data.map((item) => <p>{item.date}</p>)
                                }
                                {
                                    data.map((item) => <p>{item.heure}</p>)
                                }
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="my-4 p-3 flex justify-end items-center w-5/6 text-b-g text-xl">
                <div>
                    <button type="submit" className="bg-navfoo p-3 rounded-xl hover:text-navfoo hover:bg-b-g w-36 mr-4"
                    onClick={() => setShowModal(true)}>
                        Refuser
                    </button>
                    {showModal ? (
                        <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-10 mx-auto max-w-6xl">
                                    <div className="p-5 border-navfoo dark:border-fond rounded-3xl shadow-lg relative flex flex-col w-full bg-fond dark:bg-fond-clair outline-none focus:outline-none border border-solid">
                                        <h4 className="dark:text-fond">Etes-vous sûr ?</h4>
                                        <hr className="border dark:border-fond" />
                                        <div className="flex items-start justify-between text-b-g">
                                            <button type="submit" className="text-xl mr-2 font-medium bg-navfoo hover:bg-b-g hover:text-navfoo rounded-xl p-3 group relative w-32 font-button my-5"
                                                onClick={() => setShowModal(false)}>
                                                Non
                                            </button>

                                            <button type="submit" className="text-xl ml-2 font-medium bg-btn-mou hover:bg-b-g hover:text-btn-mou rounded-xl p-3 group relative w-32 font-button my-5"
                                                
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
                <div>
                    <button type="submit" className="bg-btn-mou p-3 rounded-xl hover:text-btn-mou hover:bg-b-g w-36 ml-4">
                        Accepter
                    </button>
                </div>
            </div>
        </div>

    )
}

export default AcceptTrip