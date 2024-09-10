import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import "../styles/Stripe.css";
import { useDispatch, useSelector } from "react-redux";
import { makePaymentAsync, selectClientSecret, selectCurrentOrder } from "../../../redux/slices/ordersSlice";

const stripePromise = loadStripe("pk_test_51OzsYKSEvg4ni96G0o8oXWwkoOKQ4IgvrNnPF86rxihl5866nDtsS6LzY8i6HEpgvukiPOgofvzO3qUj1yW1E1Wy00BsBbS4Jo");


export default function StripePayment() {
  const clientSecret = useSelector(selectClientSecret)
  const currentOrder = useSelector(selectCurrentOrder)
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentOrder) {
      dispatch(makePaymentAsync(currentOrder))
    }
  }, [currentOrder, dispatch]);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret &&
        (
          <Elements options={options} stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        )
      }
    </div>
  );
}