import { useContext, useEffect, useState } from "react";

import { CartContext } from "../../context/cart.context";

import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.component";
import { Minimize } from "@mui/icons-material";

const CartDropDown = () => {
  const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);

  const [scrolled, setScrolled] = useState(false);
  const toggleMinimizeIcon = () => setIsCartOpen(!isCartOpen);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
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

  return (
    <div className={scrolled ? "scrollLogo" : "cart-dropdown-container"}>
      {scrolled && (
        <Minimize
          style={{ cursor: "pointer", display: "block", marginBottom: "15" }}
          onClick={toggleMinimizeIcon}
        />
      )}
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropDown;
