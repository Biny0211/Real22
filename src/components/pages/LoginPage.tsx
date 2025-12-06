import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Link, Navigate } from 'react-router-dom';
import { Shield, Lock, Cloud, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export default function LoginPage() {
  const { member, isAuthenticated, isLoading, actions } = useMember();

  // Redirect if already authenticated
  if (isAuthenticated && member) {
    return <Navigate to="/account" replace />;
  }

  const features = [
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Your account is protected with enterprise-grade security'
    },
    {
      icon: Lock,
      title: 'Encrypted Data',
      description: 'All your files are encrypted before they leave your device'
    },
    {
      icon: Cloud,
      title: 'Multi-Platform',
      description: 'Access your data from any device, anywhere'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex items-center justify-center p-8">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-teal to-primary rounded-lg flex items-center justify-center">
                  <span className="text-black font-heading font-bold text-xl">SS</span>
                </div>
                <span className="text-2xl font-heading font-bold">ShareSplit</span>
              </Link>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Welcome Back
              </h1>
              <p className="text-secondary font-paragraph">
                Sign in to access your secure data storage dashboard
              </p>
            </div>

            {/* Login Card */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-center mb-6">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-4">
                    <LoadingSpinner />
                    <p className="text-secondary font-paragraph">Checking authentication...</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-heading font-semibold mb-4">
                      Access Your Account
                    </h2>
                    <p className="text-secondary font-paragraph mb-6">
                      Click below to sign in securely with your Wix account
                    </p>
                    <Button
                      onClick={actions.login}
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 mb-4"
                    >
                      Sign In Securely
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>

              <div className="text-center">
                <p className="text-sm text-secondary font-paragraph">
                  New to ShareSplit?{' '}
                  <button
                    onClick={actions.login}
                    className="text-neon-teal hover:text-neon-teal/80 transition-colors"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 rounded-lg bg-neon-teal/10 border border-neon-teal/20">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-neon-teal flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-paragraph">
                    <span className="font-semibold">Secure Login:</span> We use industry-standard 
                    authentication to protect your account and data.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-8">
              <Link
                to="/"
                className="text-secondary hover:text-foreground transition-colors font-paragraph"
              >
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Features & Benefits */}
        <div className="bg-gradient-to-br from-gray-900 to-background p-8 flex items-center justify-center">
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Your Data,
              <span className="block text-neon-teal">Secured & Synchronized</span>
            </h2>
            <p className="text-lg text-secondary font-paragraph mb-8">
              Access your files from anywhere with military-grade encryption and 
              seamless multi-platform integration.
            </p>

            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <div className="p-2 rounded-lg bg-white/10">
                    <feature.icon className="h-6 w-6 text-neon-teal" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">{feature.title}</h3>
                    <p className="text-secondary font-paragraph text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="font-heading font-semibold mb-3">What you get:</h3>
              <ul className="space-y-2 text-sm font-paragraph">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-neon-teal rounded-full" />
                  Unlimited file uploads and downloads
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-neon-teal rounded-full" />
                  Real-time synchronization across platforms
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-neon-teal rounded-full" />
                  Advanced encryption and security features
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-neon-teal rounded-full" />
                  API access for custom integrations
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}