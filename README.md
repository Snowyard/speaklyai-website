# SpeaklyAI — AI Voice Agents for Small Business

SpeaklyAI answers your business phone 24/7 with intelligent voice agents that handle scheduling, inquiries, and routing.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase
- **Voice AI:** Vapi API (OpenAI GPT-4 + ElevenLabs + Deepgram)
- **Payments:** Stripe (subscriptions)
- **Hosting:** Vercel

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

You'll need accounts at:
- **Supabase** (https://supabase.com) — Create a project, get your URL and anon key
- **Vapi** (https://vapi.ai) — Sign up, get your API key from the dashboard
- **Stripe** (https://stripe.com) — Create an account, get your publishable and secret keys
- **Vercel** (https://vercel.com) — For deployment

### 3. Set up Supabase

Create these tables in your Supabase SQL editor:

```sql
-- Businesses table
CREATE TABLE businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  industry TEXT,
  phone TEXT,
  website TEXT,
  address TEXT,
  vapi_assistant_id TEXT,
  stripe_customer_id TEXT,
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business hours
CREATE TABLE business_hours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL, -- 0=Sunday, 6=Saturday
  is_open BOOLEAN DEFAULT true,
  open_time TIME,
  close_time TIME
);

-- Services
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  duration INTEGER, -- minutes
  price DECIMAL(10,2)
);

-- Call logs (synced from Vapi webhooks)
CREATE TABLE call_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id),
  vapi_call_id TEXT,
  caller_number TEXT,
  duration INTEGER, -- seconds
  call_type TEXT, -- appointment, inquiry, emergency
  outcome TEXT, -- resolved, transferred, voicemail
  transcript JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  customer_name TEXT,
  customer_phone TEXT,
  service TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. Set up Stripe

Create a product and price in Stripe:

1. Go to Stripe Dashboard → Products → Add Product
2. Name: "SpeaklyAI Pro"
3. Price: $49/month (recurring)
4. Copy the Price ID (starts with `price_`) — you'll use this in the checkout flow

Set up webhooks:
1. Go to Developers → Webhooks → Add endpoint
2. URL: `https://yourdomain.com/api/stripe/webhook`
3. Events: `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`

### 5. Set up Vapi webhooks

1. Go to Vapi Dashboard → Settings → Webhooks
2. URL: `https://yourdomain.com/api/vapi/webhook`
3. Events: call.started, call.ended, transcript.complete

### 6. Run locally

```bash
npm run dev
```

Open http://localhost:3000

## Deploying to Vercel

1. Push this project to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Add all environment variables from `.env.local`
4. Deploy

### Connect your domain (speaklyai.ca)

1. In Vercel: Settings → Domains → Add `speaklyai.ca`
2. In Namecheap: Advanced DNS → Add:
   - A Record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

## Project Structure

```
speaklyai-website/
├── app/
│   ├── layout.js              # Root layout (Inter font, metadata)
│   ├── page.js                # Landing page
│   ├── globals.css            # Global styles + Tailwind
│   ├── login/page.js          # Login page
│   ├── signup/page.js         # Signup page
│   ├── setup/page.js          # Business setup wizard (6 steps)
│   ├── dashboard/
│   │   ├── layout.js          # Dashboard layout (sidebar + content)
│   │   ├── page.js            # Overview (stats + charts)
│   │   ├── calls/page.js      # Call logs with transcripts
│   │   ├── calendar/page.js   # Appointment calendar
│   │   ├── settings/page.js   # Business settings
│   │   └── billing/page.js    # Subscription & billing
│   └── api/
│       ├── auth/route.js      # Custom auth logic
│       ├── vapi/
│       │   ├── create-agent/route.js  # Create Vapi assistant
│       │   ├── calls/route.js         # Fetch call history
│       │   └── webhook/route.js       # Vapi event webhooks
│       └── stripe/
│           ├── create-checkout/route.js  # Stripe checkout
│           └── webhook/route.js          # Stripe event webhooks
├── components/
│   ├── Navbar.js              # Public site navbar
│   ├── Footer.js              # Public site footer
│   ├── Sidebar.js             # Dashboard sidebar
│   └── AuthGuard.js           # Auth protection wrapper
├── lib/
│   ├── supabase.js            # Supabase client
│   ├── vapi.js                # Vapi API helpers
│   └── stripe.js              # Stripe helpers
├── package.json
├── next.config.js
├── tailwind.config.js
└── .env.example
```

## License

Copyright 2026 SpeaklyAI. All rights reserved.
