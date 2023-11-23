import { Suspense, lazy } from "react";
import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";
import SpinnerFullPage from "./Components/SpinnerFullPage"



import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import HomePage from "./Pages/Homepage";
// import PageNotFound from "./Pages/PageNotFound";
// import AppLayout from "./Pages/AppLayout";
// import Login from "./Pages/Login";

// Including lazy loading for related component to implement code splitting 
// to avoid downloading the entire app to the client at a single request
const HomePage = lazy(() => import("./Pages/Homepage"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Login = lazy(() => import("./Pages/Login"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));




function App() {

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
        {/* include the build in supense to indicate a spinner when each components loads */}
        <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />

              <Route 
                path="app" 
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              > 

                <Route index element={<Navigate replace  to="cities"/>} />
                <Route path="cities" element={<CityList  />} />
                {/* creating a rountes using params */}
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            </Suspense>
        </BrowserRouter>
   </CitiesProvider>
    </AuthProvider>
    
  )
}

export default App
