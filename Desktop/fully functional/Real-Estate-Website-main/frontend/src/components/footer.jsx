import { useState } from 'react';
import {
  Home,
  Twitter,
  Facebook,
  Instagram,
  Github,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Heart,
  Star,
  Zap,
  Clock,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

// Enhanced Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      duration: 0.6
    }
  }
};

const floatingAnimation = {
  y: [-2, 2, -2],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

const glowAnimation = {
  boxShadow: [
    '0 0 20px rgba(59, 130, 246, 0.3)',
    '0 0 40px rgba(59, 130, 246, 0.5)',
    '0 0 20px rgba(59, 130, 246, 0.3)'
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// Mobile Collapsible Footer Section
const MobileFooterSection = ({ title, children, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-gray-200/50 bg-white/50 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-blue-600" />}
          <h3 className="text-base font-bold text-gray-800">{title}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-gray-100">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Footer Column Component
const FooterColumn = ({ title, children, className = '', delay = 0, icon: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`${className} group`}
    >
      {title && (
        <div className="flex items-center gap-2 mb-6">
          {Icon && (
            <motion.div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg" animate={floatingAnimation}>
              <Icon className="w-4 h-4 text-white" />
            </motion.div>
          )}
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        </div>
      )}
      {children}
    </motion.div>
  );
};

// Footer Link Component
const FooterLink = ({ href, children, icon: Icon }) => {
  return (
    <motion.a
      href={href}
      className="group flex items-center text-gray-600 transition-all duration-300 hover:text-blue-600 hover:translate-x-2 py-2 relative overflow-hidden"
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
      <div className="relative z-10 flex items-center">
        {Icon && <Icon className="w-4 h-4 mr-3 text-blue-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />}
        <ChevronRight className="w-3 h-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
        <span className="font-medium">{children}</span>
      </div>
    </motion.a>
  );
};

// Social Links (your links)
const socialLinks = [
  {
    icon: Twitter,
    href: 'https://x.com/Xtylishfahim',
    label: 'Twitter / X',
    color: 'from-[#1DA1F2] to-[#0d8bd9]',
    hoverColor: 'hover:shadow-[#1DA1F2]/25'
  },
  {
    icon: Facebook,
    href: 'https://www.facebook.com/khairulislambhuiya179',
    label: 'Facebook',
    color: 'from-[#1877F2] to-[#0d65d9]',
    hoverColor: 'hover:shadow-[#1877F2]/25'
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/_point__break__/',
    label: 'Instagram',
    color: 'from-[#fd5949] via-[#d6249f] to-[#285AEB]',
    hoverColor: 'hover:shadow-pink-500/25'
  },
  {
    icon: Github,
    href: 'https://github.com/dashboard',
    label: 'GitHub',
    color: 'from-gray-800 to-gray-600',
    hoverColor: 'hover:shadow-gray-800/25'
  }
];

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-4 mt-8">
      <span className="text-sm text-gray-600 font-medium">ফলো করুন:</span>
      <div className="flex gap-3">
        {socialLinks.map(({ icon: Icon, href, label, color, hoverColor }) => (
          <motion.a
            key={label}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href={href}
            title={label}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center text-white bg-gradient-to-br ${color} ${hoverColor} rounded-xl w-11 h-11 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Icon className="w-5 h-5 relative z-10" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

// Main Footer (links + contact localized)
const companyLinks = [
  { name: 'হোম', href: '/', icon: Home },
  { name: 'প্রপার্টিজ', href: '/properties', icon: MapPin },
  { name: 'আমাদের সম্পর্কে', href: '/about', icon: Star },
  { name: 'যোগাযোগ', href: '/contact', icon: Mail },
  { name: 'এআই প্রপার্টি হাব', href: '/ai-agent', icon: Zap }
];

const helpLinks = [
  { name: 'কাস্টমার সাপোর্ট', href: '/', icon: Heart },
  { name: 'প্রশ্নোত্তর (FAQ)', href: '/', icon: Sparkles },
  { name: 'শর্তাবলী', href: '/', icon: Shield },
  { name: 'গোপনীয়তা নীতি', href: '/', icon: Clock }
];

// Contact info updated to Bangladesh
const contactInfo = [
  {
    icon: MapPin,
    text: 'মেরুল বদ্দা, ঢাকা ১২১২, বাংলাদেশ',
    href: 'https://maps.app.goo.gl/SCRSCV1sHaaMMU7B8'
  },
  {
    icon: Phone,
    text: '01615-134455',
    href: 'tel:+8801615134455'
  },
  {
    icon: Mail,
    text: 'khairul.islam.bhuiya@g.bracu.ac.bd',
    href: 'mailto:khairul.islam.bhuiya@g.bracu.ac.bd'
  }
];

const Footer = () => {
  return (
    <footer className="relative">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>

      {/* Main Footer */}
      <div className="relative pt-16 lg:pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <motion.div
            className="text-center lg:text-left mb-16"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <motion.div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg" animate={glowAnimation}>
                <Home className="h-8 w-8 text-white" />
              </motion.div>
              <div className="ml-4">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  DreamHomes
                </span>
                <p className="text-sm text-gray-500 font-medium">Premium Real Estate</p>
              </div>
            </div>

            <motion.p
              className="text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              আপনার স্বপ্নের বাড়ি খুঁজে পাওয়ার বিশ্বস্ত সঙ্গী। আধুনিক প্রযুক্তি ও ব্যক্তিগতকৃত সার্ভিসের মাধ্যমে
              আমরা প্রপার্টি খোঁজাকে করি দ্রুত, সহজ ও নির্ভুল।
            </motion.p>

            <div className="flex justify-center lg:justify-start">
              <SocialLinks />
            </div>
          </motion.div>

          {/* Desktop columns (3 columns, full width) */}
          <div className="hidden lg:grid grid-cols-12 gap-8 mb-12">
            <FooterColumn title="দ্রুত লিঙ্ক" className="col-span-4" delay={0.2} icon={Home}>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href} icon={link.icon}>
                      {link.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="সহায়তা" className="col-span-4" delay={0.3} icon={Heart}>
              <ul className="space-y-3">
                {helpLinks.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href} icon={link.icon}>
                      {link.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="যোগাযোগ" className="col-span-4" delay={0.4} icon={MapPin}>
              <ul className="space-y-4">
                {contactInfo.map((item, index) => (
                  <li key={index}>
                    <motion.a
                      href={item.href}
                      className="group flex items-start text-gray-600 hover:text-blue-600 transition-all duration-300 p-3 rounded-xl hover:bg-blue-50"
                      target={item.icon === MapPin ? '_blank' : undefined}
                      rel={item.icon === MapPin ? 'noopener noreferrer' : undefined}
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-2 bg-blue-100 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                        <item.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium leading-relaxed">{item.text}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>

          {/* Mobile Accordions (no newsletter) */}
          <motion.div className="lg:hidden space-y-4 mb-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <MobileFooterSection title="দ্রুত লিঙ্ক" icon={Home}>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href} icon={link.icon}>
                      {link.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </MobileFooterSection>

            <MobileFooterSection title="সহায়তা" icon={Heart}>
              <ul className="space-y-2">
                {helpLinks.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href} icon={link.icon}>
                      {link.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </MobileFooterSection>

            <MobileFooterSection title="যোগাযোগ" icon={MapPin}>
              <ul className="space-y-3">
                {contactInfo.map((item, index) => (
                  <li key={index}>
                    <motion.a
                      href={item.href}
                      className="flex items-start text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50"
                      target={item.icon === MapPin ? '_blank' : undefined}
                      rel={item.icon === MapPin ? 'noopener noreferrer' : undefined}
                    >
                      <item.icon className="w-4 h-4 mt-1 mr-3 flex-shrink-0 text-blue-500" />
                      <span className="text-sm">{item.text}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </MobileFooterSection>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 border-t border-gray-700/50">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p
              className="text-sm text-gray-300 text-center md:text-left flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span>© {new Date().getFullYear()} DreamHomes — সর্বস্বত্ব সংরক্ষিত।</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-gray-400">ভালোবাসা দিয়ে তৈরি</span>
            </motion.p>

            <motion.a
              href="/properties"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              প্রপার্টি দেখুন
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.elementType
};

MobileFooterSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType
};

FooterColumn.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  icon: PropTypes.elementType
};

FooterLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType
};

export default Footer;
