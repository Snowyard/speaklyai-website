import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { businessName, hours, services, faqs, greeting } = await request.json();

    // Validate required fields
    if (!businessName) {
      return NextResponse.json(
        { error: 'Business name is required' },
        { status: 400 }
      );
    }

    // Build system prompt from business details
    const servicesText = services && services.length > 0
      ? services.map(s => `- ${s.name} (${s.duration} minutes)`).join('\n')
      : 'General services available';

    const faqsText = faqs && faqs.length > 0
      ? faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')
      : 'No specific FAQs provided';

    const hoursText = hours
      ? Object.entries(hours)
          .map(([day, time]) => {
            if (time.closed) {
              return `${day}: Closed`;
            }
            return `${day}: ${time.open} - ${time.close}`;
          })
          .join('\n')
      : 'Hours: Monday - Friday 9:00 AM - 5:00 PM, Saturday - Sunday Closed';

    const systemPrompt = `You are an AI receptionist for ${businessName}. Your job is to help customers with inquiries, answer questions, and assist with appointments or orders.

BUSINESS INFORMATION:
Business Name: ${businessName}

BUSINESS HOURS:
${hoursText}

SERVICES OFFERED:
${servicesText}

FREQUENTLY ASKED QUESTIONS:
${faqsText}

GUIDELINES:
- Be friendly, professional, and helpful
- Answer questions based on the information provided above
- For appointment bookings, collect the customer's name, phone number, and preferred time
- If a customer asks about something not covered, politely let them know you'll have a team member get back to them
- Keep responses concise and natural
- Always verify information before confirming appointments or orders`;

    const defaultGreeting = greeting || `Hey there! Thanks for calling ${businessName}, how can I help you today?`;

    // Call Vapi API
    const vapiResponse = await fetch('https://api.vapi.ai/assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
      },
      body: JSON.stringify({
        name: `${businessName} - SpeaklyAI Agent`,
        firstMessage: defaultGreeting,
        model: {
          provider: 'openai',
          model: 'gpt-4',
          systemPrompt: systemPrompt,
        },
        voice: {
          provider: '11labs',
          voiceId: '21m00Tcm4TlvDq8ikWAM',
        },
        transcriber: {
          provider: 'deepgram',
          model: 'nova-2',
        },
      }),
    });

    if (!vapiResponse.ok) {
      const errorData = await vapiResponse.json();
      console.error('Vapi API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create AI agent', details: errorData },
        { status: vapiResponse.status }
      );
    }

    const assistantData = await vapiResponse.json();

    return NextResponse.json({
      success: true,
      assistant: assistantData,
      message: 'AI agent created successfully',
    });
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
