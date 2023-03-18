import './index.css'
import './login.css'

import React, { useState, Component } from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import LoginForm from './login'
import Logged from "./Components/Logged"
import ChooseActivites from './Components/ChooseActivities'
import AdditionalInfo from './Components/AdditionalInfo'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ProfilePage from "./Components/Profile";

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
    element: <ChooseActivites />
  },
  {
    path: "/Profile",
    element: <ProfilePage />
  },
  {
    path: "/Info",
    element: <AdditionalInfo />
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

reportWebVitals();
