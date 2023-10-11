import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL_PROFILE, URL_ACCOUTMANAGEMENT } from "../../constants/urls/urlFrontEnd";


const RoadHistory = () => {
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
        <div className="w-11/12 pt-36 pb-16 text-b-g dark:text-fond">
            {/* Bouton RETOUR */}
            <Link to={URL_ACCOUTMANAGEMENT}>
                <div className="bottom-5 right-5 fixed bg-btn-mou opacity-90 p-3 rounded-3xl text-b-g font-text z-10 hover:text-btn-mou hover:bg-b-g">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </Link>
            <h4 className="pb-4" >Historique de mes trajets :</h4>
            <article className="mr-5 mx-auto border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-8 font-text h-fit z-0  leading-loose rounded-3xl">
                <section className="flex justify-around text-left w-11/12 items-center p-5 bg-navfoo m-auto rounded-2xl mb-10">
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
                    <div className="text-center">
                        {
                            data.map((item) => <p>{item.date}</p>)
                        }
                        {/* {
                            data.map((item) => <p>{item.heure}</p>)
                        } */}
                    </div>
                    <button className="text-fond font-semi-bold underline hover:text-b-g"><Link to={URL_PROFILE}>Voir profil conducteur</Link></button>
                </section>
            </article>
            {/* ------------------------------------------------------ */}

        </div>
    )
};

export default RoadHistory;