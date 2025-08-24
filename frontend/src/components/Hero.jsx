// frontend/src/components/Hero.jsx
import { useState } from "react";
import {
  Search,
  MapPin,
  ArrowRight,
  Star,
  Users,
  Home,
  Shield,
  Sparkles,
  TrendingUp,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroimage from "../assets/images/heroimage.png";

const popularLocations = [
  "Bogura",
  "Nilphamari",
  "Banani, Dhaka",
  "Rangpur",
  "Dinajpur",
  "Rajshahi",
];

const quickFilters = [
  { label: "Apartments", icon: Home, count: "2.5k+" },
  { label: "Houses", icon: Home, count: "1.8k+" },
  { label: "Villas", icon: Home, count: "750+" },
  { label: "Studios", icon: Home, count: "1.2k+" },
];

const stats = [
  { icon: Users, value: "50K+", label: "Happy Customers", color: "from-blue-500 to-cyan-500" },
  { icon: Home, value: "25K+", label: "Properties Listed", color: "from-green-500 to-emerald-500" },
  { icon: Star, value: "4.9", label: "Average Rating", color: "from-yellow-500 to-orange-500" },
  { icon: Shield, value: "100%", label: "Verified Properties", color: "from-purple-500 to-pink-500" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.6 } },
};
const floatingAnimation = { y: [-10, 10, -10], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } };
const sparkleAnimation = { scale: [1, 1.2, 1], rotate: [0, 180, 360], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } };

export default function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [propertyType, setPropertyType] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSubmit = (location = searchQuery) => {
    if (location.trim()) {
      navigate(`/properties?location=${encodeURIComponent(location)}&type=${propertyType}`);
    }
  };

  const handleLocationClick = (location) => {
    setSearchQuery(location);
    setShowSuggestions(false);
    handleSubmit(location);
  };

  const isSuggesting = showSuggestions && searchQuery.length === 0;

  return (
    <div className="relative min-h-[92vh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50" />
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-transparent to-purple-900/5" />
        </motion.div>

        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden xl:block">
          <motion.div
            className="absolute top-24 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl"
            animate={floatingAnimation}
          />
          <motion.div
            className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-br from-purple-400/12 to-pink-400/12 rounded-full blur-3xl"
            animate={{ y: [10, -10, 10], transition: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"
            animate={{ y: [-15, 15, -15], x: [-10, 10, -10], transition: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
          />
        </div>

        <div className="absolute inset-0 pointer-events-none hidden xl:block">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={sparkleAnimation}
              transition={{ delay: i * 0.5 }}
              className={`absolute w-6 h-6 text-yellow-400/50 ${
                i % 2 === 0 ? "top-1/4" : "top-3/4"
              } ${i % 3 === 0 ? "left-1/4" : i % 3 === 1 ? "left-1/2" : "left-3/4"}`}
            >
              <Sparkles className="w-full h-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 isolate min-h-[92vh] flex flex-col">
        <div className="pt-36 lg:pt-44" />
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center space-y-8">
              {/* Trust Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-md text-blue-700 rounded-full text-sm font-semibold shadow border border-blue-100"
              >
                <Shield className="w-4 h-4" />
                <span>Trusted by 50,000+ families</span>
                <div className="flex items-center gap-1" aria-label="rating 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>

              {/* Heading */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                  <span className="bg-[radial-gradient(circle_at_30%_20%,#3f5efb,transparent_35%),radial-gradient(circle_at_70%_60%,#fc466b,transparent_40%)] bg-clip-text text-transparent">
                    BRAC পরিবারের সাথে খুঁজে নিন
                  </span>
                  <br />
                  <span className="text-gray-900 bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent">
                    আপনার স্বপ্নের ঠিকানা
                  </span>
                </h1>

                <motion.p
                  variants={itemVariants}
                  className="text-gray-700 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-medium"
                >
                  Discover exceptional properties across Bangladesh with our
                  <span className="text-blue-600 font-semibold"> AI-powered search</span> and
                  <span className="text-purple-600 font-semibold"> expert guidance</span>.
                </motion.p>
              </motion.div>

              {/* Search panel */}
              <motion.div variants={itemVariants} className="relative z-30 max-w-4xl mx-auto">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-7 md:p-8 shadow-2xl border border-white/50">
                  {/* Quick type chips */}
                  <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-7">
                    {quickFilters.map((filter) => (
                      <motion.button
                        key={filter.label}
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPropertyType(filter.label)}
                        className={`px-6 py-2.5 md:py-3 rounded-2xl font-semibold text-sm transition-all flex items-center gap-2 ${
                          propertyType === filter.label
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        aria-pressed={propertyType === filter.label}
                      >
                        <filter.icon className="w-4 h-4" />
                        <span>{filter.label}</span>
                        <span className="text-xs opacity-70">({filter.count})</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Input + buttons */}
                  <div className="flex flex-col lg:flex-row gap-4 md:gap-5">
                    <div className="relative flex-1">
                      <MapPin
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                          isSearchFocused ? "text-blue-500" : "text-gray-400"
                        }`}
                      />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => {
                          setShowSuggestions(true);
                          setIsSearchFocused(true);
                        }}
                        onBlur={() => setIsSearchFocused(false)}
                        placeholder="Enter city, locality, or landmark..."
                        className="w-full pl-12 pr-6 py-4 md:py-5 rounded-2xl border-2 border-gray-200 bg-white/90 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-base md:text-lg placeholder-gray-500 font-medium"
                        aria-label="Search by location"
                      />
                    </div>

                    <div className="flex gap-3 md:gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-5 md:px-6 py-4 md:py-5 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all flex items-center gap-2 font-medium"
                        type="button"
                      >
                        <Filter className="w-5 h-5" />
                        <span className="hidden sm:inline">Filters</span>
                      </motion.button>

                      <motion.button
                        onClick={() => handleSubmit()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-7 md:px-9 py-4 md:py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl hover:shadow-xl transition-all flex items-center gap-3 font-bold"
                      >
                        <Search className="w-5 h-5" />
                        <span>Search Properties</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Suggestions INSIDE the white panel */}
                  <AnimatePresence>
                    {isSuggesting && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="mt-5 bg-white/98 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-orange-500" />
                              Popular Locations
                            </h3>
                            <span className="text-sm text-gray-500">Choose from trending areas</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-auto pr-1">
                            {popularLocations.map((location, index) => (
                              <motion.button
                                key={location}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.08 }}
                                onClick={() => handleLocationClick(location)}
                                className="flex items-center justify-between p-4 hover:bg-blue-50 rounded-xl transition-all text-left group border border-transparent hover:border-blue-200"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {location}
                                    </span>
                                    <div className="text-[11px] text-gray-500">
                                      {Math.floor(Math.random() * 500) + 100}+ properties
                                    </div>
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={containerVariants} className="relative z-0 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mt-6 md:mt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/90 backdrop-blur-md rounded-2xl p-5 md:p-6 text-center shadow border border-white/50"
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="pb-16" />
      </div>
    </div>
  );
}
