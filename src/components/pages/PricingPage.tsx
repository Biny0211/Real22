import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { PricingPlans } from '@/entities';
import { useState, useEffect } from 'react';
import { Check, Star, ArrowRight, Zap } from 'lucide-react';

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlans[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { items } = await BaseCrudService.getAll<PricingPlans>('pricingplans');
        setPlans(items);
      } catch (error) {
        console.error('Error fetching pricing plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const formatPrice = (plan: PricingPlans) => {
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    if (price === 0) return 'Free';
    return `$${price}`;
  };

  const getAnnualSavings = (plan: PricingPlans) => {
    if (!plan.monthlyPrice || !plan.annualPrice) return 0;
    const monthlyTotal = plan.monthlyPrice * 12;
    const savings = monthlyTotal - plan.annualPrice;
    return Math.round((savings / monthlyTotal) * 100);
  };

  const getPlanIcon = (planName: string) => {
    const name = planName?.toLowerCase() || '';
    if (name.includes('free')) return Check;
    if (name.includes('basic')) return Zap;
    if (name.includes('business')) return Star;
    return Check;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-background">
        <div className="max-w-[120rem] mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-heading font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Simple, Transparent
            <span className="block text-neon-teal">Pricing</span>
          </motion.h1>
          <motion.p
            className="text-xl text-secondary font-paragraph max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Choose the perfect plan for your data storage needs. Start free and scale as you grow.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className={`font-paragraph ${!isAnnual ? 'text-foreground' : 'text-secondary'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isAnnual ? 'bg-neon-teal' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  isAnnual ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-paragraph ${isAnnual ? 'text-foreground' : 'text-secondary'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-neon-teal text-black px-2 py-1 rounded-full text-sm font-paragraph font-semibold">
                Save up to 20%
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-6">
        <div className="max-w-[120rem] mx-auto">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-teal mx-auto"></div>
              <p className="mt-4 text-secondary font-paragraph">Loading pricing plans...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => {
                const IconComponent = getPlanIcon(plan.planName || '');
                const savings = getAnnualSavings(plan);
                
                return (
                  <motion.div
                    key={plan._id}
                    className={`relative p-8 rounded-2xl border backdrop-blur-sm ${
                      plan.isRecommended
                        ? 'bg-white/10 border-neon-teal shadow-lg shadow-neon-teal/20'
                        : 'bg-white/5 border-white/10'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {plan.isRecommended && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-neon-teal text-black px-4 py-2 rounded-full text-sm font-paragraph font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <IconComponent className={`h-12 w-12 mx-auto mb-4 ${
                        plan.isRecommended ? 'text-neon-teal' : 'text-primary'
                      }`} />
                      <h3 className="text-2xl font-heading font-bold mb-2">
                        {plan.planName}
                      </h3>
                      <p className="text-secondary font-paragraph mb-4">
                        {plan.description}
                      </p>
                      
                      <div className="mb-4">
                        <span className="text-4xl font-heading font-bold">
                          {formatPrice(plan)}
                        </span>
                        {plan.monthlyPrice !== 0 && (
                          <span className="text-secondary font-paragraph">
                            /{isAnnual ? 'year' : 'month'}
                          </span>
                        )}
                      </div>

                      {isAnnual && savings > 0 && (
                        <p className="text-neon-teal text-sm font-paragraph">
                          Save {savings}% with annual billing
                        </p>
                      )}
                    </div>

                    <div className="space-y-4 mb-8">
                      {plan.storageLimitGB && (
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-neon-teal flex-shrink-0" />
                          <span className="font-paragraph">
                            {plan.storageLimitGB === -1 ? 'Unlimited' : `${plan.storageLimitGB}GB`} storage
                          </span>
                        </div>
                      )}
                      
                      {plan.userAccountsIncluded && (
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-neon-teal flex-shrink-0" />
                          <span className="font-paragraph">
                            {plan.userAccountsIncluded === -1 ? 'Unlimited' : plan.userAccountsIncluded} user accounts
                          </span>
                        </div>
                      )}

                      {plan.prioritySupport && (
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-neon-teal flex-shrink-0" />
                          <span className="font-paragraph">Priority support</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-neon-teal flex-shrink-0" />
                        <span className="font-paragraph">End-to-end encryption</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-neon-teal flex-shrink-0" />
                        <span className="font-paragraph">Multi-platform sync</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-neon-teal flex-shrink-0" />
                        <span className="font-paragraph">API access</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      className={`w-full ${
                        plan.isRecommended
                          ? 'bg-neon-teal text-black hover:bg-neon-teal/90'
                          : 'bg-primary hover:bg-primary/90'
                      }`}
                    >
                      <Link to={plan.ctaUrl || '/login'}>
                        {plan.monthlyPrice === 0 ? 'Start Free' : 'Get Started'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-[120rem] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              All Plans Include
            </h2>
            <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
              Every ShareSplit plan comes with our core security and functionality features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Military-Grade Encryption',
                description: 'AES-256 encryption for all your data'
              },
              {
                title: 'Zero-Knowledge Architecture',
                description: 'We never see your unencrypted data'
              },
              {
                title: 'Multi-Platform Support',
                description: 'Connect to all major cloud providers'
              },
              {
                title: 'Automatic Backups',
                description: 'Your data is always protected'
              },
              {
                title: 'File Versioning',
                description: 'Keep track of file changes over time'
              },
              {
                title: 'Cross-Device Sync',
                description: 'Access your files from anywhere'
              },
              {
                title: 'API Integration',
                description: 'Programmatic access to your data'
              },
              {
                title: '24/7 Monitoring',
                description: 'Continuous system health checks'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Check className="h-8 w-8 text-neon-teal mx-auto mb-4" />
                <h3 className="font-heading font-semibold mb-2">{feature.title}</h3>
                <p className="text-secondary font-paragraph text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                question: 'Can I change my plan at any time?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.'
              },
              {
                question: 'What happens to my data if I cancel?',
                answer: 'Your data remains accessible for 30 days after cancellation. You can export all your files during this period.'
              },
              {
                question: 'Do you offer refunds?',
                answer: 'We offer a 30-day money-back guarantee for all paid plans. No questions asked.'
              },
              {
                question: 'How secure is my data?',
                answer: 'We use military-grade AES-256 encryption and a zero-knowledge architecture. We never have access to your unencrypted data.'
              },
              {
                question: 'Can I use my own cloud storage accounts?',
                answer: 'Yes, ShareSplit connects to your existing cloud storage accounts using API keys that you provide and control.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-heading font-semibold mb-3">{faq.question}</h3>
                <p className="text-secondary font-paragraph">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-primary/20 to-neon-teal/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Ready to Secure Your Data?
            </h2>
            <p className="text-lg text-secondary font-paragraph mb-8">
              Start with our free plan and experience the future of data storage today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-neon-teal text-black hover:bg-neon-teal/90">
                <Link to="/login">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Link to="/features">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}