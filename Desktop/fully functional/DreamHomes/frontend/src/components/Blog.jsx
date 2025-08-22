import { useState } from 'react';
import {
  Calendar,
  ArrowRight,
  Clock,
  Share2,
  Bookmark,
  BookmarkCheck,
  Search,
  Tag,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts } from '../assets/blogdata';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

/* ----------------------------- Helpers (BN) ----------------------------- */

const EN_TO_BN = {
  Buying: 'ক্রয়',
  Selling: 'বিক্রয়',
  Investment: 'বিনিয়োগ',
  Tips: 'টিপস',
  'Market Trends': 'বাজার প্রবণতা',
  'Real Estate': 'রিয়েল এস্টেট'
};
const BN_TO_EN = {
  ক্রয়: 'Buying',
  বিক্রয়: 'Selling',
  বিনিয়োগ: 'Investment',
  টিপস: 'Tips',
  'বাজার প্রবণতা': 'Market Trends',
  সব: 'All'
};

const toBnNumber = (n) => Number(n || 0).toLocaleString('bn-BD');

const formatBDDate = (dateLike) =>
  new Date(dateLike).toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

const DEFAULT_IMG =
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop';

const getPostImage = (post) => {
  if (post?.image) return post.image;
  if (post?.cover) return post.cover;
  if (post?.img) return post.img;
  if (post?.photo) return post.photo;
  if (Array.isArray(post?.images) && post.images[0]) return post.images[0];
  return DEFAULT_IMG;
};

/* ----------------------------- Animations ------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20, duration: 0.6 }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

const pulseAnimation = {
  scale: [1, 1.1, 1],
  transition: { duration: 0.3, ease: 'easeInOut' }
};

const floatingAnimation = {
  y: [-5, 5, -5],
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
};

/* ------------------------ Image With Fallback -------------------------- */

const ImageWithFallback = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src || DEFAULT_IMG);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-64 overflow-hidden">
      {/* subtle shimmer while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setImgSrc(DEFAULT_IMG)}
        className={`${className} w-full h-64 object-cover transition-all duration-700 ease-out ${
          loaded ? '' : 'opacity-0'
        }`}
        loading="lazy"
      />
    </div>
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string
};

/* ------------------------------ BlogCard ------------------------------- */

const BlogCard = ({ post }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [views] = useState(Math.floor(Math.random() * 1000) + 350);

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: post.link
        });
        toast.success('পোস্টটি শেয়ার করা হয়েছে! 🎉', {
          style: { borderRadius: '12px', background: '#10B981', color: '#fff' }
        });
      } else {
        await navigator.clipboard.writeText(post.link);
        toast.success('লিংক কপি করা হয়েছে! 📋', {
          style: { borderRadius: '12px', background: '#10B981', color: '#fff' }
        });
      }
    } catch {
      toast.error('শেয়ার করা যাচ্ছে না 😕', {
        style: { borderRadius: '12px', background: '#EF4444', color: '#fff' }
      });
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked((prev) => !prev);

    if (!isBookmarked) {
      toast.success(`"${post.title}" আপনার রিডিং লিস্টে সেভ হয়েছে 💾`, {
        style: { borderRadius: '12px', background: '#3B82F6', color: '#fff' }
      });
    } else {
      toast.info(`"${post.title}" রিডিং লিস্ট থেকে সরানো হয়েছে 🗑️`, {
        style: { borderRadius: '12px', background: '#6B7280', color: '#fff' }
      });
    }
  };

  const handleReadMore = () => {
    window.open(post.link, '_blank', 'noopener,noreferrer');
  };

  const estimatedReadTime = Math.ceil((post.excerpt || '').split(' ').length / 200);

  const rawCategory = post.category || 'Real Estate';
  const categoryLabel = EN_TO_BN[rawCategory] || post.categoryBn || rawCategory;

  const imgSrc = getPostImage(post);

  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 cursor-pointer transform-gpu"
      variants={cardVariants}
      whileHover={{
        y: -12,
        scale: 1.02,
        boxShadow:
          '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleReadMore}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        <ImageWithFallback
          src={imgSrc}
          alt={post.title}
          className="group-hover:scale-110 group-hover:brightness-110"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 ${
            isHovered ? 'opacity-90' : 'opacity-60'
          }`}
        />

        {/* Floating badge */}
        <motion.div className="absolute top-6 left-6 z-10" animate={floatingAnimation}>
          <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow-lg border border-white/20">
            {categoryLabel}
          </span>
        </motion.div>

        {/* Views */}
        <div className="absolute top-6 right-20 z-10 flex items-center gap-1 px-3 py-1.5 bg-black/30 backdrop-blur-md rounded-full text-white text-xs">
          <Eye className="w-3 h-3" />
          {toBnNumber(views)}
        </div>

        {/* Hover CTA */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute bottom-0 left-0 right-0 p-6 flex justify-center"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReadMore();
                }}
                className="px-6 py-3 bg-white/95 backdrop-blur-sm text-blue-600 rounded-full flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-sm shadow-xl border border-white/50 group-hover:scale-105"
              >
                পুরো আর্টিকেল পড়ুন <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="absolute top-6 right-6 flex flex-col gap-3">
          <motion.button
            whileTap={pulseAnimation}
            onClick={handleBookmark}
            className={`p-3 backdrop-blur-md rounded-full shadow-lg border border-white/20 transition-all duration-300 ${
              isBookmarked
                ? 'bg-blue-600 text-white shadow-blue-500/25'
                : 'bg-white/90 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </motion.button>

          <motion.button
            whileTap={pulseAnimation}
            onClick={handleShare}
            className="p-3 bg-white/90 backdrop-blur-md text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 shadow-lg border border-white/20"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between text-gray-500 text-xs mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              <span className="font-medium">{formatBDDate(post.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-green-500" />
              <span className="font-medium">{toBnNumber(estimatedReadTime)} মিনিট</span>
            </div>
          </div>
          <div className="flex items-center text-orange-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-xs font-medium">ট্রেন্ডিং</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>

        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReadMore();
            }}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-all duration-300 text-sm group/btn"
          >
            আরও পড়ুন
            <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              <Tag className="w-3 h-3 text-gray-400" />
              <span className="font-medium">
                {EN_TO_BN[post.tags?.[0]] || post.tags?.[0] || 'প্রপার্টি'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

BlogCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    // image can be any of these keys:
    image: PropTypes.string,
    cover: PropTypes.string,
    img: PropTypes.string,
    photo: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    category: PropTypes.string,
    categoryBn: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

/* --------------------------------- Blog -------------------------------- */

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('সব');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = ['সব', 'ক্রয়', 'বিক্রয়', 'বিনিয়োগ', 'টিপস', 'বাজার প্রবণতা'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      (post.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());

    // Accept both Bangla or English category in data
    const postCatEn = (post.category || 'Real Estate').toString();
    const postCatBn = EN_TO_BN[postCatEn] || post.categoryBn || postCatEn;

    const matchesCategory =
      selectedCategory === 'সব' ||
      postCatBn === selectedCategory ||
      postCatEn === BN_TO_EN[selectedCategory];

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TrendingUp className="w-4 h-4" />
            সর্বশেষ রিয়েল এস্টেট ইনসাইটস
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 relative">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              এক্সপার্ট ইনসাইটস
            </span>
            <br />
            <span className="text-gray-900">& মার্কেট আপডেট</span>
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            বিশেষজ্ঞ পরামর্শ, বাজার প্রবণতা এবং ইনসাইডার টিপস—বাংলাদেশি বাজারকে মাথায় রেখে সাজানো আমাদের ব্লগ।
          </p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            <div className="relative max-w-md w-full">
              <motion.div
                className={`relative transition-all duration-300 ${
                  isSearchFocused ? 'scale-105' : 'scale-100'
                }`}
              >
                <input
                  type="text"
                  placeholder="আর্টিকেল, টপিক, টিপস খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm shadow-lg text-gray-900 placeholder-gray-500"
                />
                <Search
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    isSearchFocused ? 'text-blue-500' : 'text-gray-400'
                  }`}
                />
                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </motion.button>
                )}
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
              {['সব', 'ক্রয়', 'বিক্রয়', 'বিনিয়োগ', 'টিপস', 'বাজার প্রবণতা'].map(
                (category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/25 transform scale-105'
                        : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                    }`}
                  >
                    {category}
                  </motion.button>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Grid / Empty */}
        {filteredPosts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center"
              >
                <Search className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                কোনো আর্টিকেল পাওয়া যায়নি
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
                আপনার সার্চের সাথে মিল পাওয়া যায়নি। ভিন্ন কীওয়ার্ড ব্যবহার করুন অথবা “সব” ক্যাটাগরি
                সিলেক্ট করুন।
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('সব');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                ফিল্টার রিসেট করুন
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* View all */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all font-bold text-lg inline-flex items-center group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              সব আর্টিকেল দেখুন
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <p className="text-gray-500 mt-4 text-sm">
            রিয়েল এস্টেট ট্রেন্ড জানতে হাজারো পাঠকের সঙ্গে থাকুন
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
