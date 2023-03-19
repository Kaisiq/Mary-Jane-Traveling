import './styles.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import LoginForm from './login'
import Logged from "./Components/Logged"
import ChooseActivities from './Components/ChooseActivities'
import AdditionalInfo from './Components/AdditionalInfo'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ProfilePage from "./Components/Profile";
import Organise from "./Components/Organise";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />
  },
  {
    path: "/Logged",
    element: <Logged />
  },
  {
    path: "/ChooseActivities",
    element: <ChooseActivities />
  },
  {
    path: "/Profile",
    element: <ProfilePage />
  },
  {
    path: "/Info",
    element: <AdditionalInfo />
  },
  {
    path: "/Organise",
    element: <Organise />
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

reportWebVitals();
