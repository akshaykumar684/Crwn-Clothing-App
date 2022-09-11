import React, { useContext } from "react";
import { UserContext } from "../../context/user.context";
import "./navigation.styles.scss";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assests/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };
  return (
    <React.Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div>
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
};

export default Navigation;
