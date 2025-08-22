import React from 'react';
import { motion } from 'framer-motion';
import { Home, Target, Building2, Shield } from 'lucide-react';
import CountUp from './Contup';

/** ── EDIT ME ───────────────────────────────────────────── */
const STATS = [
  { Icon: Home,      title: 'তালিকাভুক্ত প্রপার্টি', value: 5000,  desc: 'প্রতিদিন বাড়ছে' },
  { Icon: Target,    title: 'সন্তুষ্ট ক্লায়েন্ট',    value: 10000, desc: 'বিশ্বাসের পদচিহ্ন' },
  { Icon: Building2, title: 'পার্টনার এজেন্সি',      value: 120,   desc: 'দেশজুড়ে নেটওয়ার্ক' },
  { Icon: Shield,    title: 'ভেরিফায়েড লিস্টিং',    value: 98,    desc: 'গুণগত মান, % ভিত্তিক' }, // shows 98%
];
/** ──────────────────────────────────────────────────────── */

export default function Milestones() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
          <h2 className="font-bangla text-4xl font-bold mb-3">আমাদের পথচলা</h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-6 rounded-full" />
          <p className="font-bangla text-gray-600 text-lg max-w-2xl mx-auto">
            যে মাইলস্টোনে তৈরি হয়েছে আস্থা—ডেটা, ডিজাইন ও মানবিক সহায়তার সমন্বয়ে।
          </p>
        </motion.div>

        {/* stats cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {STATS.map(({ Icon, title, value, desc }, index) => (
            <motion.div
              key={title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative bg-white p-8 rounded-2xl shadow-sm ring-1 ring-black/5 hover:shadow-lg transition"
            >
              {/* subtle glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition
                              bg-gradient-to-br from-emerald-500/5 via-transparent to-indigo-500/5" />
              <div className="relative text-center">
                <div className="w-20 h-20 rounded-2xl bg-emerald-50 ring-1 ring-emerald-600/20 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-9 h-9 text-emerald-600" />
                </div>

                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl font-bold text-emerald-700">
                    <CountUp from={0} to={value} duration={2} separator="," />
                  </span>
                  {/* show % only for the last card */}
                  {title === 'ভেরিফায়েড লিস্টিং' && <span className="text-2xl font-bold text-emerald-700">%</span>}
                  {/* plus sign for big counts */}
                  {title !== 'ভেরিফায়েড লিস্টিং' && <span className="text-2xl font-bold text-emerald-700">+</span>}
                </div>

                <h3 className="font-bangla text-xl font-semibold">{title}</h3>
                <p className="font-bangla text-gray-700 mt-1">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
