import { NextResponse } from 'next/server';
// import { supabase } from '@/lib/supabase'; // Uncomment when ready to use

export async function POST(request) {
  try {
    const event = await request.json();

    console.log('Received Vapi webhook event:', {
      type: event.type || event.event,
      timestamp: new Date().toISOString(),
    });

    const eventType = event.type || event.event;

    // Handle different event types
    switch (eventType) {
      case 'call.started':
        console.log('Call started:', event.callId);
        // Could store call start data if needed
        break;

      case 'call.ended':
        console.log('Call ended:', event.callId);
        // Example of storing call data in Supabase (commented for now)
        /*
        try {
          const { data, error } = await supabase
            .from('calls')
            .insert([
              {
                vapi_call_id: event.callId,
                assistant_id: event.assistantId,
                duration: event.endedReason?.duration || 0,
                status: 'completed',
                transcript: event.transcript || null,
                recording_url: event.recordingUrl || null,
                started_at: new Date(event.startedAt).toISOString(),
                ended_at: new Date().toISOString(),
              }
            ]);

          if (error) {
            console.error('Error storing call in Supabase:', error);
          }
        } catch (supabaseError) {
          console.error('Supabase operation failed:', supabaseError);
        }
        */
        break;

      case 'transcript.complete':
        console.log('Transcript complete for call:', event.callId);
        // Could process transcript here
        // Example: store full transcript in database
        /*
        try {
          const { data, error } = await supabase
            .from('call_transcripts')
            .insert([
              {
                vapi_call_id: event.callId,
                transcript: event.transcript,
                summary: event.summary || null,
              }
            ]);

          if (error) {
            console.error('Error storing transcript:', error);
          }
        } catch (transcriptError) {
          console.error('Transcript storage failed:', transcriptError);
        }
        */
        break;

      default:
        console.log('Unknown event type:', eventType);
    }

    // Return 200 OK to acknowledge webhook receipt
    return NextResponse.json(
      { success: true, message: 'Webhook processed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    // Still return 200 to prevent Vapi from retrying
    return NextResponse.json(
      { success: false, message: 'Webhook processed with error' },
      { status: 200 }
    );
  }
}
