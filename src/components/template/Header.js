import React, { useState } from "react";

/* HOC */
import HOC from "../../HOC/mainHOC";

//Asset
import Logo from "../../assets/PNG/Logo.png";
import { PageRoutePath } from "../../utils/config";

// Service
import { getSessionStorage, removeSessionStorage } from "../../helper/storageService";

// Component
import { Button } from "../../components/custom/Index";

function Header(props) {
  const loginData = getSessionStorage("User Information");
  const [panel, setPanel] = useState(false);

  const navigateTo = (Route) => {
    const { navigate } = props;
    navigate(Route);
  };

  const onLogout = () => {
    removeSessionStorage("User Information");
    navigateTo(PageRoutePath.LOGIN)
  };

  return (
    <div className="flex bg-primary-color items-center justify-between text-white p-3 sticky top-0 z-10">
      <img
        src={Logo}
        alt="logo"
        className="h-auto w-32"
        onClick={() => navigateTo(PageRoutePath.HOME)}
      />
      <div className="flex justify-end items-center grow gap-4">
        <i
          className="fa-solid  text-white fa-magnifying-glass"
          onClick={() => navigateTo(PageRoutePath.SEARCH_ANIME)}
        ></i>
        {/* <div className="flex items-center relative">
          <i className="peer fa-solid absolute right-3 text-primary-color fa-magnifying-glass"></i>
          <input onChange={setSearch} className="text-soft-black-color outline-none transition-all rounded-full w-10 peer-focus:w-52 focus:w-52 py-2 focus:pl-3 pr-10" />
        </div> */}
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setPanel(panel ? false : true)}
        >
          <i className="fa-solid fa-circle-user fa-lg "></i>
          <span className="break-all">{loginData && loginData.username}</span>
        </div>
      </div>

      {/* Custom Panel for logout and information */}
      <div
        className={`customPanel flex flex-col gap-3 drop-shadow-lg fixed top-20 ${
          panel ? "right-5" : "-right-80"
        } transition-all bg-white p-3 text-soft-black-color w-[18rem] rounded-lg`}
      >
        <div className="flex gap-3">
          <div>
            <i className="fa-solid fa-circle-user fa-lg basis-1/3 mt-3"></i>
          </div>
          <div className="flex grow flex-col basis-2/3">
            <span className="text-base md:text-lg break-all">{loginData && loginData.username}</span>
            <span className="text-sm md:text-base text-gray-color">
              {loginData && loginData.email}
            </span>
          </div>
        </div>
        <hr></hr>
        <Button
          className={"w-full !bg-youtube-color text-white text-sm md:text-base"}
          value="Logout"
          onClick={onLogout}
        />
      </div>
    </div>
  );
}

export default HOC(Header);
