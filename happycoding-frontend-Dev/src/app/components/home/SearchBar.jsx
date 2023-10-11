import React from "react";


const SearchBar = () => {
    return (
        <div className="mb-10 mx-auto pt-32 py-8 w-5/6">
            <div className="mt-20">
                <div className="flex justify-center text-fond h-16">
                    <input type="search" name="" placeholder="Départ" id="" className="rounded-l-3xl w-1/4"/>
                    <input type="search" name="" placeholder="Arrivée" id="" className="w-1/4"/>
                    <input type="date" name="" placeholder="Date" id="" className="w-1/4 "/>
                    <button
                        className=" rounded-r-3xl relative z-[2] flex items-center bg-btn-mou px-6 py-2.5 font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-b-g hover:text-btn-mou focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        type="button"
                        id="button-addon1"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                        Rechercher
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5 ml-2">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )

};

export default SearchBar;