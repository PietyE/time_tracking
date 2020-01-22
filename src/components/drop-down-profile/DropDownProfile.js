import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import "./dropDown.css";
import { logOut } from "actions/users";
import ProfileAvatar from "components/ui/profile-avatar";

function DropDownProfile({ logOut, userName }) {
  return (
    <div className="drop_down_container" id="profile_drop_down">
      <div className="drop_down_header">
        <ProfileAvatar />
        <span className="drop_down_header_name">{userName}</span>
      </div>

      <div className="drop_down_logout_bnt_container">
        <hr className="header_line" />
        <Button
          onClick={logOut}
          className="drop_down_logout_bnt"
          variant="light"
        >
          Sign out
        </Button>
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

export default connect(mapStateToProps, actions)(DropDownProfile);
