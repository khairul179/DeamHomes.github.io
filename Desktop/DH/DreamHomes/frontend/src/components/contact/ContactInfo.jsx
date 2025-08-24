import React from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Github,
  Twitter
} from 'lucide-react';
import ContactInfoItem from './InfoItem';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: '01615-134455',
    link: 'tel:+8801615134455'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'KHAIRUL.islam.bhuiya@g.bracu.ac.bd',
    link: 'mailto:KHAIRUL.islam.bhuiya@g.bracu.ac.bd'
  },
  {
    icon: MapPin,
    title: 'Address',
    content: 'Merul Badda, Dhaka 1212, Bangladesh',
    // If you want this to open maps, keep the link below:
    link: 'https://www.google.com/maps/search/?api=1&query=Merul+Badda+Dhaka+1212+Bangladesh'
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'Sat–Thu: 10:00 AM – 7:00 PM'
  }
];

const socialLinks = [
  {
    icon: Facebook,
    title: 'Facebook',
    content: 'facebook.com/KHAIRULislambhuiya179',
    link: 'https://www.facebook.com/KHAIRULislambhuiya179'
  },
  {
    icon: Instagram,
    title: 'Instagram',
    content: 'instagram.com/_point__break__/',
    link: 'https://www.instagram.com/_point__break__/'
  },
  {
    icon: Github,
    title: 'GitHub',
    content: 'github.com/dashboard',
    link: 'https://github.com/dashboard'
  },
  {
    icon: Twitter,
    title: 'Twitter (X)',
    content: 'x.com/Xtylishfahim',
    link: 'https://x.com/Xtylishfahim'
  }
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-2xl shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-8">Our Office</h2>

      <div className="space-y-6 mb-10">
        {contactInfo.map((info, index) => (
          <ContactInfoItem key={index} {...info} />
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-4">Connect Online</h3>
      <div className="space-y-6">
        {socialLinks.map((info, index) => (
          <ContactInfoItem key={`social-${index}`} {...info} />
        ))}
      </div>
    </motion.div>
  );
}
