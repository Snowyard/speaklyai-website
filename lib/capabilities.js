export const INDUSTRIES = [
  {
    id: 'plumbing',
    name: 'Plumbing & HVAC',
    icon: '🔧',
    description: 'Plumbing and HVAC service businesses',
    color: '#2563eb',
    recommendedBlocks: [
      'appointment-booking',
      'business-hours',
      'after-hours',
      'call-routing',
      'faq-handler',
      'voicemail',
      'emergency-triage',
      'emergency-routing',
      'quote-request',
      'service-area'
    ]
  },
  {
    id: 'fitness',
    name: 'Fitness Studio',
    icon: '🏋️',
    description: 'Fitness studios and personal training facilities',
    color: '#16a34a',
    recommendedBlocks: [
      'appointment-booking',
      'business-hours',
      'after-hours',
      'call-routing',
      'faq-handler',
      'voicemail',
      'class-booking',
      'pt-scheduling',
      'membership-info',
      'waitlist',
      'trial-pass'
    ]
  },
  // {
  //   id: 'salon',
  //   name: 'Hair Salon',
  //   icon: '✂️',
  //   description: 'Hair salons and beauty studios',
  //   color: '#ec4899',
  //   recommendedBlocks: [
  //     'appointment-booking', 'business-hours', 'after-hours', 'call-routing',
  //     'faq-handler', 'voicemail', 'stylist-booking', 'service-menu',
  //     'cancellation', 'walkin-check'
  //   ]
  // },
  // {
  //   id: 'dental',
  //   name: 'Dental Office',
  //   icon: '🦷',
  //   description: 'Dental practices and orthodontists',
  //   color: '#06b6d4',
  //   recommendedBlocks: [
  //     'appointment-booking', 'business-hours', 'after-hours', 'call-routing',
  //     'faq-handler', 'voicemail', 'dental-scheduling', 'insurance-verify',
  //     'dental-emergency', 'new-patient', 'recall-confirm'
  //   ]
  // },
  // {
  //   id: 'restaurant',
  //   name: 'Restaurant',
  //   icon: '🍴',
  //   description: 'Restaurants and food service businesses',
  //   color: '#f97316',
  //   recommendedBlocks: [
  //     'appointment-booking', 'business-hours', 'after-hours', 'call-routing',
  //     'faq-handler', 'voicemail', 'reservation', 'menu-info',
  //     'takeout-order', 'large-party', 'dietary-info'
  //   ]
  // },
  {
    id: 'contractor',
    name: 'General Contractor',
    icon: '🔨',
    description: 'General contractors and construction businesses',
    color: '#eab308',
    recommendedBlocks: [
      'appointment-booking',
      'business-hours',
      'after-hours',
      'call-routing',
      'faq-handler',
      'voicemail',
      'project-intake',
      'estimate-booking',
      'jobsite-updates',
      'subcontractor-dispatch'
    ]
  },
  // {
  //   id: 'realestate',
  //   name: 'Real Estate',
  //   icon: '🏠',
  //   description: 'Real estate agencies and property management',
  //   color: '#a855f7',
  //   recommendedBlocks: ['appointment-booking', 'business-hours', 'after-hours', 'call-routing', 'faq-handler', 'voicemail']
  // },
  // {
  //   id: 'medical',
  //   name: 'Medical Clinic',
  //   icon: '⚕️',
  //   description: 'Medical practices and healthcare facilities',
  //   color: '#dc2626',
  //   recommendedBlocks: ['appointment-booking', 'business-hours', 'after-hours', 'call-routing', 'faq-handler', 'voicemail', 'new-patient']
  // },
  // {
  //   id: 'auto',
  //   name: 'Auto Shop',
  //   icon: '🚗',
  //   description: 'Auto repair and maintenance shops',
  //   color: '#64748b',
  //   recommendedBlocks: ['appointment-booking', 'business-hours', 'after-hours', 'call-routing', 'faq-handler', 'voicemail']
  // },
  // {
  //   id: 'other',
  //   name: 'Other Business',
  //   icon: '🏢',
  //   description: 'Any other type of business',
  //   color: '#6b7280',
  //   recommendedBlocks: ['appointment-booking', 'business-hours', 'after-hours', 'call-routing', 'faq-handler', 'voicemail']
  // }
];

export const CAPABILITY_BLOCKS = {
  // Universal blocks
  'appointment-booking': {
    id: 'appointment-booking',
    name: 'Appointment Booking',
    icon: '📅',
    description: 'Books appointments checking availability.',
    category: 'scheduling',
    industries: ['all'],
    configFields: [
      {
        key: 'servicesOffered',
        label: 'Services Offered',
        type: 'textarea',
        placeholder: 'List all services available for booking (one per line)'
      },
      {
        key: 'appointmentDuration',
        label: 'Appointment Duration (minutes)',
        type: 'number',
        placeholder: '30'
      },
      {
        key: 'advanceBookingDays',
        label: 'Advance Booking Window (days)',
        type: 'number',
        placeholder: '60'
      }
    ]
  },
  'business-hours': {
    id: 'business-hours',
    name: 'Hours & Info',
    icon: '🕐',
    description: 'Answers questions about hours, location, services.',
    category: 'info',
    industries: ['all'],
    configFields: [
      {
        key: 'address',
        label: 'Business Address',
        type: 'text',
        placeholder: '123 Main St, City, State 12345'
      },
      {
        key: 'specialInstructions',
        label: 'Special Instructions',
        type: 'textarea',
        placeholder: 'Additional info about hours, parking, accessibility, etc.'
      }
    ]
  },
  'after-hours': {
    id: 'after-hours',
    name: 'After-Hours Messaging',
    icon: '🌙',
    description: 'Takes messages when business is closed.',
    category: 'scheduling',
    industries: ['all'],
    configFields: [
      {
        key: 'messagePrompt',
        label: 'Message Prompt',
        type: 'textarea',
        placeholder: 'Thank you for calling. We are currently closed. Please leave a message and we will get back to you.'
      },
      {
        key: 'notificationEmail',
        label: 'Notification Email',
        type: 'text',
        placeholder: 'admin@business.com'
      }
    ]
  },
  'call-routing': {
    id: 'call-routing',
    name: 'Smart Call Routing',
    icon: '📞',
    description: 'Routes calls to specific people based on rules.',
    category: 'routing',
    industries: ['all'],
    configFields: [
      {
        key: 'primaryNumber',
        label: 'Primary Number',
        type: 'text',
        placeholder: '+1 (555) 123-4567'
      },
      {
        key: 'secondaryNumber',
        label: 'Secondary Number',
        type: 'text',
        placeholder: '+1 (555) 987-6543'
      },
      {
        key: 'routingRules',
        label: 'Routing Rules',
        type: 'textarea',
        placeholder: 'Describe how calls should be routed (e.g., sales to primary, support to secondary)'
      }
    ]
  },
  'faq-handler': {
    id: 'faq-handler',
    name: 'FAQ Handler',
    icon: '❓',
    description: 'Answers common questions.',
    category: 'info',
    industries: ['all'],
    configFields: [
      {
        key: 'faqPairs',
        label: 'FAQ Pairs',
        type: 'textarea',
        placeholder: 'Q: What are your hours?\nA: Monday-Friday 9am-5pm\n\nQ: Do you offer discounts?\nA: Yes, for new customers.'
      }
    ]
  },
  'voicemail': {
    id: 'voicemail',
    name: 'Voicemail',
    icon: '📨',
    description: 'Takes a message if caller prefers.',
    category: 'scheduling',
    industries: ['all'],
    configFields: [
      {
        key: 'voicemailGreeting',
        label: 'Voicemail Greeting',
        type: 'textarea',
        placeholder: 'Thank you for calling. Please leave a detailed message with your name, number, and reason for calling.'
      }
    ]
  },

  // Plumbing/HVAC specific
  'emergency-triage': {
    id: 'emergency-triage',
    name: 'Emergency Triage',
    icon: '🚨',
    description: 'Gauges urgency of the situation (burst pipe vs dripping faucet).',
    category: 'emergency',
    industries: ['plumbing'],
    configFields: [
      {
        key: 'emergencyCriteria',
        label: 'Emergency Criteria',
        type: 'textarea',
        placeholder: 'Define what constitutes an emergency (e.g., burst pipes, gas smell, no heat)'
      },
      {
        key: 'urgencyLevels',
        label: 'Urgency Levels',
        type: 'textarea',
        placeholder: 'Critical (24/7 dispatch), High (same day), Medium (within 2 days), Low (scheduling)'
      }
    ]
  },
  'emergency-routing': {
    id: 'emergency-routing',
    name: 'Emergency Call Routing',
    icon: '⚠️',
    description: 'Forwards critical calls directly to on-call technician.',
    category: 'routing',
    industries: ['plumbing'],
    configFields: [
      {
        key: 'emergencyNumber',
        label: 'Emergency Number',
        type: 'text',
        placeholder: '+1 (555) 999-8888'
      },
      {
        key: 'hoursActive',
        label: 'Hours Active',
        type: 'text',
        placeholder: '24/7 or specific hours'
      }
    ]
  },
  'quote-request': {
    id: 'quote-request',
    name: 'Quote Request',
    icon: '💰',
    description: 'Collects job details for estimates.',
    category: 'intake',
    industries: ['plumbing'],
    configFields: [
      {
        key: 'servicesList',
        label: 'Services List',
        type: 'textarea',
        placeholder: 'Plumbing repair, water heater replacement, HVAC maintenance, etc.'
      },
      {
        key: 'requiredInfo',
        label: 'Required Information',
        type: 'textarea',
        placeholder: 'Address, job type, estimated scope, preferred appointment time'
      }
    ]
  },
  'service-area': {
    id: 'service-area',
    name: 'Service Area Check',
    icon: '🗺️',
    description: 'Confirms if caller is within service area.',
    category: 'routing',
    industries: ['plumbing'],
    configFields: [
      {
        key: 'serviceAreas',
        label: 'Service Areas',
        type: 'textarea',
        placeholder: 'List cities, zip codes, or regions we service (one per line)'
      },
      {
        key: 'outOfAreaMessage',
        label: 'Out of Area Message',
        type: 'textarea',
        placeholder: 'Sorry, we do not service your area. Here are some referrals...'
      }
    ]
  },

  // Fitness specific
  'class-booking': {
    id: 'class-booking',
    name: 'Class Booking',
    icon: '💪',
    description: 'Books group fitness classes.',
    category: 'scheduling',
    industries: ['fitness'],
    configFields: [
      {
        key: 'classTypes',
        label: 'Class Types',
        type: 'textarea',
        placeholder: 'Yoga, Pilates, HIIT, Spin, CrossFit, etc. (one per line)'
      },
      {
        key: 'maxCapacity',
        label: 'Max Capacity per Class',
        type: 'number',
        placeholder: '20'
      }
    ]
  },
  'pt-scheduling': {
    id: 'pt-scheduling',
    name: 'Personal Training Scheduling',
    icon: '👤',
    description: 'Books 1-on-1 training sessions.',
    category: 'scheduling',
    industries: ['fitness'],
    configFields: [
      {
        key: 'trainers',
        label: 'Trainers',
        type: 'textarea',
        placeholder: 'List trainers with their specialties (one per line)'
      },
      {
        key: 'sessionDurations',
        label: 'Session Durations (minutes)',
        type: 'textarea',
        placeholder: '30, 45, 60'
      }
    ]
  },
  'membership-info': {
    id: 'membership-info',
    name: 'Membership Inquiries',
    icon: '🎟️',
    description: 'Answers questions about plans and pricing.',
    category: 'info',
    industries: ['fitness'],
    configFields: [
      {
        key: 'membershipTiers',
        label: 'Membership Tiers',
        type: 'textarea',
        placeholder: 'Basic ($29/mo), Premium ($49/mo), VIP ($99/mo) with details about each'
      }
    ]
  },
  'waitlist': {
    id: 'waitlist',
    name: 'Waitlist Management',
    icon: '📋',
    description: 'Adds callers to class waitlists.',
    category: 'scheduling',
    industries: ['fitness'],
    configFields: [
      {
        key: 'notificationMethod',
        label: 'Notification Method',
        type: 'select',
        placeholder: 'How to notify about openings',
        options: [
          { label: 'Call', value: 'call' },
          { label: 'Text', value: 'text' },
          { label: 'Email', value: 'email' }
        ]
      }
    ]
  },
  'trial-pass': {
    id: 'trial-pass',
    name: 'Trial Pass Signup',
    icon: '🎁',
    description: 'Signs up first-timers for a free trial.',
    category: 'intake',
    industries: ['fitness'],
    configFields: [
      {
        key: 'trialDuration',
        label: 'Trial Duration (days)',
        type: 'number',
        placeholder: '7'
      },
      {
        key: 'requiredInfo',
        label: 'Required Information',
        type: 'textarea',
        placeholder: 'Name, email, phone, fitness goals, any injuries'
      }
    ]
  },

  // Salon specific
  'stylist-booking': {
    id: 'stylist-booking',
    name: 'Stylist Selection Booking',
    icon: '💇',
    description: 'Books with a specific stylist.',
    category: 'scheduling',
    industries: ['salon'],
    configFields: [
      {
        key: 'stylists',
        label: 'Stylists',
        type: 'textarea',
        placeholder: 'List stylist names (one per line)'
      },
      {
        key: 'specialties',
        label: 'Specialties',
        type: 'textarea',
        placeholder: 'Color, highlights, cuts, extensions, blow-outs, etc.'
      }
    ]
  },
  'service-menu': {
    id: 'service-menu',
    name: 'Service Menu & Pricing',
    icon: '💅',
    description: 'Shares service details and prices.',
    category: 'info',
    industries: ['salon'],
    configFields: [
      {
        key: 'servicesAndPrices',
        label: 'Services and Prices',
        type: 'textarea',
        placeholder: 'Haircut: $40, Color: $60, Highlights: $80, Blowout: $35, etc.'
      }
    ]
  },
  'cancellation': {
    id: 'cancellation',
    name: 'Cancellation/Rescheduling',
    icon: '🔄',
    description: 'Handles appointment changes.',
    category: 'scheduling',
    industries: ['salon'],
    configFields: [
      {
        key: 'cancellationPolicy',
        label: 'Cancellation Policy',
        type: 'textarea',
        placeholder: 'Describe cancellation and rescheduling policies'
      },
      {
        key: 'minimumNoticeHours',
        label: 'Minimum Notice (hours)',
        type: 'number',
        placeholder: '24'
      }
    ]
  },
  'walkin-check': {
    id: 'walkin-check',
    name: 'Walk-In Availability',
    icon: '⏱️',
    description: 'Checks if walk-ins are available now.',
    category: 'scheduling',
    industries: ['salon'],
    configFields: [
      {
        key: 'checkMethod',
        label: 'Check Method',
        type: 'select',
        placeholder: 'How to check availability',
        options: [
          { label: 'Real-time check', value: 'realtime' },
          { label: 'Schedule-based', value: 'schedule-based' }
        ]
      }
    ]
  },

  // Dental specific
  'dental-scheduling': {
    id: 'dental-scheduling',
    name: 'Dental Appointment Scheduling',
    icon: '🪥',
    description: 'Books cleanings, checkups, procedures.',
    category: 'scheduling',
    industries: ['dental'],
    configFields: [
      {
        key: 'procedureTypes',
        label: 'Procedure Types',
        type: 'textarea',
        placeholder: 'Cleaning, checkup, filling, root canal, crown, extraction, etc.'
      },
      {
        key: 'dentists',
        label: 'Dentists',
        type: 'textarea',
        placeholder: 'List dentist names (one per line)'
      }
    ]
  },
  'insurance-verify': {
    id: 'insurance-verify',
    name: 'Insurance Verification',
    icon: '🏥',
    description: 'Asks about and notes insurance details.',
    category: 'intake',
    industries: ['dental'],
    configFields: [
      {
        key: 'acceptedProviders',
        label: 'Accepted Providers',
        type: 'textarea',
        placeholder: 'List accepted insurance providers (one per line)'
      }
    ]
  },
  'dental-emergency': {
    id: 'dental-emergency',
    name: 'Emergency Dental Triage',
    icon: '🦷',
    description: 'Assesses dental emergencies.',
    category: 'emergency',
    industries: ['dental'],
    configFields: [
      {
        key: 'emergencyCriteria',
        label: 'Emergency Criteria',
        type: 'textarea',
        placeholder: 'Severe pain, broken tooth, swelling, infection, trauma'
      },
      {
        key: 'emergencyNumber',
        label: 'Emergency Number',
        type: 'text',
        placeholder: '+1 (555) 999-8888'
      }
    ]
  },
  'new-patient': {
    id: 'new-patient',
    name: 'New Patient Intake',
    icon: '📝',
    description: 'Collects info from first-time patients.',
    category: 'intake',
    industries: ['dental', 'medical'],
    configFields: [
      {
        key: 'requiredFields',
        label: 'Required Fields',
        type: 'textarea',
        placeholder: 'Name, DOB, medical history, medications, allergies, emergency contact'
      }
    ]
  },
  'recall-confirm': {
    id: 'recall-confirm',
    name: 'Recall/Reminder Confirmation',
    icon: '🔔',
    description: 'Confirms upcoming appointments.',
    category: 'scheduling',
    industries: ['dental'],
    configFields: [
      {
        key: 'reminderTiming',
        label: 'Reminder Timing',
        type: 'select',
        placeholder: 'When to send reminders',
        options: [
          { label: '24 hours before', value: '24h' },
          { label: '48 hours before', value: '48h' },
          { label: '1 week before', value: '1week' }
        ]
      }
    ]
  },

  // Restaurant specific
  'reservation': {
    id: 'reservation',
    name: 'Reservation Booking',
    icon: '🍽️',
    description: 'Books tables.',
    category: 'scheduling',
    industries: ['restaurant'],
    configFields: [
      {
        key: 'partySizeMax',
        label: 'Maximum Party Size',
        type: 'number',
        placeholder: '8'
      },
      {
        key: 'reservationHours',
        label: 'Reservation Hours',
        type: 'textarea',
        placeholder: 'Monday-Thursday 5pm-10pm, Friday-Saturday 5pm-11pm, Sunday 5pm-9pm'
      }
    ]
  },
  'menu-info': {
    id: 'menu-info',
    name: 'Menu Inquiries',
    icon: '📖',
    description: 'Answers questions about the menu.',
    category: 'info',
    industries: ['restaurant'],
    configFields: [
      {
        key: 'menuHighlights',
        label: 'Menu Highlights',
        type: 'textarea',
        placeholder: 'Featured dishes and their descriptions'
      },
      {
        key: 'specials',
        label: 'Specials',
        type: 'textarea',
        placeholder: 'Current specials, happy hour, seasonal items'
      }
    ]
  },
  'takeout-order': {
    id: 'takeout-order',
    name: 'Takeout/Delivery Orders',
    icon: '🚚',
    description: 'Takes food orders over the phone.',
    category: 'intake',
    industries: ['restaurant'],
    configFields: [
      {
        key: 'orderMethod',
        label: 'Order Method',
        type: 'select',
        placeholder: 'How orders are processed',
        options: [
          { label: 'Phone orders', value: 'phone' },
          { label: 'Redirect to app', value: 'redirect-to-app' }
        ]
      },
      {
        key: 'deliveryAvailable',
        label: 'Delivery Available',
        type: 'toggle',
        placeholder: 'Is delivery offered?'
      }
    ]
  },
  'large-party': {
    id: 'large-party',
    name: 'Large Party Requests',
    icon: '👥',
    description: 'Handles group bookings and events.',
    category: 'scheduling',
    industries: ['restaurant'],
    configFields: [
      {
        key: 'minimumPartySize',
        label: 'Minimum Party Size for Events',
        type: 'number',
        placeholder: '15'
      },
      {
        key: 'eventCoordinatorNumber',
        label: 'Event Coordinator Number',
        type: 'text',
        placeholder: '+1 (555) 111-2222'
      }
    ]
  },
  'dietary-info': {
    id: 'dietary-info',
    name: 'Dietary/Allergy Info',
    icon: '🥗',
    description: 'Answers allergy and dietary questions.',
    category: 'info',
    industries: ['restaurant'],
    configFields: [
      {
        key: 'allergenList',
        label: 'Allergen List',
        type: 'textarea',
        placeholder: 'Nuts, shellfish, dairy, gluten, etc.'
      },
      {
        key: 'dietaryOptions',
        label: 'Dietary Options',
        type: 'textarea',
        placeholder: 'Vegan, vegetarian, keto, gluten-free options'
      }
    ]
  },

  // Contractor specific
  'project-intake': {
    id: 'project-intake',
    name: 'Project Inquiry Intake',
    icon: '🏗️',
    description: 'Collects details about potential projects.',
    category: 'intake',
    industries: ['contractor'],
    configFields: [
      {
        key: 'projectTypes',
        label: 'Project Types',
        type: 'textarea',
        placeholder: 'Roofing, foundation, framing, plumbing, electrical, etc.'
      },
      {
        key: 'requiredInfo',
        label: 'Required Information',
        type: 'textarea',
        placeholder: 'Property address, project scope, timeline, budget range'
      }
    ]
  },
  'estimate-booking': {
    id: 'estimate-booking',
    name: 'Free Estimate Scheduling',
    icon: '📐',
    description: 'Books on-site estimate appointments.',
    category: 'scheduling',
    industries: ['contractor'],
    configFields: [
      {
        key: 'estimateDuration',
        label: 'Estimate Duration (minutes)',
        type: 'number',
        placeholder: '60'
      },
      {
        key: 'serviceRadius',
        label: 'Service Radius',
        type: 'text',
        placeholder: '25 miles, City/County, etc.'
      }
    ]
  },
  'jobsite-updates': {
    id: 'jobsite-updates',
    name: 'Job Site Update Line',
    icon: '📢',
    description: 'Provides status updates on active jobs.',
    category: 'info',
    industries: ['contractor'],
    configFields: [
      {
        key: 'updateMethod',
        label: 'Update Method',
        type: 'select',
        placeholder: 'How updates are provided',
        options: [
          { label: 'Automated system', value: 'automated' },
          { label: 'Manual updates', value: 'manual' }
        ]
      }
    ]
  },
  'subcontractor-dispatch': {
    id: 'subcontractor-dispatch',
    name: 'Subcontractor Dispatch',
    icon: '🔄',
    description: 'Routes specialized requests to subs.',
    category: 'routing',
    industries: ['contractor'],
    configFields: [
      {
        key: 'specialtiesAndNumbers',
        label: 'Specialties and Contact Numbers',
        type: 'textarea',
        placeholder: 'Electrical: 555-1111\nPlumbing: 555-2222\nFraming: 555-3333'
      }
    ]
  }
};
