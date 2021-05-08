import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
function CartScreen(props) {
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const _id = userInfo._id;
  const orderCreate = useSelector((state) => state.orderCreate);
  var { loading, success, error, order } = orderCreate;

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const totalPrice = itemsPrice;
  const vendor = "Project 1";
  const requirement = "anhtai";

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        _id,
        totalPrice,
        requirement,
        vendor,
      })
    );
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>List Tasks</h3>
          </li>
          {cartItems.length === 0 ? (
            <div>No Task Selected</div>
          ) : (
            cartItems.map((item) => (
              <li>
                <div>
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/products/" + item.product}>
                      <h2>• {item.name}</h2>
                    </Link>
                  </div>
                  <div>
                    <div>
                      <button
                        className="button"
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        <div>
          <Link
            to={cartItems.length === 0 ? "/" : "/vendor/" + cartItems[0].vendor}
          >
            <h3>Select something else?</h3>{" "}
          </Link>
        </div>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ( {cartItems.reduce((a, c) => (a += c.qty), 0)} tasks ){" "}
        </h3>
        <button
          onClick={checkoutHandler}
          className="button primary full-width"
          disabled={cartItems.length === 0}
        >
          Proceed to Join in
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
