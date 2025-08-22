import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Github, Twitter } from "lucide-react";
import khairulPhoto from "@/assets/images/khairul.jpg"; // ← put file at src/assets/images/khairul.jpg
// If your file is at src/assets/khairul.jpg instead, use:
// import khairulPhoto from "@/assets/khairul.jpg";

export default function Team() {
  const socials = [
    { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/khairulislambhuiya179" },
    { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/_point__break__/" },
    { Icon: Github, label: "GitHub", href: "https://github.com/dashboard" },
    { Icon: Twitter, label: "X", href: "https://x.com/Xtylishfahim" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            It’s just me for now—say hi! 👋
          </p>
        </motion.div>

        {/* Single profile card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-blue-100">
              <img
                src={khairulPhoto}
                alt="Khairul Islam Bhuiya"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Photo not found at:", khairulPhoto);
                  e.currentTarget.src = "https://via.placeholder.com/256";
                }}
              />
            </div>

            <h3 className="text-xl font-semibold">Khairul Islam Bhuiya</h3>
            <p className="text-blue-600 text-sm mt-1">Developer & Founder</p>

            <p className="text-gray-600 mt-4 leading-relaxed">
              I build clean, performant web apps with a focus on great UX.
              Based in Merul Badda, Dhaka—available for full-time roles and freelance projects.
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition"
                  aria-label={label}
                  title={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-500 space-y-1">
              <p>
                Email:{" "}
                <a
                  href="mailto:khairul.islam.bhuiya@g.bracu.ac.bd"
                  className="text-blue-600 hover:underline"
                >
                  khairul.islam.bhuiya@g.bracu.ac.bd
                </a>
              </p>
              <p>Phone: 01615-134455</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
