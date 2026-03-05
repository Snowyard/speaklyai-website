import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { customerId, priceId } = await request.json();

    if (!customerId || !priceId) {
      return NextResponse.json(
        { error: 'customerId and priceId are required' },
        { status: 400 }
      );
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      metadata: {
        businessName: 'SpeaklyAI',
      },
    });

    return NextResponse.json({
      success: true,
      sessionUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', message: error.message },
      { status: 500 }
    );
  }
}
