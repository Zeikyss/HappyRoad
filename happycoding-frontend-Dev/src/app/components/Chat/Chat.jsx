import React, {useState, useEffect} from "react";
import { Formik, Field, ErrorMessage,Form } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import {
    URL_CHATHISTORY,
    URL_HOME,
  } from "../../constants/urls/urlFrontEnd";
import HomeChat from "./HomeChat";



const Chat = ({socket}) => {

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
    <div className="w-3/4 pt-36 pb-16 text-fond"> 
          <h4 className="py-4 text-b-g dark:text-fond">Mes discussions</h4>
      <section className="mr-5 mx-auto border border-navfoo dark:border-fond shadow-xl shadow-white500/100 p-8 font-text h-fit z-0  leading-loose rounded-3xl">
        <h5 className="m-4 text-b-g dark:text-fond">Concerne votre trajet:</h5>
        {/* paramétre du rappel de trajet */}
                 <article className="flex justify-around text-left w-11/12 items-center p-5 bg-navfoo m-auto rounded-2xl mb-10">
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
                        {
                            data.map((item) => <p>{item.heure}</p>)
                        } 
                    </div>
                 </article>
              {/* parametre du chat */}
            <section className="overflow-y-auto h-1/4 max-h-96 mx-auto border border-navfoo  dark:border-fond w-11/12  shadow-xl shadow-white500/100 p-8 font-text z-0  leading-loose rounded-3xl  bg-ChatBG bg-no-repeat bg-contain bg-center ">
                        <HomeChat socket={socket}/>
            </section>
        </section>
        <Link to={URL_CHATHISTORY} className="m-8">
                <p className="text-b-g">Historique de vos discussions</p>
                </Link>  
        <Link to={URL_HOME}>
                <div className="bottom-5 right-5 fixed bg-btn-mou opacity-90 p-3 rounded-3xl text-b-g font-text z-10 hover:text-btn-mou hover:bg-b-g">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </Link>
   </div>
)
}
export default Chat;