import React, { useState } from "react";

/* HOC */
import HOC from "../../HOC/mainHOC";

//Asset
import Logo from "../../assets/PNG/Logo.png";
import { PageRoutePath } from "../../utils/config";

function Header(props) {
  const [search, setSearch] = useState("");

  const navigateTo = (Route) => {
    const { navigate } = props;
    navigate(Route);
  };

  return (
    <div className="flex bg-primary-color items-center justify-between text-white p-3 sticky top-0 z-10">
      <img
        src={Logo}
        alt="logo"
        className="h-auto w-32"
        onClick={() => navigateTo(PageRoutePath.HOME)}
      />
      <div className="flex justify-end items-center grow gap-3">
        <i
          className="fa-solid  text-white fa-magnifying-glass"
          onClick={() => navigateTo(PageRoutePath.SEARCH_ANIME)}
        ></i>
        {/* <div className="flex items-center relative">
          <i className="peer fa-solid absolute right-3 text-primary-color fa-magnifying-glass"></i>
          <input onChange={setSearch} className="text-soft-black-color outline-none transition-all rounded-full w-10 peer-focus:w-52 focus:w-52 py-2 focus:pl-3 pr-10" />
        </div> */}
        <span>logout</span>
      </div>
    </div>
  );
}

export default HOC(Header);
