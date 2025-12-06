import { useMember } from '@/integrations';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const publicNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const authenticatedNavigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Files', href: '/files' },
    { name: 'Storages', href: '/storages' },
    { name: 'Devices', href: '/devices' },
    { name: 'Board', href: '/board' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <nav className="max-w-[120rem] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-teal to-primary rounded-lg flex items-center justify-center">
                <span className="text-black font-heading font-bold text-lg">SS</span>
              </div>
              <span className="text-xl font-heading font-bold">ShareSplit</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {publicNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-paragraph transition-colors ${
                    isActive(item.href)
                      ? 'text-neon-teal'
                      : 'text-foreground hover:text-neon-teal'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Authenticated Navigation */}
              {isAuthenticated && (
                <>
                  <div className="w-px h-6 bg-white/10"></div>
                  {authenticatedNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`font-paragraph transition-colors ${
                        isActive(item.href)
                          ? 'text-neon-teal'
                          : 'text-foreground hover:text-neon-teal'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </>
              )}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center gap-4">
              {isLoading && <LoadingSpinner />}
              {!isAuthenticated && !isLoading && (
                <Button onClick={actions.login} className="bg-primary hover:bg-primary/90">
                  Sign In
                </Button>
              )}
              {isAuthenticated && (
                <div className="flex items-center gap-4">
                  <Link
                    to="/account"
                    className="flex items-center gap-2 text-foreground hover:text-neon-teal transition-colors"
                  >
                    <User className="h-4 w-4" />
                    {member?.profile?.nickname || member?.contact?.firstName || 'Account'}
                  </Link>
                  <Button
                    onClick={actions.logout}
                    variant="outline"
                    size="sm"
                    className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-white/10"
              >
                <div className="flex flex-col gap-4 pt-4">
                  {publicNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`font-paragraph transition-colors ${
                        isActive(item.href)
                          ? 'text-neon-teal'
                          : 'text-foreground hover:text-neon-teal'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Mobile Authenticated Navigation */}
                  {isAuthenticated && (
                    <>
                      <div className="border-t border-white/10 my-2"></div>
                      {authenticatedNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`font-paragraph transition-colors ${
                            isActive(item.href)
                              ? 'text-neon-teal'
                              : 'text-foreground hover:text-neon-teal'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </>
                  )}
                  
                  {/* Mobile Auth */}
                  <div className="pt-4 border-t border-white/10">
                    {isLoading && <LoadingSpinner />}
                    {!isAuthenticated && !isLoading && (
                      <Button 
                        onClick={() => {
                          actions.login();
                          setIsMobileMenuOpen(false);
                        }} 
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        Sign In
                      </Button>
                    )}
                    {isAuthenticated && (
                      <div className="flex flex-col gap-2">
                        <Link
                          to="/account"
                          className="flex items-center gap-2 text-foreground hover:text-neon-teal transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          {member?.profile?.nickname || member?.contact?.firstName || 'Account'}
                        </Link>
                        <Button
                          onClick={() => {
                            actions.logout();
                            setIsMobileMenuOpen(false);
                          }}
                          variant="outline"
                          size="sm"
                          className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-white/10 py-16">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-neon-teal to-primary rounded-lg flex items-center justify-center">
                  <span className="text-black font-heading font-bold text-lg">SS</span>
                </div>
                <span className="text-xl font-heading font-bold">ShareSplit</span>
              </div>
              <p className="text-secondary font-paragraph max-w-md">
                Secure data storage and recovery across multiple platforms. 
                Your files, encrypted and distributed for maximum security.
              </p>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <Link to="/features" className="block text-secondary hover:text-neon-teal transition-colors font-paragraph">
                  Features
                </Link>
                <Link to="/pricing" className="block text-secondary hover:text-neon-teal transition-colors font-paragraph">
                  Pricing
                </Link>
                <Link to="/login" className="block text-secondary hover:text-neon-teal transition-colors font-paragraph">
                  Login
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="block text-secondary hover:text-neon-teal transition-colors font-paragraph">
                  About
                </a>
                <a href="#" className="block text-secondary hover:text-neon-teal transition-colors font-paragraph">
                  Privacy
                </a>
                <a href="#" className="block text-secondary hover:text-neon-teal transition-colors font-paragraph">
                  Terms
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-secondary font-paragraph">
              © 2024 ShareSplit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
