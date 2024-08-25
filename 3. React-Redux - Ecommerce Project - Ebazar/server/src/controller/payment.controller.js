require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE);

//payments

exports.createPaymentIntentCallback = async (req, res) => {

    try {
        const customer = await stripe.customers.create({
            email: req.body.selectedAddress.email,
            shipping: {
                address: {
                    city: "Surat",
                    country: "US",
                    line1: "RR Mall",
                    line2: "Piplod",
                    postal_code: "683521",
                    state: "Gujarat"
                },
                name: "Anu"
            },
            metadata: {
                userId: req.body.user,
            }
        })

        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.totalPrice * 100,
            currency: 'inr',
            customer: customer.id,
            description: "payment for amazon clone",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send({
            clientSecret: paymentIntent.client_secret
        })

    } catch (error) {
        console.log("checkout session error: ", error)
    }
}

// //webhook
// let endpointSecret;
// // // This is your Stripe CLI webhook secret for testing your endpoint locally.
// //  endpointSecret =process.env.ENDPOINT_SECRET
// exports.webhookCallback = (request, response) => {
//     const sig = request.headers['stripe-signature'];

//     let data, eventType;

//     // console.log("request.body: ", request.body)
//     console.log("sig: ", sig)
//     if (endpointSecret) {
//         let event;
        
//         try {
//             event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//             console.log("webhook verified")
//         } catch (err) {
//             console.log("webhook error: ", err)
//             response.status(400).send(`Webhook Error: ${err.message}`);
//             return;
//         }
        
//         data = event.data.object
//         eventType = event.type
//     } else {
//         data = request.body.data.object
//         eventType = request.body.type
//     }
    
//     // console.log("eventType: ", eventType)
//     if (eventType === 'payment_intent.succeeded') {
//         stripe.customers
//             .retrieve(data.customer)
//             .then(customer => {
//                 // console.log("data: ", data)
//             })
//             .catch(error => {
//                 console.error('Error retrieving customer:', error);
//             })
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     response.send().end();
// }

