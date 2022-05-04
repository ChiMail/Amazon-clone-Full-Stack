import React from "react";
import "./Order.css";
import CheckoutProduct from "./CheckoutProduct";

function Order({ order }) {
  return (
    <div className="order">
      {/*  Moved to Orders.js
      <h2>Order</h2>

      <p>{moment.unix(order.date).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order_id">
        <small>{order.id}</small>
      </p> */}

      {order.basket?.map((item) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}

      {/* Moved to Orders.js
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order_total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      /> */}
    </div>
  );
}

export default Order;
