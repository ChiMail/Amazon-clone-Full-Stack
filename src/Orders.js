import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import Order from "./Order";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function Orders(paymentIntentId) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("paymentIntentId from Parent >>>>> ", paymentIntentId);

      getDocs(
        query(
          collection(db, `users/${user?.uid}/orders`),
          orderBy("created", "desc")
        )
      ).then((snapshot) =>
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            date: doc.data().created,
            amount: doc.data().amount,
            basket: doc.data().basket,
          }))
        )
      );
      console.log(orders);

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
      {orders?.map((order) => (
        <Order order={order} />
      ))}
    </div>
  );
}

export default Orders;
