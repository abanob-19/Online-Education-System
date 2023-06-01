import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51MLqVrDmpYyJWybimNa5zCuZgsu9jnZuAmXvsV1dppNIEHqXVfGC6JWxCYjsvDWkdh4TuDZ7el8etDsAZQUFBbQG00ThpMve96"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {	

	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm  amount={props.amount} traineeID={props.traineeID} method = {props.method}  />
		</Elements>
		)
}