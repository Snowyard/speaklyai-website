import { NextResponse } from 'next/server';
// import { supabase } from '@/lib/supabase'; // Uncomment when ready to use

export async function POST(request) {
  try {
    const { email, businessName, phone, industry, website } = await request.json();

    // Validate required fields
    if (!email || !businessName) {
      return NextResponse.json(
        { error: 'Email and business name are required' },
        { status: 400 }
      );
    }

    // Example of storing business data in Supabase (commented for now)
    // This would typically be called after user signup to store additional business details
    /*
    try {
      const { data, error } = await supabase
        .from('businesses')
        .insert([
          {
            user_email: email,
            business_name: businessName,
            phone: phone || null,
            industry: industry || null,
            website: website || null,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) {
        console.error('Error storing business data:', error);
        return NextResponse.json(
          { error: 'Failed to store business data', details: error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Business data stored successfully',
        business: data[0],
      });
    } catch (supabaseError) {
      console.error('Supabase operation failed:', supabaseError);
      return NextResponse.json(
        { error: 'Database operation failed' },
        { status: 500 }
      );
    }
    */

    // For now, just return success (implement Supabase integration when ready)
    return NextResponse.json({
      success: true,
      message: 'Business information would be stored here',
      data: {
        email,
        businessName,
        phone,
        industry,
        website,
      },
    });
  } catch (error) {
    console.error('Error in auth endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
