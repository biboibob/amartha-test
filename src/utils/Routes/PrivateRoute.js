import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../config";

// Service
import { getSessionStorage } from "../../helper/storageService";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const loginData = getSessionStorage("User Information");

  useEffect(() => {
    if (loginData === null || new Date(loginData?.expiredOn) < new Date().getTime()) {
      navigate(PageRoutePath.LOGIN);
    }

    const Interval = setInterval(() => {
      if (
        getSessionStorage("User Information") === null ||
        new Date(loginData?.expiredOn) < new Date().getTime()
      ) {
        navigate(PageRoutePath.LOGIN);
      }
    }, 3000);

    return () => {
      clearInterval(Interval);
    };
  }, []);

  return children;
};

export default PrivateRoute;
