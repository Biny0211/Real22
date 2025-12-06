import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { PricingPlans } from '@/entities';
import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  CreditCard, 
  Settings, 
  Download,
  Upload,
  HardDrive,
  Users,
  Crown,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

export default function AccountPage() {
  const { member } = useMember();
  const [plans, setPlans] = useState<PricingPlans[]>([]);
  const [currentPlan, setCurrentPlan] = useState<PricingPlans | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { items } = await BaseCrudService.getAll<PricingPlans>('pricingplans');
        setPlans(items);
        // For demo purposes, assume user is on the first plan (Free)
        if (items.length > 0) {
          setCurrentPlan(items[0]);
        }
      } catch (error) {
        console.error('Error fetching pricing plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const accountStats = [
    {
      icon: Upload,
      label: 'Files Uploaded',
      value: '1,247',
      change: '+12% this month'
    },
    {
      icon: Download,
      label: 'Downloads',
      value: '3,891',
      change: '+8% this month'
    },
    {
      icon: HardDrive,
      label: 'Storage Used',
      value: '2.4 GB',
      change: 'of 5 GB limit'
    },
    {
      icon: Shield,
      label: 'Security Score',
      value: '98%',
      change: 'Excellent'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="max-w-[120rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Account Dashboard
          </h1>
          <p className="text-lg text-secondary font-paragraph">
            Manage your ShareSplit account, subscription, and security settings.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 font-heading">
                    <User className="h-6 w-6 text-neon-teal" />
                    Profile Information
                  </CardTitle>
                  <CardDescription className="font-paragraph">
                    Your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    {member?.profile?.photo?.url ? (
                      <Image src={member.profile.photo.url} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-neon-teal to-primary rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-black" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-heading font-semibold">
                        {member?.profile?.nickname || 
                         `${member?.contact?.firstName || ''} ${member?.contact?.lastName || ''}`.trim() ||
                         'User'}
                      </h3>
                      <p className="text-secondary font-paragraph">
                        {member?.profile?.title || 'ShareSplit User'}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-secondary" />
                      <div>
                        <p className="font-paragraph text-sm text-secondary">Email</p>
                        <p className="font-paragraph">{member?.loginEmail || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-secondary" />
                      <div>
                        <p className="font-paragraph text-sm text-secondary">Member Since</p>
                        <p className="font-paragraph">{formatDate(member?._createdDate)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-neon-teal" />
                    <span className="font-paragraph">Email Verified</span>
                    <Badge variant={member?.loginEmailVerified ? "default" : "destructive"} className="ml-auto">
                      {member?.loginEmailVerified ? 'Verified' : 'Unverified'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Account Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-heading">Account Statistics</CardTitle>
                  <CardDescription className="font-paragraph">
                    Your usage and activity overview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {accountStats.map((stat, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-white/10">
                          <stat.icon className="h-6 w-6 text-neon-teal" />
                        </div>
                        <div>
                          <p className="font-paragraph text-sm text-secondary">{stat.label}</p>
                          <p className="text-2xl font-heading font-bold">{stat.value}</p>
                          <p className="font-paragraph text-xs text-secondary">{stat.change}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-heading">Quick Actions</CardTitle>
                  <CardDescription className="font-paragraph">
                    Common tasks and settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <Settings className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-paragraph font-semibold">Account Settings</p>
                        <p className="font-paragraph text-sm text-secondary">Update your preferences</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <Shield className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-paragraph font-semibold">Security Settings</p>
                        <p className="font-paragraph text-sm text-secondary">Manage your security</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <Download className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-paragraph font-semibold">Export Data</p>
                        <p className="font-paragraph text-sm text-secondary">Download your files</p>
                      </div>
                    </Button>
                    <Button asChild variant="outline" className="justify-start h-auto p-4">
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-5 w-5 mr-3" />
                        <div className="text-left">
                          <p className="font-paragraph font-semibold">Open ShareSplit App</p>
                          <p className="font-paragraph text-sm text-secondary">Access your files</p>
                        </div>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Subscription */}
          <div className="space-y-8">
            {/* Current Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 font-heading">
                    <Crown className="h-6 w-6 text-neon-teal" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-teal mx-auto"></div>
                    </div>
                  ) : currentPlan ? (
                    <>
                      <div className="text-center">
                        <h3 className="text-2xl font-heading font-bold mb-2">
                          {currentPlan.planName}
                        </h3>
                        <p className="text-secondary font-paragraph mb-4">
                          {currentPlan.description}
                        </p>
                        <div className="text-3xl font-heading font-bold text-neon-teal">
                          {currentPlan.monthlyPrice === 0 ? 'Free' : `$${currentPlan.monthlyPrice}/month`}
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-white/10">
                        {currentPlan.storageLimitGB && (
                          <div className="flex items-center justify-between">
                            <span className="font-paragraph text-sm">Storage</span>
                            <span className="font-paragraph text-sm">
                              {currentPlan.storageLimitGB === -1 ? 'Unlimited' : `${currentPlan.storageLimitGB}GB`}
                            </span>
                          </div>
                        )}
                        {currentPlan.userAccountsIncluded && (
                          <div className="flex items-center justify-between">
                            <span className="font-paragraph text-sm">Users</span>
                            <span className="font-paragraph text-sm">
                              {currentPlan.userAccountsIncluded === -1 ? 'Unlimited' : currentPlan.userAccountsIncluded}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="font-paragraph text-sm">Priority Support</span>
                          <span className="font-paragraph text-sm">
                            {currentPlan.prioritySupport ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>

                      <Button asChild className="w-full bg-primary hover:bg-primary/90">
                        <Link to="/pricing">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Manage Subscription
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-secondary font-paragraph">No plan information available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Upgrade Options */}
            {!loading && plans.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-primary/10 to-neon-teal/10 border-neon-teal/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-heading">Upgrade Your Plan</CardTitle>
                    <CardDescription className="font-paragraph">
                      Get more storage and features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {plans.slice(1, 3).map((plan) => (
                        <div key={plan._id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-heading font-semibold">{plan.planName}</h4>
                            <span className="font-heading font-bold text-neon-teal">
                              ${plan.monthlyPrice}/mo
                            </span>
                          </div>
                          <p className="font-paragraph text-sm text-secondary">
                            {plan.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full bg-neon-teal text-black hover:bg-neon-teal/90">
                      <Link to="/pricing">
                        View All Plans
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-heading">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-paragraph text-sm text-secondary">
                    Our support team is here to help you get the most out of ShareSplit.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Documentation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}