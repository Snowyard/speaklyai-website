import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const assistantId = searchParams.get('assistantId');

    if (!assistantId) {
      return NextResponse.json(
        { error: 'assistantId query parameter is required' },
        { status: 400 }
      );
    }

    // Fetch calls from Vapi API
    const vapiResponse = await fetch(
      `https://api.vapi.ai/call?assistantId=${encodeURIComponent(assistantId)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
        },
      }
    );

    if (!vapiResponse.ok) {
      const errorData = await vapiResponse.json();
      console.error('Vapi API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch calls', details: errorData },
        { status: vapiResponse.status }
      );
    }

    const callsData = await vapiResponse.json();

    return NextResponse.json({
      success: true,
      calls: callsData,
    });
  } catch (error) {
    console.error('Error fetching calls:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
