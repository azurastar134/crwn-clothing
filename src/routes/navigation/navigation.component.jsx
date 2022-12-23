import React from "react";
import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../crown.svg";
import "./navigation.styles.scss";
import ThemeChanger from "../../ThemeChanger";

import CartIcon from "../../components/card-icon/card-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  /* {const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
} */
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  console.log(currentUser);

  return (
    <Fragment>
      <div className={"navigation"}>
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" to="/" />
        </Link>
        <div className="nav-links-container">
          <ThemeChanger />
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
