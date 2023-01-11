import React from "react";
import "./css/App.scss";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { config } from "./configuration/firebase";
import AuthRoute from "./components/AuthRoute";

initializeApp(config.firebaseConfig);

export interface AppProps {}

const App: React.FC<AppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <HomePage />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
