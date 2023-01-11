import React from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";

const withNavigate = (Component) => (props) => {
  const navigate = useNavigate();

  const params = useParams();
  const location = useLocation();

  return (
    <>
      <Component
        navigate={navigate}
        params={params}
        location={location}
        {...props}
      />
    </>
  );
};

export default withNavigate;
