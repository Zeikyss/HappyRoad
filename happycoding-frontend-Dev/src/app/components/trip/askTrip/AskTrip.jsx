import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";


import { Link } from "react-router-dom";
import {
    URL_SEARCHTRIP,
    URL_PROFILE
} from "../../../constants/urls/urlFrontEnd";

import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';
import Routing from "./Map/Routing";


const AskTrip = () => {
    //Iframe pour React
    // const {
    //     iframeSource = '<iframe className="my-auto" src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d162607.7445085848!2d2.9291552715690545!3d50.44583148925561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x47dd4871320457eb%3A0x59825bb203519d63!2sPl.%20du%20Mar%C3%A9chal%20Foch%2C%2062000%20Arras!3m2!1d50.287185799999996!2d2.7810424!4m5!1s0x47c2d58bcd16e263%3A0xd6eb15a20cce3494!2sPl.%20de%20la%20Gare%2C%2059800%20Lille!3m2!1d50.6362252!2d3.0695348!5e0!3m2!1sfr!2sfr!4v1683640811103!5m2!1sfr!2sfr" width="580" height="700" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    // } = props;
    const position = [50.507863, 2.940429]

    //Test "DataJson" pour "AskTrajet" avec "data.json"
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
    //---------------------------------------------------------
    return (
        <div className="w-full my-20 text-b-g dark:text-fond font-text">
            {/* Bouton RETOUR */}
            <Link to={URL_SEARCHTRIP}>
                <div className="bottom-5 right-5 fixed bg-btn-mou opacity-90 p-3 rounded-3xl text-b-g font-text z-10 hover:text-btn-mou hover:bg-b-g">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </Link>
            {/* Résultat Recherche Avancée */}
            <div className="my-8 p-3">
                <div className="flex justify-around text-left w-2/3 items-center p-5 bg-navfoo m-auto rounded-2xl mb-10 text-fond">
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
                <div className="flex justify-center">
                    <div className="w-1/3 opacity-90 border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-5 rounded-3xl mt-5 mb-10 font-text h-1/3 ">
                        <div className="font-text">
                            {
                                data.map((item) => <h4>{item.pseudoF}</h4>)
                            }
                        </div>
                        <div className="font-text">
                            {
                                data.map((item) => <img className="w-full py-8" src={item.photo} />)
                            }
                        </div>
                        <div className="flex justify-between text-left items-center p-5 bg-navfoo m-auto">



                            <div className="font-text text-fond">
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
                        <div className="text-left font-text flex flex-col py-5">
                            <div className="flex px-10 py-2">
                                <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                                <div>
                                    {
                                        data.map((item) => <p>{item.option1}</p>)
                                    }
                                </div>
                            </div>
                            <div className="flex px-10 py-2">
                                <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                                <div>
                                    {
                                        data.map((item) => <p>{item.option2}</p>)
                                    }
                                </div>
                            </div>
                            <div className="flex px-10 py-2">
                                <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                                <div>
                                    {
                                        data.map((item) => <p>{item.option3}</p>)
                                    }
                                </div>
                            </div>

                        </div>


                    </div>
                    <div id="map" className="w-1/3 opacity-90 border text-fond border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-5 ml-4 rounded-3xl mt-5 mb-10 font-text">

                        <MapContainer center={position} zoom={10} scrollWheelZoom={true} className="h-map">
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Routing />
                        </MapContainer>
                    </div>
                </div>

                <div className=" p-3 flex justify-around items-center">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center ml-10">
                            <h4 className="mr-5">Coût :</h4>
                            <div>
                                {
                                    data.map((item) => <h5>{item.cout}</h5>)
                                }
                            </div>
                        </div>
                        <div>
                            <div className=" ml-64 rounded-xl text-fond">
                                <Link to={URL_PROFILE}>
                                    <h6 className="hover:text-navfoo underline">Voir le profil</h6>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <button type="submit" className="text-xl text-b-g font-medium bg-btn-mou p-3 rounded-xl hover:text-btn-mou hover:bg-b-g w-44">
                            Accepter
                        </button>
                    </div>
                </div>


            </div>


        </div>
    )
};

export default AskTrip;