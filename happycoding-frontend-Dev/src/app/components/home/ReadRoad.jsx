import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { URL_ASKTRIP } from "../../constants/urls/urlFrontEnd";
// import ReadRoadHome  from "../../api/backend/account";

const ReadRoad = () => {
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
        <div>
            <section className="flex justify-around text-left w-11/12 items-center p-5 bg-navfoo m-auto rounded-2xl mb-10">
                <Link to={URL_ASKTRIP}>
                    <img src="..\src\app\assets\img\voiture.png" alt="Voiture orange" className="mr-5 w-10" />
                </Link>
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
            </section>
        </div>
    )
}

export default ReadRoad;