import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import Order from "./Order";
import { collection, doc, getDoc } from "firebase/firestore";
import moment from "moment";
import CurrencyFormat from "react-currency-format";

function Orders(paymentIntentId) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState("");

  useEffect(() => {
    if (user) {
      console.log("paymentIntentId from Parent >>>>> ", paymentIntentId);

      getDoc(
        doc(
          collection(db, `users/${user?.uid}/orders`),
          paymentIntentId.paymentIntentId
        )
      ).then((snap) => {
        console.log(snap.data());
        setDate(snap.data().field.created);
        setAmount(snap.data().field.amount);
        setId(snap.data().field.id);

        setOrders(snap.data().field);
      });

      // From youtube
      // db.collection("users")
      //   .doc(user?.uid)
      //   .collection("orders")
      //   .orderBy("created", "desc")
      //   .onSnapshot((snapshot) =>
      //     setOrders(
      //       snapshot.docs.map((doc) => ({
      //         id: doc.id,
      //         data: doc.data(),
      //       }))
      //     )
      //   );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      {/* Moved from Order.js*/}
      <h2>Order</h2>
      <p>{moment.unix(date).format("MMMM Do YYYY, h:mma")}</p>
      <p className="orders_id">
        <small>Order Id: {id}</small>
      </p>

      {/* Removed .map() since it is done in Order.js */}
      <div className="orders_order">
        {/* {orders?.map((order) => (
          <Order order={order} />
        ))} */}
        <Order order={orders} />
      </div>

      {/* Moved from Order.js*/}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="orders_total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Orders;
