import React, { Suspense } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DefaultPage from "./pages/DefaultPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";


import Spinner from "./components/Spinner";
const App = () => {
 
  return (
   
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<DefaultPage />} />
            <Route
              path="/"
              element={
                <PublicRoute>
                  <DefaultPage />
                </PublicRoute>
              }
            />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Suspense>
      
   
  );
};

export default App;
