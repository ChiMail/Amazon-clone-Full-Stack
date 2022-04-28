import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import Order from "./Order";
import { child, get, onValue, ref } from "firebase/database";
import {
  query,
  orderBy,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      getDoc(
        doc(
          collection(db, `users/${user?.uid}/orders`),
          "pi_3KtbIyFIv6FD0qXn0PU4Gkzv"
        )
      ).then((snap) => {
        console.log(snap.data());

        setOrders(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      // From youtube
      // const orderRef = collection(db, `users/${user?.uid}/orders`);
      // query(orderRef, orderBy("created", "desc"));
      // console.log("REFERENCE >>> ", orderRef);

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

      <div className="orders_order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
