import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  HeartHandshake,
  Sparkles,
  Map,
  Gauge,
  Users
} from 'lucide-react';

/** ── EDIT ME: change text anytime ───────────────────────────────── */
const VALUES = [
  {
    Icon: HeartHandshake,
    title: 'ভরসা',
    desc: 'সৎ লিস্টিং, পরিষ্কার প্রতিশ্রুতি—আপনার সিদ্ধান্তে আমাদের দায়বদ্ধতা সর্বদা।',
  },
  {
    Icon: Shield,
    title: 'নিরাপত্তা',
    desc: 'মালিক/টেন্যান্ট যাচাই, ডাটা গোপনীয়তা ও সুরক্ষা—সবচেয়ে আগে।',
  },
  {
    Icon: Sparkles,
    title: 'অভিজ্ঞতা (UX)',
    desc: 'ফাস্ট, ফ্রেন্ডলি ও অ্যাক্সেসিবল—প্রতিটি ধাপে মসৃণ ব্যবহার।',
  },
  {
    Icon: Map,
    title: 'লোকাল ইনসাইট',
    desc: 'এলাকার বাস্তব কনটেক্সট, সুবিধা-অসুবিধা ও লাইফস্টাইল তথ্য একসাথে।',
  },
  {
    Icon: Gauge,
    title: 'পারফরম্যান্স',
    desc: 'দ্রুত সার্চ, স্মার্ট ফিল্টার ও রিয়েল-টাইম আপডেট—সময় বাঁচে, সিদ্ধান্ত সহজ হয়।',
  },
  {
    Icon: Users,
    title: 'মানুষের পাশে',
    desc: 'চ্যাট/কল সাপোর্ট—প্রয়োজনে রিয়েল হিউম্যান সহায়তা আপনার পাশে।',
  },
];
/** ──────────────────────────────────────────────────────────────── */

export default function Values() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* soft background accents */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 font-bangla">
            আমাদের মূল্যবোধ
          </span>
          <h2 className="font-bangla text-4xl md:text-5xl font-bold mt-4">
            আস্থা, স্বচ্ছতা আর দারুণ অভিজ্ঞতা—সব একসাথে
          </h2>
          <p className="font-bangla text-gray-600 max-w-2xl mx-auto text-lg mt-4">
            DreamHomes-এ প্রতিটি সিদ্ধান্তের কেন্দ্রে থাকে ব্যবহারকারী—আপনার প্রয়োজন, নিরাপত্তা ও স্বাচ্ছন্দ্য।
          </p>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mt-8 rounded-full" />
        </motion.div>

        {/* cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative bg-white p-7 rounded-2xl shadow-sm ring-1 ring-black/5 hover:shadow-lg transition"
            >
              {/* glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition
                              bg-gradient-to-br from-emerald-500/5 via-transparent to-indigo-500/5" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-emerald-50 ring-1 ring-emerald-600/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bangla text-xl font-semibold mt-4">{title}</h3>
                <p className="font-bangla text-gray-700 leading-relaxed mt-2">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
