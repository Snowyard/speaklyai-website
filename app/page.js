'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Phone,
  Calendar,
  MessageSquare,
  BarChart3,
  Zap,
  Shield,
  ArrowRight,
  Check,
} from 'lucide-react';

export default function Home() {
  const [visibleSections, setVisibleSections] = useState({});
  const observerRef = useRef({});

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => {
      observer.observe(section);
      observerRef.current[section.id] = observer;
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const industries = [
    '💇 Hair Salons',
    '🦷 Dental',
    '🍽️ Restaurants',
    '🔧 Plumbers',
    '💪 Fitness',
    '🏥 Medical',
    '🐾 Vets',
    '⚖️ Law',
    '🏠 Real Estate',
    '🚗 Auto',
  ];

  const features = [
    {
      icon: Phone,
      title: '24/7 Call Answering',
      description: 'Never miss another customer call with always-on AI agents',
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Automatically book appointments and manage calendars',
    },
    {
      icon: MessageSquare,
      title: 'Natural Conversation',
      description: 'AI that sounds human and understands context naturally',
    },
    {
      icon: BarChart3,
      title: 'Call Analytics',
      description: 'Detailed insights into every call and customer interaction',
    },
    {
      icon: Zap,
      title: '5-Minute Setup',
      description: 'Get started in minutes, not months',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance standards',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Tell Us About Your Business',
      description: 'Share your business details and call handling preferences',
    },
    {
      number: '2',
      title: 'Get Your Phone Number',
      description: 'Receive a dedicated AI phone number instantly',
    },
    {
      number: '3',
      title: 'Start Taking Calls',
      description: 'Forward your main number and let AI handle the rest',
    },
  ];

  const useCases = [
    {
      emoji: '💇',
      title: 'Salon Booking',
      transcript: [
        'Caller: "Hi, I need a haircut appointment"',
        'AI: "I\'d love to help! What day works best for you?"',
        'Caller: "Friday at 2 PM"',
        'AI: "Perfect! I\'ve booked you for Friday at 2 PM. See you then!"',
      ],
    },
    {
      emoji: '🍽️',
      title: 'Restaurant Hours',
      transcript: [
        'Caller: "What are your hours?"',
        'AI: "We\'re open Monday-Thursday 11AM-10PM, Friday-Saturday 11AM-11PM"',
        'Caller: "Great, thanks!"',
        'AI: "You\'re welcome! See you soon!"',
      ],
    },
    {
      emoji: '🔧',
      title: 'Emergency Plumber Routing',
      transcript: [
        'Caller: "I have a burst pipe!"',
        'AI: "I\'ll get someone out to you immediately. What\'s your address?"',
        'Caller: "123 Main Street"',
        'AI: "Emergency team dispatched. They\'ll arrive in 20 minutes."',
      ],
    },
    {
      emoji: '🦷',
      title: 'After-Hours Dental',
      transcript: [
        'Caller: "I have a terrible toothache"',
        'AI: "I\'m sorry to hear that. Let me schedule an emergency appointment"',
        'Caller: "I work all day tomorrow"',
        'AI: "No problem! I\'ve booked you for 7 PM. Emergency kit info sent to your phone."',
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Maria Lopez',
      business: 'Luxe Hair Studio',
      quote:
        'SpeaklyAI has been a game-changer for our salon. We\'ve increased bookings by 35% and our clients love getting instant responses.',
      rating: 5,
    },
    {
      name: 'Dr. James Rivera',
      business: 'Bright Smile Dental',
      quote:
        'Finally, a solution that handles after-hours calls professionally. Our patients are much happier, and our staff can focus on patient care.',
      rating: 5,
    },
    {
      name: 'Tom Kowalski',
      business: 'Kowalski Plumbing',
      quote:
        'In our industry, being available 24/7 matters. SpeaklyAI keeps our business running smoothly around the clock.',
      rating: 5,
    },
  ];

  const stats = [
    { number: '98%', label: 'Answer Rate' },
    { number: '24/7', label: 'Available' },
    { number: '30s', label: 'Setup' },
    { number: '4.9★', label: 'Satisfaction' },
  ];

  const pricingFeatures = [
    'Unlimited call answering',
    'Smart appointment scheduling',
    'Call analytics & transcripts',
    'Natural AI conversations',
    'Multi-language support',
    'Custom business rules',
    'Priority support',
    'TCPA & PIPEDA compliant',
  ];

  const complianceBadges = [
    '🔒 256-bit Encryption',
    '📞 TCPA Compliant',
    '🇨🇦 PIPEDA Compliant',
    '🏢 Canadian Owned',
  ];

  return (
    <div className="bg-slate-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-white">Never Miss a</span>{' '}
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  Customer Call
                </span>{' '}
                <span className="text-white">Again</span>
              </h1>

              <p className="text-xl text-slate-400 leading-relaxed">
                AI voice agents that answer calls, book appointments, and provide
                customer support 24/7. Built for small businesses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/signup"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight size={20} />
                </Link>
                <a
                  href="#how-it-works"
                  className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  See How It Works
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Phone Call Visual */}
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
                {/* Phone Header */}
                <div className="bg-slate-900 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Phone size={20} className="text-green-500" />
                      <span className="font-semibold">Live Call</span>
                    </div>
                    <span className="text-green-500 text-sm font-medium">
                      Connected
                    </span>
                  </div>

                  {/* Soundwave Animation */}
                  <div className="flex items-center justify-center space-x-1 h-12">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-t from-purple-500 to-purple-600 rounded-full"
                        style={{
                          width: '8px',
                          animation: `soundwave 0.6s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Transcript */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    {
                      speaker: 'Customer',
                      message: 'Hi, I need to book a haircut appointment',
                      delay: 0,
                    },
                    {
                      speaker: 'AI Agent',
                      message: 'Of course! I\'d love to help. What day works best?',
                      delay: 1,
                    },
                    {
                      speaker: 'Customer',
                      message: 'Friday at 2 PM if possible',
                      delay: 2,
                    },
                    {
                      speaker: 'AI Agent',
                      message:
                        'Perfect! I\'ve booked you for Friday at 2 PM. See you then!',
                      delay: 3,
                    },
                  ].map((line, idx) => (
                    <div
                      key={idx}
                      className="opacity-0 animate-fade-in"
                      style={{
                        animationDelay: `${line.delay * 0.5}s`,
                        animationFillMode: 'forwards',
                      }}
                    >
                      <div
                        className={`text-sm rounded-lg p-3 ${
                          line.speaker === 'AI Agent'
                            ? 'bg-purple-600/30 text-purple-200 ml-4'
                            : 'bg-slate-700/50 text-slate-200 mr-4'
                        }`}
                      >
                        <div className="font-semibold text-xs opacity-70 mb-1">
                          {line.speaker}
                        </div>
                        <div>{line.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Tags */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-400 text-sm font-medium mb-6">
            TRUSTED BY BUSINESSES IN
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, idx) => (
              <div
                key={idx}
                className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm hover:bg-slate-700/50 transition-colors"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        data-section
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          visibleSections['features'] ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-400">
              Powerful features designed for small business success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 hover:bg-slate-800/70 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-purple-400" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        data-section
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50 transition-all duration-700 ${
          visibleSections['how-it-works'] ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get Started in 3 Steps
            </h2>
            <p className="text-xl text-slate-400">
              Simple setup, immediate results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-purple-600 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section
        id="use-cases"
        data-section
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          visibleSections['use-cases'] ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real Conversations, Real Results
            </h2>
            <p className="text-xl text-slate-400">
              See how different businesses use SpeaklyAI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{useCase.emoji}</span>
                  <h3 className="text-xl font-semibold">{useCase.title}</h3>
                </div>
                <div className="space-y-3">
                  {useCase.transcript.map((line, lineIdx) => (
                    <div
                      key={lineIdx}
                      className={`text-sm rounded-lg p-2 ${
                        line.includes('AI:')
                          ? 'bg-purple-600/20 text-purple-200'
                          : 'bg-slate-700/30 text-slate-200'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        data-section
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50 transition-all duration-700 ${
          visibleSections['testimonials'] ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by Business Owners
            </h2>
            <p className="text-xl text-slate-400">
              See what our customers have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
              >
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-slate-300 mb-4">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        data-section
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          visibleSections['pricing'] ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-xl text-slate-400">
              One transparent plan, no hidden fees
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 rounded-2xl p-8">
              <div className="mb-8">
                <div className="text-4xl font-bold mb-2">$49</div>
                <p className="text-slate-400">/month</p>
              </div>

              <Link
                href="/signup"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2 mb-8"
              >
                <span>Start Your Free Trial</span>
                <ArrowRight size={20} />
              </Link>

              <div className="space-y-4">
                {pricingFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold mb-4">Enterprise Security & Compliance</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {complianceBadges.map((badge, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center text-sm font-medium"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600/20 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to transform your business?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join hundreds of small businesses using SpeaklyAI to handle more calls and grow faster.
          </p>
          <Link
            href="/signup"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
          >
            <span>Start Free Trial Today</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />

      {/* Animations */}
      <style>{`
        @keyframes soundwave {
          0%, 100% {
            height: 8px;
            opacity: 0.5;
          }
          50% {
            height: 32px;
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
