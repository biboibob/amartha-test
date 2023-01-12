import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../config";

// Service
import {
  getSessionStorage,
  removeSessionStorage,
} from "../../helper/storageService";

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const loginData = getSessionStorage("User Information");

  useEffect(() => {
    if (
      loginData !== null &&
      new Date().getTime() < new Date(loginData.expiredOn)
    ) {
      navigate(PageRoutePath.HOME);
    }

    const Interval = setInterval(() => {
      if (
        getSessionStorage("User Information") !== null &&
        new Date().getTime() < new Date(loginData?.expiredOn)
      ) {
        console.log("here");
        navigate(PageRoutePath.HOME);
      } else {
        removeSessionStorage("User Information");
      }
    }, 3000);

    return () => {
      clearInterval(Interval);
    };
  }, []);

  return children;
};

export default PublicRoute;
