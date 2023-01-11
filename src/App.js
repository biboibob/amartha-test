import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageRoutePath } from "./utils/config";
import {
  Home,
  DetailAnime,
  Error
} from "./pages/index";
// import PublicRoute from "./utils/Routes/PublicRoute";
// import PrivateRoute from "./utils/Routes/PrivateRoute";

import Layout from "./components/template/Layout";

// import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* if get auth */}
        {/* <PrivateRoute
          path={PageRoutePath.HOME}
          element={<ApplicationPages.Home />}
        /> */}

        <Route
          path={PageRoutePath.Home}
          element={
            // <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            // </PrivateRoute>
          }
        />

        <Route
          path={PageRoutePath.DETAIL_ANIME}
          element={
            // <PrivateRoute>
              <Layout>
                <DetailAnime />
              </Layout>
            // </PrivateRoute>
          }
        />

        <Route path="*" element={<Error />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
