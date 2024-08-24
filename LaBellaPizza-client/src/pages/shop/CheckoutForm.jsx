import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { FaPaypal } from 'react-icons/fa';

const CheckoutForm = ({ price, cart }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [cardError, setCardError] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)

        } else {
            setCardError("success!")
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <div className='flex flex-col sm:flex-row justify-start items-start gap-8'>
            <div className='md:w-1/2 w-full space-y-3'>
                <h4 className='text-lg font-semibold'>Order Summary</h4>
                <p>Total Price: ${price}</p>
                <p>Number of Items: ${cart.length}</p>
            </div>

            <div className='md:w-1/3 space-y-6 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl px-4 py-8'>
                <h4 className='text-lg font-semibold'>Process your Payment</h4>
                <h5 className='font-medium'>Credit/Debit Card</h5>
                {/* stripe form */}
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button type="submit" disabled={!stripe} className='btn btn-sm mt-5 btn-primary w-full text-white'>
                        Pay
                    </button>
                </form>
                {
                    cardError ? <p className='text-red italic text-xs'>{cardError}</p> : ""
                }

                {/* paypal option */}
                <div className='mt-5 text-center'>
                <hr style={{ borderColor: '#D3D3D3' }} />
                <button type="submit" className='btn btn-sm mt-5 bg-orange-500 text-white'>
                        <FaPaypal /> Pay with Paypal
                    </button>

                </div>

            </div>
        </div>
    )
}

export default CheckoutForm