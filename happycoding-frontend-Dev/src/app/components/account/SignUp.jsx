import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
import { SITE_KEY } from "../../constants/recaptcha/keyAppRecaptcha";
import { register } from "../../api/backend/account";
import * as yup from "yup";
import { subYears } from "date-fns";
import { URL_LOGIN } from "../../constants/urls/urlFrontEnd";
import * as REGEX from "../../constants/regex";

/**
 * Component SignUp
 *
 */
const SignUp = () => {

  const navigate = useNavigate();

  const captchaRef = useRef(null);
  const [captchaValid, setCaptchaValid] = useState(false);

  const [msgError, setMsgError] = useState(false);
  const [captchaValidError, setCaptchaValidError] = useState(false);
  const [jsonError, setJsonError] = useState(false);
  const [validError, setValidError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [otherError, setOtherError] = useState(false);
  const [pseudoError, setPseudoError] = useState(false);
  const [msgCaptchaValidError, setMsgCaptchaValidError] = useState("");
  const [msgJsonError, setMsgJsonError] = useState("");
  const [msgValidError, setMsgValidError] = useState("");
  const [msgEmailError, setMsgEmailError] = useState("");
  const [msgPseudoError, setMsgPseudoError] = useState("");
  const [msgOtherError, setMsgOtherError] = useState("");

  const SignupSchema = yup.object().shape({
    pseudo: yup
      .string()
      .matches(REGEX.REGEX_SPACESTART, "Votre nom d'utilisateur ne doit pas commencer par un espace' !")
      .min(3, 'Le nom d\'utilisateur doit comporter au minimum 3 caractères !')
      .max(25, 'Le nom d\'utilisateur ne doit pas comporter plus de 25 caractères !')
      .matches(REGEX.REGEX_SPACEDOUBLE, "Votre nom d'utilisateur ne doit pas comporter plusieurs espaces à la suite !")
      .matches(REGEX.REGEX_SPACEEND, "Votre nom d'utilisateur ne doit pas finir par un espace !")
      .required('Vous devez saisir un nom d\'utilisateur !'),
    nom: yup
      .string()
      .min(1, 'Votre nom doit comporter au minimum 1 caractère !')
      .max(50, 'Votre nom ne doit pas comporter plus de 50 caractères !')
      .matches(REGEX.REGEX_NAMESTART, "Votre nom ne doit pas commencer par ' ' ou '-' !")
      .matches(REGEX.REGEX_NAME, "Votre nom doit être valide !")
      .matches(REGEX.REGEX_NAMEEND, "Votre nom ne doit pas finir par ' ' ou '-' !")
      .required('Vous devez saisir votre nom !'),
    prenom: yup
      .string()
      .min(1, 'Votre prénom doit comporter au minimum 1 caractère !')
      .max(50, 'Votre prénom ne doit pas comporter plus de 50 caractères !')
      .matches(REGEX.REGEX_NAMESTART, "Votre prénom ne doit pas commencer par ' ' ou '-' !")
      .matches(REGEX.REGEX_NAME, "Votre prénom doit être valide !")
      .matches(REGEX.REGEX_NAMEEND, "Votre prénom ne doit pas finir par ' ' ou '-' !")
      .required('Vous devez saisir votre prénom !'),
    email: yup
      .string()
      .max(180, 'Votre email ne doit pas comporter plus de 180 caractères !')
      .email("Vous devez saisir un email valide !")
      .min(6, 'Votre email doit comporter au minimum 6 caractères !')
      .max(180, 'Votre email ne peut pas comporter plus de 180 caractères !')
      .required('Vous devez saisir un email !'),
    datedenaissance: yup
      .date()
      .min(subYears(new Date(Date.now()), 120), 'Vous devez entrer une date de naissance valide !')
      .max(subYears(new Date(Date.now()), 18), 'Vous devez avoir au moins 18 ans !')
      .required('Vous devez saisir votre date de naissance'),
    password: yup
      .string()
      .min(8, 'Le mot de passe doit comporter au minimum 8 caractères !')
      .max(20, 'Le mot de passe ne doit pas comporter plus de 20 caractères !')
      .matches(REGEX.REGEX_PASSWORD, "Vous devez respecter le format du mot de passe !")
      .required('Vous devez saisir un mot de passe !'),
    validpassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'La confirmation doit être identique au mot de passe !')
      .required('Vous devez confirmez le mot de passe !'),
    rgpd: yup
      .boolean()
      .oneOf([true], 'Veuillez cocher la case')
      .required('Veuillez cocher la case')
  })

  const handleCaptcha = async (values) => {

    let token = captchaRef.current.getValue();

    if (token) {
      setCaptchaValid(true);
    }
    else {
      setCaptchaValid(false);
    }
  }

  function createInscriptionJSON(values) {

    return ({
      "email": values.email,
      "password": values.password,
      "lastName": values.nom,
      "firstName": values.prenom,
      "pseudo": values.pseudo,
      "birthDate": values.datedenaissance,
    })
  }

  const handleSignUp = (values) => {

    setMsgError(false);
    setCaptchaValidError(false);
    setJsonError(false);
    setValidError(false);
    setEmailError(false);
    setOtherError(false);
    setPseudoError(false);
    
    if (captchaValid) {
      register(createInscriptionJSON(values))
        .then((response) => {
          if (response.status === 201) {
            alert("Votre inscription est bien effectuée ! \n Vous allez être redirigé vers la page de connexion ! \n Vous pourrez vous connecter après avoir utilisé  le lien dans l'e-mail de de validation envoyé à votre adresse, pour la valider !");
            navigate(URL_LOGIN);
          }
          else {
            setMsgOtherError(true);
            setOtherError("une erreur s'est produite. Veullez recommencer ! ");
            Alert("Erreur autre");
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              if (error.response.data.jsonErr) {
                setMsgError(true);
                setJsonError(true);
                setMsgJsonError("Le format des données envoyées n'est pas correct !")
              }
              if (error.response.data.validErr) {
                setMsgError(true);
                setValidError(true);
                setMsgValidError("Un ou plusieurs champs ne sont pas valides. Veuillez recommencer !");
              }
              if (error.response.data.emailErr) {
                setValidError(false);
                setMsgError(true);
                setEmailError(true);
                setMsgEmailError("Votre e-mail est déjà enregistré !");
              }
              if (error.response.data.pseudoErr) {
                setValidError(false);
                setMsgError(true);
                setPseudoError(true);
                setMsgPseudoError("Le nom d'utilisateur est déjà utilisé ! Veuillez en choisir un autre !");
              }
            }
            else {
              alert("Une erreur s'est produite ! Veuillez recommencer !");
            }
          } 
          else if (error.request) {
            alert("Une erreur s'est produite ! Veuillez recommencer !");
          }
          else {
            alert("Une erreur s'est produite ! Veuillez recommencer !");
          }
        }
      )
    }
    else {
      setMsgError(true);
      setCaptchaValidError(true);
      setMsgCaptchaValidError("Vous devez valider que vous n'êtes pas un robot !");
      setShowModal(true);
    }
  };  
  
  const [isShow1, setIsShow1] = useState(false);
  const [isShow2, setIsShow2] = useState(false);
  const [isShow3, setIsShow3] = useState(false);
  const [isShow4, setIsShow4] = useState(false);

  return (
    <div className="pt-24 text-b-g m-auto">
      <div className="text-center">
        <h2 className="mt-4 text-3xl font-extrabold text-fond">
          Inscription
        </h2>
      </div>

      <div className="w-3/4 m-auto opacity-90 border border-navfoo bg-fond shadow-xl shadow-white500/100 pl-8 pt-4 rounded-3xl mt-5 mb-10 font-text">
        <Formik
          initialValues={{
            pseudo: "",
            nom: "",
            prenom: "",
            email: "",
            datedenaissance: "",
            password: "",
            validpassword: "",
            rgpd: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignUp}
        >
          <Form>
            <div className="flex flex-col my-3 justify-center">

              {/* ------------ Champs Pseudo --------------- */}
              <label htmlFor="pseudo" className="pl-2 text-b-g">Nom d'utilisateur</label>
              <div className="flex items-center">
                <Field
                  type="text"
                  name="pseudo"
                  minLength={3}
                  maxLength={25}
                  className="input font-text w-11/12"
                />
                <div className="ml-2">
                  <div
                    onMouseEnter={() => setIsShow1(true)}
                    onMouseLeave={() => setIsShow1(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  {isShow1 && (
                    <div className="p-2 text-b-g border bg-fond rounded-xl border-navfoo absolute">doit être compris entre 3 et 25 caractères</div>
                  )}
                </div>
              </div>
              <p className="h-5 pl-2 mb-3 w-full">
                <ErrorMessage name="pseudo" component={"span"} className="text-errorMessage w-full" />
              </p>

              {/* ------------ Champs Nom --------------- */}
              <label htmlFor="nom" className="pl-2 text-b-g">Nom</label>
              <div className="flex items-center">
                <Field
                  type="text"
                  name="nom"
                  maxLength={50}
                  className="input font-text w-11/12"
                />
                <div className="ml-2">
                  <div
                    onMouseEnter={() => setIsShow2(true)}
                    onMouseLeave={() => setIsShow2(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>

                  </div>
                  {isShow2 && (
                    <div className="p-2 text-b-g border bg-fond rounded-xl border-navfoo absolute">doit être compris entre 1 et 50 caractères</div>
                  )}
                </div>
              </div>
              <p className="h-5 pl-2 mb-3">
                <ErrorMessage name="nom" component={"span"} className="text-errorMessage" />
              </p>

              {/* ------------ Champs Prenom --------------- */}
              <label htmlFor="prenom" className="pl-2 text-b-g">Prénom</label>
              <div className="flex items-center">
                <Field
                  type="text"
                  name="prenom"
                  maxLength={50}
                  className="input font-text w-11/12"
                />
                <div className="ml-2">
                  <div
                    onMouseEnter={() => setIsShow3(true)}
                    onMouseLeave={() => setIsShow3(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  {isShow3 && (
                    <div className="p-2 text-b-g border bg-fond rounded-xl border-navfoo absolute">doit être compris entre 1 et 50 caractères</div>
                  )}
                </div>
              </div>
              <p className="h-5 pl-2 mb-3">
                <ErrorMessage name="prenom" component={"span"} className="text-errorMessage" />
              </p>

              {/* ------------ Champs Adresse Mail --------------- */}
              <label htmlFor="email" className="pl-2 text-b-g">Adresse Mail</label>
              <Field
                type="email"
                name="email"
                className="input font-text w-11/12"
              />
              <p className="h-5 pl-2 mb-3">
                <ErrorMessage name="email" component={"span"} className="text-errorMessage" />
              </p>

              {/* ------------ Champs Date de naissance --------------- */}
              <label htmlFor="datedenaissance" className="pl-2 text-b-g">Date de naissance</label>
              <Field
                type="date"
                name="datedenaissance"
                className="input font-text w-11/12"
              />
              <p className="h-5 pl-2 mb-3">
                <ErrorMessage name="datedenaissance" component={"span"} className="text-errorMessage" />
              </p>

              {/* ------------ Champs Password --------------- */}
              <label htmlFor="password" className="pl-2 text-b-g">Mot de passe</label>
              <div className="flex items-center">
                <Field
                  type="password"
                  name="password"
                  minLength={8}
                  maxLength={20}
                  className="input font-text w-11/12"
                />
                <div className="ml-2">
                  <div
                    onMouseEnter={() => setIsShow4(true)}
                    onMouseLeave={() => setIsShow4(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>

                  </div>
                  {isShow4 && (
                    <div className="p-2 text-b-g border bg-fond rounded-xl border-navfoo absolute right-24 mt-1">Le mot de passe doit comporter entre 8 et 20 caractères, ainsi qu'une majuscule, une minuscule, un chiffre et un caractère spécial</div>
                  )}
                </div>
              </div>
              <p className="h-5 pl-2 mb-3">
                <ErrorMessage name="password" component={"span"} className="text-errorMessage" />
              </p>

              {/* ------------ Champs Confirmation password --------------- */}
              <label htmlFor="validpassword" className="pl-2 text-b-g">Confirmation du mot de passe</label>
              <Field
                type="password"
                name="validpassword"
                minLength={8}
                maxLength={20}
                className="input font-text w-11/12"
              />
              <p className="h-5 pl-2 mb-3">
                <ErrorMessage name="validpassword" component={"span"} className="text-errorMessage" />
              </p>
            </div>

            {/* ------------ Champs RGPD --------------- */}
            <div className="flex">
              <Field
                type="checkbox"
                name="rgpd"
                className="input w-2"
              />
              <p className="font-text text-b-g ml-2 m">En cochant cette case, j'ai lu et j'accepte les conditions générales
                d'utilisation et la charte de confidentialité.</p>
            </div>
            <p className="h-5 pl-2 mr-2">
              <ErrorMessage name="rgpd" component={"span"} className="text-errorMessage" />
            </p>

            {/* ------------ Captcha --------------- */}
            <div className="flex justify-center mt-10">
              <ReCAPTCHA
                className="recaptcha"
                sitekey={SITE_KEY}
                ref={captchaRef}
                onChange={handleCaptcha}
              />
            </div>

            {/* ------------ Bouton --------------- */}
            <div className="w-3/4 text-right mt-10 ">
              <button type="submit" className="text-xl font-medium bg-btn-mou hover:bg-b-g hover:text-btn-mou p-3 rounded-xl group relative w-60 font-button text-b-g mb-10">
                S'inscrire
              </button>
            </div>

            {/* ------------ Messages erreurs --------------- */}
            {msgError && (
              <div className="flex flex-col my-3 justify-center mb-10">
                {captchaValidError && (
                  <p className="text-errorMessage m-auto">
                    {msgCaptchaValidError}
                  </p>
                )}
                {jsonError && (
                  <p className="text-errorMessage m-auto">
                    {msgJsonError}
                  </p>
                )}
                {validError && (
                  <p className="text-errorMessage m-auto">
                    {msgValidError}
                  </p>
                )}
                {emailError && (
                  <p className="text-errorMessage m-auto">
                    {msgEmailError}
                  </p>
                )}
                {pseudoError && (
                  <p className="text-errorMessage m-auto">
                    {msgPseudoError}
                  </p>
                )}
                {otherError && (
                  <p className="text-errorMessage m-auto">
                    {msgOtherError}
                  </p>
                )}
              </div>
            )}

          </Form>
        </Formik>
      </div>

    </div >

  );

};

export default SignUp;
