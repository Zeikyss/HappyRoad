import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { URL_PROFILE, URL_HOME } from "../../constants/urls/urlFrontEnd";


const Favorite = () => {
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
    const users = [
        { username: "Zeikyss" },
        { username: "Saphir" },
        { username: "Tammy" },
        { username: "Greyback" },
        { username: "Fred" }
    ]

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
            <h4 className="py-6 ">Mes Favoris</h4>
            <section className="flex flex-row justify-items-start">
                <article className="basis-1/2 mr-5 mx-auto border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-8 pb-10 font-text h-fit z-0  leading-loose rounded-3xl">
                    <h5> Conducteurs préférés :</h5>
                    <article className="flex justify-around text-left w-11/12 items-center p-5  m-auto rounded-2xl mb-10">
                        <div>
                            {users.map((data, idx) => (
                                <section className="flex items-center justify-between my-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#e09e50" className="w-6 h-6 mr-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                    <div className=" px-36 ">
                                        <Link to={URL_PROFILE}>
                                            <p key={idx}>{data.username}</p>
                                        </Link>
                                    </div>
                                    <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ff0000" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg></button>
                                </section>
                            ))}
                        </div>
                    </article>
                </article>
                <article className="basis-1/2 mr-5 mx-auto border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-8 font-text h-fit z-0  leading-loose rounded-3xl">
                    <h5>Destinations préférés :</h5>
                    <article className="flex justify-around text-left w-11/12 items-center p-5  m-auto rounded-2xl mb-10">
                        <img src="..\src\app\assets\img\voiture.png" alt="Route" className="mr-5 w-10" />
                        <div>
                            {
                                data.map((item) => <p> {item.depart}</p>)
                            }
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={5} stroke="#e09e50" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                        <div>
                            {
                                data.map((item) => <p> {item.arrivee}</p>)
                            }
                        </div>
                        <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ff0000" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg></button>
                    </article>
                </article>
            </section>
            <section>
                <article className="flex justify-center">
                    <img src="..\src\app\assets\img\favoris.png" alt="illustration de mis en relation" className="w-2/3" />
                </article>
            </section>
        </div>
    )
}
export default Favorite;
