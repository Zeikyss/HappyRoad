import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";
import { ROLE_ADMIN } from "../constants/rolesConstant";
import * as URL from "../constants/urls/urlFrontEnd";
import AdminHomeView from "../views/AdminHomeView";
import HomeView from "../views/HomeView";
import SignUpView from "../views/SignUpView";
import LoginView from "../views/LoginView";
import { PrivateRoute } from "./PrivateRoute";
import SearchTripView from "../views/SearchTripView";
import SuggestTripView from "../views/SuggestTripView";
import ContactView from "../views/ContactView";
import AskTripView from "../views/AskTripView";
import AcceptTripView from '../views/AcceptTripView';
import ProfileView from './../views/ProfileView';
import AccountmanagementView from "../views/AccountmanagementView";
import ChatView from './../views/ChatView';
import CommentView from "../views/CommentView";
import FavoriteView from './../views/FavoriteView';
import ForgotPasswordView from "../views/ForgotPasswordView";
import ModifPasswordView from "../views/ModifPasswordView";
import { URL_COMMENT } from './../constants/urls/urlFrontEnd';
import RoadHistoryView from "../views/RoadHistoryView";
import CurrentTripView from "../views/CurrentTripView";
import RateTripView from "../views/RateTripView";
import ChatHistoryView from './../views/ChatHistoryView';
import ChatPageView from './../views/ChatPageView';
import socketIO from 'socket.io-client';


const socket = socketIO.connect('http://localhost:4050')
/**
 * Routes of the application
 * with public and private route
 *
 * @author Peter Mollet
 */
const Routes = () => {
  return (
    <RoutesContainer>
      <Route
        path={URL.URL_HOME}
        element={

          <HomeView />

        }
      />
      <Route
        path={URL.URL_REGISTER}
        element={

          <SignUpView />

        }
      />
      <Route
        path={URL.URL_CONTACT}
        element={
          <ContactView />}
      />
      <Route
        path={URL.URL_ACCOUTMANAGEMENT}
        element={
          <PrivateRoute>
            <AccountmanagementView />
          </PrivateRoute>
        }
      />
      <Route
        path={URL.URL_SEARCHTRIP}
        element={

          <SearchTripView />

        }
      />
      <Route
        path={URL.URL_SUGGESTTRIP}
        element={
          <PrivateRoute>
            <SuggestTripView />
          </PrivateRoute>
        }
      />
      <Route
        path={URL.URL_ASKTRIP}
        element={
          <PrivateRoute>
            <AskTripView />
          </PrivateRoute>
        }
      />
      <Route
        path={URL.URL_ACCEPTTRIP}
        element={
          <PrivateRoute>
            <AcceptTripView />
          </PrivateRoute>
        }
      />
      <Route
        path={URL.URL_PROFILE}
        element={
          <PrivateRoute>
            <ProfileView />
          </PrivateRoute>
        }
      />
      <Route
        path={URL.URL_CHAT}
        element={
          <PrivateRoute>
            <ChatView socket={socket}/>
          </PrivateRoute>
        }
      />
        <Route
        path={URL.URL_CHATPAGE}
        element={
          // <PrivateRoute>
            <ChatPageView socket={socket}  />
          // </PrivateRoute> 
        }
      />
        <Route
        path={URL.URL_CHATHISTORY}
        element={
          <PrivateRoute>
            <ChatHistoryView />
          </PrivateRoute>
        }
      />
      <Route
        path={URL.URL_COMMENT}
        element={
          <PrivateRoute>
            <CommentView />
          </PrivateRoute>
        }
      />
      <Route
        path={URL.URL_ROADHISTORY}
        element={
          <PrivateRoute>
            <RoadHistoryView />
          </PrivateRoute>
        }
      />

      <Route
        path={URL.URL_CURRENTTRIP}
        element={
          <PrivateRoute>
            <CurrentTripView />
          </PrivateRoute>
        }
      />

      <Route
        path={URL.URL_RATETRIP}
        element={
          <PrivateRoute>
            <RateTripView />
          </PrivateRoute>
        }
      />
      <Route
        path={URL.URL_FAVORITES}
        element={
          <PrivateRoute>
            <FavoriteView />
          </PrivateRoute>
        }
      />
      <Route
        path={URL.URL_ADMIN_HOME}
        element={
          <PrivateRoute roles={[ROLE_ADMIN]}>
            <AdminHomeView />
          </PrivateRoute>
        }
      />
      <Route
        path={URL.URL_LOGIN}
        element={
          <LoginView />
        }
      />
      <Route
        path={URL.URL_FORGOTPASSWORD}
        element={
          <ForgotPasswordView />
        }
      />
      <Route
        path={URL.URL_MODIFPASSWORD}
        element={
          <ModifPasswordView />
        }
      />
      <Route
        path={URL.URL_LOGOUT}
        element={
          <PrivateRoute>
            <p>Page logout</p>
          </PrivateRoute>
        }
      />
    </RoutesContainer>
  );
};

export default Routes;
