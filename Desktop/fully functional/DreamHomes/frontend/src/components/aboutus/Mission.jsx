import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

export default function MissionVision() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 font-bangla">
            আমাদের উদ্দেশ্য
          </span>
          <h2 className="font-bangla text-4xl md:text-5xl font-bold mt-4">
            স্বচ্ছতা, সরলতা আর মানবিক সহায়তা
          </h2>
          <p className="font-bangla text-gray-600 mt-4 max-w-3xl mx-auto">
            ডেটা, ডিজাইন ও হিউম্যান সাপোর্ট দিয়ে প্রপার্টি সার্চকে করি সহজ, স্বচ্ছ ও আনন্দময়—
            যাতে ঠিক ঠিক বাড়িটা খুঁজে পাওয়া যায় আত্মবিশ্বাসের সাথে।
          </p>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mt-8 rounded-full" />
        </motion.div>

        {/* Mission & Vision cards */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg ring-1 ring-black/5 hover:shadow-xl transition"
          >
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl" />
            <div className="flex items-center mb-6">
              <span className="mr-3 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 ring-1 ring-emerald-600/20">
                <Target className="w-6 h-6 text-emerald-600" />
              </span>
              <h3 className="font-bangla text-2xl font-bold">আমাদের মিশন</h3>
            </div>
            <p className="font-bangla text-gray-700 leading-relaxed">
              সবার জন্য স্বচ্ছ ও ঝামেলাহীন প্রপার্টি অভিজ্ঞতা তৈরি করা—শুরু থেকে চুক্তি পর্যন্ত।
              কিউরেটেড লিস্টিং, নির্ভুল তথ্য ও রিয়েল-টাইম সহায়তার মাধ্যমে আপনার
              স্বপ্নের বাড়ি খোঁজা করি দ্রুত, সহজ ও নিশ্চিন্ত।
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg ring-1 ring-black/5 hover:shadow-xl transition"
          >
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />
            <div className="flex items-center mb-6">
              <span className="mr-3 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 ring-1 ring-indigo-600/20">
                <Eye className="w-6 h-6 text-indigo-600" />
              </span>
              <h3 className="font-bangla text-2xl font-bold">আমাদের ভিশন</h3>
            </div>
            <p className="font-bangla text-gray-700 leading-relaxed">
              এমন একটি প্ল্যাটফর্ম গড়া যেখানে লক্ষ লক্ষ মানুষ সহজে, আস্থার সাথে এবং
              সম্পূর্ণ স্বচ্ছতায় তাদের নতুন বাড়ি ও প্রিয় কমিউনিটি খুঁজে পাবে—ডিজিটাল অভিজ্ঞতা হবে
              বাস্তব সহায়তার মতোই উষ্ণ ও মানবিক।
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
