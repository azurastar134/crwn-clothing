import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  function totalAmount() {
    const priceDollars = price;
    const quantityOfItems = quantity;
    if (quantityOfItems >= 2) {
      return `${quantityOfItems} items $${priceDollars * quantityOfItems}`;
    }

    return `${quantityOfItems} item $${priceDollars * quantityOfItems}`;
  }

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span
          style={{ fontWeight: "bold", fontStyle: "italic" }}
          className="name"
        >
          {name}
        </span>
        <span className="price">{totalAmount()}</span>
      </div>
    </div>
  );
};

export default CartItem;
