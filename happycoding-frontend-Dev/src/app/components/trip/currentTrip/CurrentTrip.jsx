import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL_CHAT, URL_RATETRIP } from "../../../constants/urls/urlFrontEnd";
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';
import Routing from "./Map/Routing";

const CurrentTrip = () => {
   const position = [50.507863, 2.940429]

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
         <h4 className="py-6">Trajet en cours</h4>
         <section className="mr-5 mx-auto border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-8 font-text h-fit z-0  leading-loose rounded-3xl">
            {/* Partie Conducteur */}
            <article className="flex  justify-around">
               <div className="w-1/2">
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
               </div>
               <div className="w-1/2">
                  <div className="m-auto mt-10">
                     {
                        data.map((item) => <img className="" src={item.photoVoiture} />)
                     }
                  </div>
                  <div className=" flex justify-center items-center w-1/2">
                     <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                     <div className="mr-2">
                        {
                           data.map((item) => <p>{item.marque}</p>)
                        }
                     </div>
                     <div>
                        {
                           data.map((item) => <p>{item.modele}</p>)
                        }
                     </div>
                  </div>
               </div>
            </article>
            {/* Partie Options */}
            <article className="">
               <h4>Vos options</h4>
               <div className="flex px-10 py-2 items-center">
                  <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                  <div>
                     {
                        data.map((item) => <p>{item.option1}</p>)
                     }
                  </div>
               </div>
               <div className="flex px-10 py-2 items-center">
                  <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                  <div>
                     {
                        data.map((item) => <p>{item.option2}</p>)
                     }
                  </div>
               </div>
               <div className="flex px-10 py-2 items-center">
                  <div className="rounded-3xl w-4 h-4 bg-btn-mou mr-2"></div>
                  <div>
                     {
                        data.map((item) => <p>{item.option3}</p>)
                     }
                  </div>
               </div>
            </article>
            {/* Partie Trajet */}

            <article className="my-10">
               <h4 className="mb-5">Votre trajet</h4>
               <div className="flex justify-around text-left w-full items-center bg-navfoo m-auto text-fond">
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
            </article>
            {/* Partie Map */}
            <article id="map" className="opacity-90 text-fond m-5 font-text">
               <MapContainer center={position} zoom={10} scrollWheelZoom={true} className="h-map">
                  <TileLayer
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Routing />
               </MapContainer>
            </article>
         </section>
         {/* Partie Lien */}
         <section className="flex justify-around">
            <div className="underline p-3 text-center text-xl font-medium hover:text-navfoo mt-16">
               <Link to={URL_CHAT}>
                  <p>Accéder au chat</p>
               </Link>
            </div>
            <div className="underline p-3 text-center text-xl font-medium hover:text-navfoo mt-16">
               <Link to={URL_RATETRIP}>
                  <p>Noter le trajet</p>
               </Link>
            </div>
         </section>
      </div>
   )


}
export default CurrentTrip;