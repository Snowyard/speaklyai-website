import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

/**
 * Create a Stripe checkout session for subscription
 * @param {string} customerId - Stripe customer ID
 * @param {string} priceId - Stripe price ID for the subscription
 * @param {string} successUrl - URL to redirect to on successful checkout
 * @param {string} cancelUrl - URL to redirect to if checkout is cancelled
 * @returns {Promise<Object>} Checkout session object
 */
export const createCheckoutSession = async (
  customerId,
  priceId,
  successUrl,
  cancelUrl
) => {
  if (!customerId || !priceId) {
    throw new Error('customerId and priceId are required');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      subscription_data: {
        metadata: {
          customer_id: customerId,
        },
      },
    });

    return session;
  } catch (error) {
    console.error('Failed to create Stripe checkout session:', error);
    throw error;
  }
};
