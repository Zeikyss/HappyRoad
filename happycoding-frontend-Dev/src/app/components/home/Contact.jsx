import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  SITE_KEY,
  SECRET_KEY,
} from "../../constants/recaptcha/keyAppRecaptcha";
import * as yup from "yup";
import {
  URL_HOME
} from "../../constants/urls/urlFrontEnd";
import { useNavigate } from "react-router-dom";
import { contact } from "../../api/backend/account";
import { REGEX_TEXT } from "../../constants/regex";
import { REGEX_MSG } from './../../constants/regex';

const Contact = () => {
  const navigate = useNavigate();
  const captchaRef = useRef(null);

  const handleCaptcha = async (values) => {
    let token = captchaRef.current.getValue();
    // captchaRef.current.reset();

    if (token) {
      contact(values)
        .then((res) => {
          if (res.status === 200) {
            alert("Message envoyé.");
            navigate(URL_HOME);
          }
        });
    }
    else {
      alert("Message n'a pu être envoyer.");
    }
  }

  const ContactSchema = yup.object().shape({
    email: yup
      .string()
      .max(180, 'Votre email ne doit pas comporter plus de 180 caractères !')
      .email("Vous devez saisir un email valide !")
      .min(6, 'Votre email doit comporter au minimum 6 caractères !')
      .max(180, 'Votre email ne peut pas comporter plus de 180 caractères !')
      .required('Vous devez saisir un email !'),
    subject: yup
      .string()
      .min(5, 'Votre message doit comporter au moins  5 caractères !')
      .max(200, 'Votre message concerne ne doit pas comporter plus de 100 caractères !')
      .matches(REGEX_TEXT, "Votre sujet ne doit pas comporter de caractères spéciaux !")
      .required(`Vous devez précisé l'object de votre demande`),
    message: yup
      .string()
      .min(20, 'Votre message doit comporter au moins  20 caractères !')
      .max(500, 'Votre message ne doit pas comporter plus de 500 caractères !')
      .matches(REGEX_MSG, "Votre message ne doit pas comporter de caractères spéciaux !")
      .required("Vous devez saisir votre message"),
  });

  return (
    <div className="border opacity-90 border-navfoo dark:border-fond text-b-g dark:text-fond shadow-xl shadow-white500/100 p-5 rounded-3xl mt-28 mb-20 w-96">
      <div >
        <h2 className="my-4 text-3xl font-extrabold font-subtitle">
          Nous contacter
        </h2>
      </div>

      <Formik
        initialValues={{
          email: "",
          subject: "",
          message: "",
        }}
        validationSchema={ContactSchema}
        onSubmit={handleCaptcha}
      >
        <Form>
          <div className=" font-text">
            <label htmlFor="email" className="pl-2">
              Adresse Mail :
            </label>
            <Field type="email"
              name="email"
              className="input font-text"
            />
            <p className="h-5">
              <ErrorMessage
                name="email"
                component={"span"}
                className="text-errorMessage px-2"
              />
            </p>
            <label htmlFor="subject" className="pl-2">
              Votre message concerne :
            </label>
            <Field
              type="text"
              name="subject"
              maxLength={200}
              className="input font-text"
            />
            <p className="h-5">
              <ErrorMessage
                name="subject"
                component={"span"}
                className="text-errorMessage"
              />
            </p>
            <label htmlFor="textarea" className="pl-2">
              Votre message :
            </label>
            <Field
              type='textaera'
              className="input font-text h-24"
              name="message"
              as="textarea"
            />
            <p className="h-5">
              <ErrorMessage
                name="message"
                component={"span"}
                className="text-errorMessage"
              />
            </p>
            <div className="flex justify-center mt-10">
              <ReCAPTCHA
                className="recaptcha items-center"
                sitekey={SITE_KEY}
                ref={captchaRef}
              />
            </div>
            <div className="flex justify-center mt-10 ">
              <button
                type="submit"
                className="bg-btn-mou text-b-g hover:bg-b-g hover:text-btn-mou rounded-xl p-3 group relative w-52 font-button font-medium text-xl"
              >
                Contacter
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
};

export default Contact;