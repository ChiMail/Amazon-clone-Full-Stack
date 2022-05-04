import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51KnoZYFIv6FD0qXnPHNQ9DK8T0UaYJuYBcK52RuKRmj1Z6nFpNl4HRkm0JpXzFTor7hZbI22t39X3zy9yJ4NySFN000Kr9ajGk"
);

function App() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [paymentIntentId, setPaymentIntentId] = useState("none");
  const setId = (id) => {
    setPaymentIntentId(id);
  };

  useEffect(() => {
    // Will only run once when the app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log("The User Is >>>", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [paymentIntentId]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/login/" element={<Login />} />
          <Route exact path="/" element={[<Header />, <Home />]} />
          <Route
            exact
            path="/orders"
            element={[<Header />, <Orders paymentIntentId={paymentIntentId} />]}
          />
          <Route exact path="/checkout" element={[<Header />, <Checkout />]} />
          <Route
            exact
            path="/payment"
            element={[
              <Header />,
              <Elements stripe={promise}>
                <Payment setID={setId} />
              </Elements>,
            ]}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
