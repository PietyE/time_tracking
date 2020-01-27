import React, {useState, useEffect} from "react";

import "./headerProfileSection.css";
import ProfileAvatar from "components/ui/profile-avatar";
import {Button} from "react-bootstrap";
import {logOut} from "../../actions/users";
import {connect} from "react-redux";

function HeaderProfileSection({userName, logOut}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handlerDropDown = () => {
    setIsOpen(!isOpen);
  };
  
  const callbackEventListener = () => {
    setIsOpen(false);
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
  
  const btnClass = isOpen ? 'bnt_open' : ''
  return (
    <div className="header_profile_container">
      <div className={`list_item_container`}>
        <button
          className={`header_profile_btn ${btnClass}`}
          onClick={handlerDropDown}
        >
          <ProfileAvatar/>
        </button>
        {isOpen && (<div className="drop_down_container" id="profile_drop_down">
          <div className="drop_down_header">
            <span className="drop_down_header_name">{userName}</span>
          </div>
          <div className="drop_down_logout_bnt_container">
            <hr className="header_line"/>
            <Button
              onClick={logOut}
              className="drop_down_logout_bnt"
              variant="light"
            >
              Sign out
            </Button>
          </div>
        </div>)}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  userName: state.users.googleOAuthData.name
});

const actions = {
  logOut
};

export default connect(mapStateToProps, actions)(HeaderProfileSection);
