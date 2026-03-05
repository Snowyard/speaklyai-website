import { NextResponse } from 'next/server';
import Stripe from 'stripe';
// import { supabase } from '@/lib/supabase'; // Uncomment when ready to use

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        {
          const session = event.data.object;
          console.log('Checkout session completed:', session.id);

          // Example of activating subscription in Supabase (commented for now)
          /*
          try {
            const { data, error } = await supabase
              .from('subscriptions')
              .update({
                status: 'active',
                stripe_subscription_id: session.subscription,
                activated_at: new Date().toISOString(),
              })
              .eq('stripe_customer_id', session.customer);

            if (error) {
              console.error('Error activating subscription:', error);
            }
          } catch (supabaseError) {
            console.error('Supabase operation failed:', supabaseError);
          }
          */
        }
        break;

      case 'invoice.paid':
        {
          const invoice = event.data.object;
          console.log('Invoice paid:', invoice.id);

          // Example of recording payment in Supabase (commented for now)
          /*
          try {
            const { data, error } = await supabase
              .from('payments')
              .insert([
                {
                  stripe_invoice_id: invoice.id,
                  stripe_customer_id: invoice.customer,
                  amount: invoice.total / 100,
                  currency: invoice.currency.toUpperCase(),
                  status: 'paid',
                  paid_at: new Date(invoice.paid_date * 1000).toISOString(),
                }
              ]);

            if (error) {
              console.error('Error recording payment:', error);
            }
          } catch (supabaseError) {
            console.error('Supabase operation failed:', supabaseError);
          }
          */
        }
        break;

      case 'customer.subscription.deleted':
        {
          const subscription = event.data.object;
          console.log('Subscription deleted:', subscription.id);

          // Example of deactivating subscription in Supabase (commented for now)
          /*
          try {
            const { data, error } = await supabase
              .from('subscriptions')
              .update({
                status: 'canceled',
                canceled_at: new Date().toISOString(),
              })
              .eq('stripe_subscription_id', subscription.id);

            if (error) {
              console.error('Error deactivating subscription:', error);
            }
          } catch (supabaseError) {
            console.error('Supabase operation failed:', supabaseError);
          }
          */
        }
        break;

      default:
        console.log('Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
