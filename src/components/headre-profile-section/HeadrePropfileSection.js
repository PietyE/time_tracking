import React, { useState, useEffect } from "react";

import "./headerProfileSection.css";
import searchIcon from "images/search-icon.svg";
import shapeIcon from "images/shape-icon.svg";
import DropDownProfile from "components/drop-down-profile";
import ProfileAvatar from "components/ui/profile-avatar";

function HeadrePropfileSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setstateOpenSearch] = useState(false);

  let interval = null;

  const handlerDropDown = () => {
    setIsOpen(!isOpen);
  };

  const callbackEventListener = () => {
    document.getElementById("profile_drop_down").classList.add("anim_back");
    interval = setInterval(() => {
      setIsOpen(false);
      clearInterval(interval);
    }, 400);

    document.removeEventListener("click", callbackEventListener);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", callbackEventListener);
    }
    return () => {
      document.removeEventListener("click", callbackEventListener);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, [callbackEventListener]);

  return (
    <ul className="header_profile_container">
      <li className="list_item_container">
        <button className="header_profile_btn">
          <img src={searchIcon} alt="search" />
        </button>
        {/* {isOpenSearch && (
          <label className="search_input_container">
            <input type="text" className="search_input" />
            <img src={searchIcon} alt="search" className="search_input_icon" />
          </label>
        )} */}
      </li>
      <li className="list_item_container">
        <button className="header_profile_btn">
          <img src={shapeIcon} alt="shape" />
        </button>
      </li>
      <li className="list_item_container">
        <button
          className="header_profile_btn profile_button"
          onClick={handlerDropDown}
        >
          <ProfileAvatar />
        </button>
        {isOpen && <DropDownProfile />}
      </li>
    </ul>
  );
}

export default HeadrePropfileSection;
