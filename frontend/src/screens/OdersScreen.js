import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listOrders } from "../actions/orderActions";

function OrdersScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const vendor = userInfo.vendor;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders(vendor));
  }, [dispatch]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="content content-margined">
      <div className="order-header">
        <h3>Tasks</h3>
      </div>
      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>USER ID</th>
              <th>STATUS</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id_order}>
                <td>{order._id_order}</td>
                <td>{order.date}</td>
                <td>{order._id_user}</td>
                <td>{order.isReceived ? "Done" : "Not done"}</td>
                <td>
                  {order.isReceived ? (
                    ""
                  ) : (
                    <button className="button">Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default OrdersScreen;
