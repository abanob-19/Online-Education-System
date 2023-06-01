import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			// iconColor: "#c4f0ff",
			iconColor: "#000",
			color: "#000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#777" },
			"::placeholder": { color: "#777" }
		},
		invalid: {
			iconColor: "#ff0533",
			color: "#ff0533"
		}
	}
}

export default function PaymentForm(props) {
    const [success, setSuccess ] = useState(false)
    const [load, setLoad ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoad(true)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {

            const config = {
                headers: {
                  Authorization: `Bearer ${props.traineeID}`,
                },
              }

            const {id} = paymentMethod
            const response = await axios.post("/payment",{
                amount: props.amount,
                id
            },config)

            if(response.data.success) {
                alert("Successful payment")
                setSuccess(true)
                props.method();
            }
            else{
                alert(response.data.message)
                console.log(response.data.message)
            }

        } catch (error) {
            alert("Error", error)
        }
    } else {
        alert(error.message)
    }
    setLoad(false)
}

    return (
        <>
        
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
             {load ? <p>Your Payment is being processed</p> :
                <button>Pay <b>{props.amount/100}</b></button>}
        </form>
        :
       <div>
       </div> 
        }
            
        </>
    )
}