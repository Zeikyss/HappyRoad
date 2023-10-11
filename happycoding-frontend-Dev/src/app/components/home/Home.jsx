import React from "react";
import ReadRoad from "./ReadRoad";



const Home = () => {
    return (
        <div >
            {/* --------------INTRODUCTION-------------- */}
            <div className="flex items-center">
                <div className="w-1/3 mx-auto border border-navfoo dark:border-fond text-b-g dark:text-fond shadow-xl shadow-white500/100 p-8 font-text h-fit z-0 leading-loose rounded-3xl opacity-90">
                    <img src="..\src\app\assets\img\HappyWhite.png" alt="Logo HappyRoad Blanc" className="mr-5 w-30 block dark:hidden" />
                    <img src="..\src\app\assets\img\HappyRoad.png" alt="Logo HappyRoad Blanc" className="mr-5 w-30 hidden dark:block" />
                    <h4 className="text-btn-mou">Seul on va vite, ensemble on va loin</h4>
                    <p>
                        Votre nouvelle application de covoiturage disponible dans toute la France métropolitaine.<br />
                        Grâce à notre système de points, c'est simple et sans surprise (1 point = 1 kilomètre).<br />
                        Vous êtes passager ? Voyagez où vous voulez en échange de points.<br />
                        Conducteur ? Vendez vos points et obtenez des bons d'achats en échange.<br />
                        50 points vous sont crédités dès votre inscription.
                    </p>
                    <h6 className="text-navfoo">
                        Voyagez l'esprit Happy.
                    </h6>
                </div>
                <img src="..\src\app\assets\img\covoit.png" alt="Voiture orange covoiturage" className="m-28 w-1/3" />

            </div>
            {/* --------------FIN INTRODUCTION-------------- */}
            {/* --------------NOUVEAUX TRAJETS-------------- */}
            <div className="mb-10  mx-auto py-8 border border-navfoo dark:border-fond shadow-xl shadow-white500/100 rounded-3xl w-5/6">
                <h5 className="text-center font-subtitle text-b-g dark:text-fond">Nos nouveaux trajets</h5>
                <div className="my-10">
                    <ReadRoad />
                </div>
            </div>
            {/* --------------FIN NOUVEAUX TRAJETS-------------- */}
            {/* --------------RESUME-------------- */}
            <div className="flex font-text text-b-g dark:text-fond p-10">
                <div className="w-1/3 p-28">

                    <h5 className="font-subtitle mb-5 text-btn-mou">Achetez, vendez, échangez</h5>
                    <p className="w-fit">
                        Passager ? Achetez des points pour vos voyages sans vous ruiner. Conducteur ? Echangez vos points contre des bons d'achats.
                    </p>
                </div>
                <div className="w-1/3 p-28">

                    <h5 className="font-subtitle mb-5 text-btn-mou" >Recherchez, réservez et voyagez</h5>
                    <p>
                        Recherchez un trajet parmi de nombreuse destinations. Réservez votre place auprès d'un conducteur et voyagez l'esprit léger.
                    </p>
                </div>
                <div className="w-1/3 p-28">

                    <h5 className="font-subtitle mb-5 text-btn-mou">En toute sécurité</h5>
                    <p>Discutez avec le conducteur et les autres passagers avant votre départ. Nous vérifions les notes, les avis et aussi les commentaires de nos membres.
                    </p>
                </div>
            </div>
            {/* --------------FIN RESUME-------------- */}
        </div>

    )

};

export default Home;