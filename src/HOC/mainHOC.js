import React from "react";
import Swal from "sweetalert2";

import { useNavigate, useParams, useLocation } from "react-router-dom";

const withNavigate = (Component) => (props) => {
  const navigate = useNavigate();

  const params = useParams();
  const location = useLocation();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  return (
    <>
      <Component
        navigate={navigate}
        params={params}
        location={location}
        toast={Toast}
        {...props}
      />
    </>
  );
};

export default withNavigate;
