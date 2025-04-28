import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./components/chatRoom/App.tsx";

import GlobalStyle from "./GlobalStyles.ts";
import Login from "./components/login/Login.tsx";

import PrivateRoute from "./components/privateRoute/PrivateRoute.tsx";
import RefreshToken from "./components/refreshToken/RefreshToken.tsx";
import Register from "./components/register/Register.tsx";
import SeeProfile from "./components/profile/SeeProfile.tsx";
import PersonalProfile from "./components/personalProfile/PersonalProfile.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />

    <Router>
      <RefreshToken />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <SeeProfile />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PersonalProfile />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </Router>
  </StrictMode>
);
