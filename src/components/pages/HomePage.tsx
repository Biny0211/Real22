import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Cloud, Lock, Users, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  // Generate random positions for data points
  const dataPoints = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 10,
    duration: 5 + Math.random() * 10,
    yPosition: Math.random() * 100,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section - The Interactive Data Stream */}
      <section className="relative h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* Animated Data Stream */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {dataPoints.map((point) => (
            <motion.div
              key={point.id}
              className="absolute w-2 h-2 bg-neon-teal rounded-full opacity-60"
              initial={{ x: '-100vw', y: `${point.yPosition}vh` }}
              animate={{ x: '100vw' }}
              transition={{
                duration: point.duration,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
                delay: point.delay,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <motion.h1
            className="text-6xl md:text-8xl font-heading font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ShareSplit
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 font-paragraph"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Secure Data Storage Across Multiple Platforms
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/features">
                Explore Features
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-neon-teal text-neon-teal hover:bg-neon-teal hover:text-black">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 px-6 max-w-[120rem] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Unified Data Management
          </h2>
          <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
            ShareSplit revolutionizes how you store and recover data by providing a single interface 
            to manage files across multiple cloud providers and peer-to-peer networks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Shield,
              title: 'Military-Grade Security',
              description: 'Advanced encryption protects your data at every level'
            },
            {
              icon: Cloud,
              title: 'Multi-Platform Support',
              description: 'Seamlessly integrate with all major cloud providers'
            },
            {
              icon: Lock,
              title: 'Encrypted Storage',
              description: 'Your files are encrypted before leaving your device'
            },
            {
              icon: Users,
              title: 'Peer-to-Peer Network',
              description: 'Distributed storage for maximum redundancy'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <feature.icon className="h-12 w-12 text-neon-teal mb-4" />
              <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
              <p className="text-secondary font-paragraph">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Showcase Section */}
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
                One Interface,<br />
                <span className="text-neon-teal">Infinite Possibilities</span>
              </h2>
              <p className="text-lg text-secondary font-paragraph mb-8">
                Upload, download, and delete files across multiple platforms using a single, 
                intuitive interface. ShareSplit handles the complexity while you focus on your data.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'API key management for cloud providers',
                  'Automatic file encryption and splitting',
                  'Real-time synchronization across platforms',
                  'Comprehensive recovery options'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-neon-teal rounded-full" />
                    <span className="font-paragraph">{feature}</span>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/features">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
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
                  src="https://static.wixstatic.com/media/a75130_4092c4341b724b578c22284ff7637c2e~mv2.png?originWidth=576&originHeight=448"
                  alt="ShareSplit Dashboard Interface"
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
              Ready to Secure Your Data?
            </h2>
            <p className="text-lg text-secondary font-paragraph mb-8">
              Join thousands of users who trust ShareSplit with their most important files.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-neon-teal text-black hover:bg-neon-teal/90">
                <Link to="/login">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}