import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Wallet, PhoneCall } from 'lucide-react';

/** ── EDIT ME ───────────────────────────────────────────── */
const BENEFITS = [
  { Icon: Home,       title: 'কিউরেটেড লিস্টিং',   desc: 'শুধু কোয়ালিটি প্রপার্টি—ফেক বা ডুপ্লিকেট নয়।' },
  { Icon: Building2,  title: 'ভেরিফাইড ডিটেইলস',   desc: 'ফটো, অ্যামেনিটি, ডকুমেন্ট—সবকিছু সত্যতা যাচাই।' },
  { Icon: Wallet,     title: 'ট্রান্সপারেন্ট প্রাইসিং', desc: 'স্মার্ট কম্প্যারিসন; কোনো হিডেন চার্জ নয়।' },
  { Icon: PhoneCall,  title: 'এন্ড-টু-এন্ড সাপোর্ট',  desc: 'সার্চ থেকে মুভ-ইন—প্রতিটি ধাপে পাশে।' },
];
/** ──────────────────────────────────────────────────────── */

export default function Benefits() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* soft vibrant blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-bangla text-4xl font-bold mb-3">কেন DreamHomes বেছে নেবেন?</h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-6 rounded-full"></div>
          <p className="font-bangla text-gray-600 text-lg max-w-2xl mx-auto">
            অভিজ্ঞতা, স্বচ্ছতা আর মানবিক সহায়তার সেরা সমন্বয়—আপনার বাড়ি খোঁজা হোক সহজ ও নির্ভরযোগ্য।
          </p>
        </motion.div>

        {/* cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map(({ Icon, title, desc }, index) => (
            <motion.div
              key={title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative bg-white p-7 rounded-2xl shadow-sm ring-1 ring-black/5 hover:shadow-lg transition"
            >
              {/* subtle glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition
                              bg-gradient-to-br from-emerald-500/5 via-transparent to-indigo-500/5" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-emerald-50 ring-1 ring-emerald-600/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bangla text-xl font-semibold">{title}</h3>
                <p className="font-bangla text-gray-700 leading-relaxed mt-2">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
