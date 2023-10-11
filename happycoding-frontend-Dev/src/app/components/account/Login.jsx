import { LockClosedIcon } from "@heroicons/react/solid";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  URL_HOME,
  URL_FORGOTPASSWORD
} from "../../constants/urls/urlFrontEnd";
import { signIn } from "../../redux-store/authenticationSlice";
import { authenticate } from "./../../api/backend/account";

/**
 * Component Login
 *
 * @author Peter Mollet
 */
const Login = () => {
  const [errorLog, setErrorLog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    authenticate(values)
      .then((res) => {
        if (res.status === 200 && res.data.token) {
          dispatch(signIn(res.data.token));
          navigate(URL_HOME);
        }
      })
      .catch(() => setErrorLog(true));
  };

  return (
    <>
      <div className="w-full opacity-90 max-w-md space-y-8">
        <div className="">

          <h2 className="mt-6 text-3xl font-extrabold text-b-g dark:text-fond font-subtitle">
            Connexion
          </h2>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleLogin}
        >
          <Form className="mt-8 space-y-6">
            <div className="rounded-md border border-navfoo dark:border-fond py-12 px-4 shadow-xl shadow-white500/100">
              <div className="flex flex-col space-y-3 rounded-md shadow-sm">
                <label htmlFor="nom" className="pl-2 text-b-g dark:text-fond">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  autoComplete="email"
                  className="input font-text"
                />
                <label htmlFor="nom" className="pl-2 text-b-g dark:text-fond">Mot de passe</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  autoComplete="current-password"
                  className="input font-text"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-btn-mou hover:bg-b-g group hover:text-btn-mou p-3 rounded-xl text-xl font-medium text-b-g group relative w-2/3 font-button ml-36"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-fond"
                    aria-hidden="true"
                  />
                </span>
                Se connecter
              </button>
              <div className="mt-1 flex items-center justify-end font-text">
                <div className="text-lg">
                  <Link to={URL_FORGOTPASSWORD}>
                    <span className=" font-medium underline text-b-g dark:text-fond hover:text-navfoo">
                      Mot de passe oublié ?
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {errorLog && (
              <div className="flex justify-center">
                <small className="text-sm italic text-red-600">
                  Email/Mot de passe incorrect(s)
                </small>
              </div>
            )}
          </Form>
        </Formik>
      </div>
      <div className="w-1/3">
        <img src="..\src\app\assets\img\reservation2.png" className="w-full" alt="Echange entre 2 personnes et voiture" />
      </div>
    </>
  );
};

export default Login;
