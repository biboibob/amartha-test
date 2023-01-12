import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageRoutePath } from "./utils/config";
import {
  Home,
  DetailAnime,
  SearchAnime,
  Login,
  Error,
  Register,
} from "./pages/index";
import PublicRoute from "./utils/Routes/PublicRoute";
import PrivateRoute from "./utils/Routes/PrivateRoute";

import Layout from "./components/template/Layout";

// import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
 
        <Route
          path={PageRoutePath.REGISTER}
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path={PageRoutePath.LOGIN}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path={PageRoutePath.HOME}
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path={PageRoutePath.DETAIL_ANIME}
          element={
            <PrivateRoute>
              <Layout>
                <DetailAnime />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path={PageRoutePath.SEARCH_ANIME}
          element={
            <PrivateRoute>
              <Layout>
                <SearchAnime />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
