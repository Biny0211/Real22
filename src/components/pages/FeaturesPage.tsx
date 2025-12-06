import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { ProductFeatures } from '@/entities';
import { useState, useEffect } from 'react';
import { 
  Shield, 
  Cloud, 
  Lock, 
  Users, 
  Upload, 
  Download, 
  Key, 
  RefreshCw,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function FeaturesPage() {
  const [features, setFeatures] = useState<ProductFeatures[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const { items } = await BaseCrudService.getAll<ProductFeatures>('productfeatures');
        setFeatures(items);
      } catch (error) {
        console.error('Error fetching features:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const coreFeatures = [
    {
      icon: Upload,
      title: 'Seamless File Upload',
      description: 'Drag and drop files or browse to upload. Automatic encryption before transmission.',
      benefits: ['Batch upload support', 'Progress tracking', 'Resume interrupted uploads']
    },
    {
      icon: Download,
      title: 'Instant Recovery',
      description: 'Retrieve your files from any connected platform with a single click.',
      benefits: ['Fast download speeds', 'Integrity verification', 'Multiple format support']
    },
    {
      icon: Key,
      title: 'API Key Management',
      description: 'Securely store and manage API keys for all your cloud providers.',
      benefits: ['Encrypted key storage', 'Easy provider switching', 'Automatic authentication']
    },
    {
      icon: RefreshCw,
      title: 'Real-time Sync',
      description: 'Keep your data synchronized across all platforms automatically.',
      benefits: ['Conflict resolution', 'Version control', 'Selective sync options']
    }
  ];

  const securityFeatures = [
    {
      icon: Shield,
      title: 'End-to-End Encryption',
      description: 'Military-grade AES-256 encryption protects your data at every step.'
    },
    {
      icon: Lock,
      title: 'Zero-Knowledge Architecture',
      description: 'We never see your data - encryption happens on your device.'
    },
    {
      icon: Users,
      title: 'Distributed Storage',
      description: 'Files are split and stored across multiple platforms for redundancy.'
    }
  ];

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
            Powerful Features for
            <span className="block text-neon-teal">Secure Data Management</span>
          </motion.h1>
          <motion.p
            className="text-xl text-secondary font-paragraph max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover how ShareSplit revolutionizes data storage with cutting-edge security, 
            seamless integration, and unparalleled reliability.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/pricing">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-[120rem] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Core Functionality
            </h2>
            <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
              Everything you need to manage your data across multiple platforms with confidence.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <feature.icon className="h-16 w-16 text-neon-teal mb-6" />
                <h3 className="text-2xl font-heading font-bold mb-4">{feature.title}</h3>
                <p className="text-secondary font-paragraph mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-neon-teal flex-shrink-0" />
                      <span className="font-paragraph">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-[120rem] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Security First
            </h2>
            <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
              Your data security is our top priority. Every feature is designed with privacy and protection in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <feature.icon className="h-16 w-16 text-neon-teal mx-auto mb-6" />
                <h3 className="text-xl font-heading font-bold mb-4">{feature.title}</h3>
                <p className="text-secondary font-paragraph">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Database Features */}
      {!loading && features.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-[120rem] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Advanced Capabilities
              </h2>
              <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
                Explore the full range of features that make ShareSplit the ultimate data management solution.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature._id}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {feature.featureImage && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={feature.featureImage}
                        alt={feature.featureName || 'Feature image'}
                        width={300}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-heading font-semibold mb-3">
                    {feature.featureName}
                  </h3>
                  <p className="text-secondary font-paragraph mb-4">
                    {feature.shortDescription}
                  </p>
                  {feature.keyBenefit && (
                    <div className="flex items-center gap-2 text-neon-teal">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-paragraph text-sm">{feature.keyBenefit}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Platform Integration */}
      <section className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Universal Platform Support
              </h2>
              <p className="text-lg text-secondary font-paragraph mb-8">
                Connect with all major cloud providers and peer-to-peer networks through a single, 
                unified interface. No more juggling multiple apps and accounts.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  'Amazon S3',
                  'Google Drive',
                  'Microsoft Azure',
                  'Dropbox',
                  'IPFS Network',
                  'BitTorrent',
                  'Custom APIs',
                  'Local Storage'
                ].map((platform, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Cloud className="h-4 w-4 text-neon-teal" />
                    <span className="font-paragraph">{platform}</span>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="bg-neon-teal text-black hover:bg-neon-teal/90">
                <Link to="/login">Get Started</Link>
              </Button>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Image
                  src="https://static.wixstatic.com/media/a75130_796d48240b994dee997a1a724f43e795~mv2.png?originWidth=576&originHeight=448"
                  alt="Platform Integration Diagram"
                  width={600}
                  className="w-full rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Experience the Future of Data Storage
            </h2>
            <p className="text-lg text-secondary font-paragraph mb-8">
              Join thousands of users who have revolutionized their data management with ShareSplit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/pricing">
                  View Pricing Plans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-neon-teal text-neon-teal hover:bg-neon-teal hover:text-black">
                <Link to="/login">Start Free Trial</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}