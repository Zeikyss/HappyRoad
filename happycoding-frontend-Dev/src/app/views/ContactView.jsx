import React from "react";
import Contact from "../components/home/Contact";
import { Link } from "react-router-dom";



const ContactView = () => {

   return (
      <>
         <div className='flex justify-center h-full w-full bg-no-repeat pt-16'>
            <Contact />

         </div>
      </>
   )
}

export default ContactView;