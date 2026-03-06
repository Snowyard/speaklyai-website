export const INDUSTRIES = [
  {
    id: 'plumbing',
    name: 'Plumbing & HVAC',
    icon: '🔧',
    description: 'Plumbing and HVAC service businesses',
    color: '#2563eb',
    recommendedBlocks: []
  },
  {
    id: 'fitness',
    name: 'Fitness Studio',
    icon: '🏋️',
    description: 'Fitness studios and personal training facilities',
    color: '#16a34a',
    recommendedBlocks: []
  },
  {
    id: 'contractor',
    name: 'General Contractor',
    icon: '🔨',
    description: 'General contractors and construction businesses',
    color: '#eab308',
    recommendedBlocks: []
  }
];

export const CAPABILITY_BLOCKS = {
  'pricing-plans': {
    id: 'pricing-plans',
    name: 'Pricing & Plans',
    icon: '💰',
    description: 'Answers questions about your rates, packages, and membership tiers.',
    category: 'info',
    industries: ['all'],
    configFields: [
      {
        key: 'pricingInfo',
        label: 'Your Pricing Details',
        type: 'textarea',
        placeholder: 'List your services and prices. For example:\n\nDrain cleaning: $150\nWater heater install: $1,200\nMonthly membership: $49/mo\nPersonal training (1hr): $75'
      },
      {
        key: 'promotions',
        label: 'Current Promotions (optional)',
        type: 'textarea',
        placeholder: 'Any active deals, discounts, or special offers'
      }
    ]
  },
  'common-questions': {
    id: 'common-questions',
    name: 'Answer Common Questions',
    icon: '💬',
    description: 'Handles the questions your customers ask most — parking, policies, what to bring, etc.',
    category: 'info',
    industries: ['all'],
    configFields: [
      {
        key: 'faqPairs',
        label: 'Common Questions & Answers',
        type: 'textarea',
        placeholder: 'Write your most common questions and answers:\n\nQ: Do you offer free estimates?\nA: Yes, all estimates are free.\n\nQ: What forms of payment do you accept?\nA: We accept cash, credit cards, and e-transfer.'
      }
    ]
  },
  'hours-location': {
    id: 'hours-location',
    name: 'Hours & Location',
    icon: '🕐',
    description: 'Tells callers when you are open, where you are located, and how to get there.',
    category: 'info',
    industries: ['all'],
    configFields: [
      {
        key: 'businessHours',
        label: 'Business Hours',
        type: 'textarea',
        placeholder: 'Monday - Friday: 9am - 5pm\nSaturday: 10am - 2pm\nSunday: Closed'
      },
      {
        key: 'address',
        label: 'Business Address',
        type: 'text',
        placeholder: '123 Main St, City, Province/State'
      },
      {
        key: 'additionalInfo',
        label: 'Additional Info (optional)',
        type: 'textarea',
        placeholder: 'Parking instructions, nearest transit stop, accessibility info, etc.'
      }
    ]
  }
};
