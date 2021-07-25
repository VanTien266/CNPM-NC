import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { logout } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";

function ProfileScreen(props) {
  window.onload = function () {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload(true);
    }
  };
  window.onload();

  setTimeout(function () {
    window.location.reload(1);
  }, 10000);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const _id_user = userInfo._id;

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  };

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name);
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders(_id_user));
    return () => {};
  }, [userInfo]);

  const takenHandler = (_id_order) => {
    axios.put("/api/customer", { _id_order });
    window.location.reload();
  };

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form>
            <ul className="form-container">
              <li>
                <h2>User Profile</h2>
              </li>
              <li>
                <label htmlFor="name">Name</label>
                {name}
              </li>
              <li>
                <label htmlFor="email">Email</label>
                {email}
              </li>

              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="button secondary full-width"
                >
                  Logout
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="profile-orders content-margined">
        {loadingOrders ? (
          <div>Loading...</div>
        ) : errorOrders ? (
          <div>{errorOrders} </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task Name</th>
                <th>DATE</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id_order}</td>
                  <td>{order.orderItems}</td>
                  <td>{order.date}</td>
                  <td>{order.isReceived ? "Done" : "Not Done"}</td>
                  <td>
                    {order.isReceived ? (
                      ""
                    ) : (
                      <button
                        className="button"
                        onClick={() => takenHandler(order._id_order)}
                      >
                        I done it!
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProfileScreen;
