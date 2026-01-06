import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import InstallButton from '../components/InstallButton';
import {
  CheckCircle,
  Star,
  Gift,
  Zap,
  BadgeCheck,
  Calendar,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  Target,
  Menu,
  X
} from 'lucide-react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const premiumBenefits = [
    { icon: BadgeCheck, title: 'Premium Badge', description: 'Get a verified blue tick on your profile' },
    { icon: Zap, title: 'Daily Tasks', description: 'Earn points with exclusive daily tasks' },
    { icon: Gift, title: 'Welcome Kit', description: 'Receive an exclusive ambassador welcome kit' },
    { icon: TrendingUp, title: 'Enhanced Rewards', description: 'Earn extra points for completed tasks' },
    { icon: Calendar, title: 'Personal Onboarding', description: 'Scheduled meeting with our team' },
    { icon: Award, title: 'Money Back Guarantee', description: 'Get ₹19 back after completing 1 task' },
  ];

  const howItWorks = [
    { step: 1, title: 'Register', description: 'Sign up as a Stucare Ambassador in just 2 minutes' },
    { step: 2, title: 'Upgrade to Premium', description: 'Get premium for just ₹19/month' },
    { step: 3, title: 'Complete Tasks', description: 'Share products and complete daily tasks' },
    { step: 4, title: 'Earn Points & Redeem', description: 'Earn points and redeem them for rewards' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="/stucare_logo.png"
                alt="Stucare"
                className="h-8 sm:h-10 object-contain"
              />
              <span className="text-gray-400 text-lg sm:text-xl">×</span>
              <img
                src="3048_Scholare_HK-JPG-01__1_-removebg-preview.png"
                alt="Scholare"
                className="h-8 sm:h-8 object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <InstallButton iconOnly />
              <Link
                to="/login"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-primary px-6 py-2"
              >
                Join Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-3 border-t border-gray-100 mt-3">
                  <div className="px-2 flex items-center gap-2">
                    <InstallButton iconOnly />
                    <span className="text-sm text-gray-500">Install App</span>
                  </div>
                  <Link
                    to="/login"
                    className="block text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block btn-primary text-center px-6 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join Now
                  </Link>
                  <a
                    href="#how-it-works"
                    className="block text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How It Works
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 bg-gradient-to-br from-primary-50 via-white to-lime-50">
        <div className="max-w-7xl mx-auto">
          {/* Header Content - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-12 sm:mb-16"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg border-2 border-primary-200"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
              Premium Membership – ₹19 / month (optional)
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Become a <span className="gradient-text">Student Ambassador</span> Today
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
              Join the StuCare × Scholare Student Ambassador Program and earn points for completing real promotional and outreach tasks. Choose a free or premium path, build valuable skills, and earn points based on your performance.
            </p>

            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary-400 to-lime-400 border-2 border-white flex items-center justify-center text-white text-xs sm:text-sm font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                <span className="font-bold text-gray-900">500+</span> ambassadors already earning
              </p>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">

            {/* Free Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-6 sm:p-8 relative overflow-hidden border-2 border-gray-100 hover:border-gray-200 transition-all h-full flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Free Ambassador</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-4 sm:mb-6">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">Free</span>
                <span className="text-gray-500">/forever</span>
              </div>
              <p className="text-gray-600 mb-6 min-h-[48px]">Start your journey with basic benefits and learn the ropes of student advocacy.</p>

              <ul className="space-y-3 sm:space-y-4 mb-8 flex-grow">
                {[
                  'Basic Ambassador Badge',
                  'Access to Community',
                  'Standard Points on Referrals',
                  'Weekly Tasks',
                  'Basic Support'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/register?plan=free"
                className="w-full px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 mt-auto"
              >
                Join for Free
              </Link>
            </motion.div>

            {/* Premium Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-6 sm:p-8 relative overflow-hidden border-2 border-primary-500 shadow-2xl shadow-primary-500/10 h-full flex flex-col"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-l from-lime-400 to-lime-500 text-black px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-bl-xl">
                BEST VALUE
              </div>
              <div className="flex items-center gap-2 mb-4 mt-8 sm:mt-0">
                <div className="p-3 bg-primary-100 rounded-xl">
                  <BadgeCheck className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Premium Ambassador</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-4 sm:mb-6">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">₹19</span>
                <span className="text-gray-500">/month</span>
                <span className="ml-2 text-xs sm:text-sm text-gray-400 line-through">₹199</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">90% OFF</span>
              </div>
              <p className="text-gray-600 mb-6 min-h-[48px]">Maximize your earnings with exclusive perks, verified status, and daily opportunities.</p>

              <ul className="space-y-3 sm:space-y-4 mb-8 flex-grow">
                {[
                  'Verified Blue Tick Badge',
                  'Exclusive Daily Tasks',
                  'Welcome Kit Delivered',
                  '2x Points on Referrals',
                  'Personal Onboarding Call',
                  '₹19 Back After 1st Task'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="w-full btn-primary py-3 sm:py-4 text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 mt-auto"
              >
                <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                Become Premium Ambassador
              </Link>
              <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                100% Money Back Guarantee • Cancel Anytime
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Powered by Innovation in Education
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              A collaboration between Stucare and Scholare to empower and develop students holistically
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Stucare Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 sm:p-8 border-2 border-transparent hover:border-primary-200 cursor-pointer"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="h-14 sm:h-20 w-14 sm:w-20 flex items-center justify-center flex-shrink-0">
                  <img
                    src="StuCare's TM.png"
                    alt="Stucare"
                    className="max-h-full max-w-full w-auto object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Stucare</h3>
                  <p className="text-sm sm:text-base text-gray-500">Empowering India's Youth</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Stucare is an Indian student-focused education and development initiative designed to help students grow beyond textbooks and traditional classroom learning. It focuses on building students holistically by nurturing not only academic excellence but also mental well-being, financial awareness, and essential life skills.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                We develop emotionally strong students by promoting mental health awareness, stress management, and self-confidence. We emphasize financial literacy by teaching money management, savings, budgeting, and investments from an early age. Through interactive workshops, quizzes, awareness programs, and digital platforms, Stucare creates engaging, practical, and impactful learning experiences.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed font-medium text-primary-700">
                Our mission: Shape students into responsible, skilled, and future-ready individuals who succeed in both personal and professional lives.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Mental Wellness', 'Financial Literacy', 'Life Skills', 'Leadership', 'Communication', 'Real-World Ready'].map((tag) => (
                  <span key={tag} className="bg-primary-50 text-primary-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Scholare Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(132,204,22,0.15)" }}
              className="glass-card p-6 sm:p-8 border-2 border-transparent hover:border-lime-200 cursor-pointer"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="h-14 sm:h-20 w-14 sm:w-20 flex items-center justify-center flex-shrink-0">
                  <img
                    src="scholare-logo.jpg"
                    alt="Scholare"
                    className="max-h-full max-w-full w-auto object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Scholare</h3>
                  <p className="text-sm sm:text-base text-gray-500">Stationery for Everyday Student Life</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Scholare is a student-first stationery brand designed to support daily studying, writing, and organisation. Our products focus on simplicity, usability, and comfort helping students stay focused without unnecessary distractions.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                We believe good stationery should feel natural to use. From smooth writing tools to well-structured notebooks, every Scholare product is made to be practical, durable, and student-friendly for regular academic use.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Scholare exists to make everyday learning routines easier by providing stationery that students can rely on whether it's for classwork, homework, revision, or personal notes.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed font-medium text-lime-700">
                Core mission: Create simple, practical, and reliable stationery that supports students in their everyday academic journey.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Smooth Writing', 'Clean & Minimal Design', 'Daily Study Use', 'Student-Friendly Layouts', 'Organised Note-Making', 'Reliable & Affordable'].map((tag) => (
                  <span key={tag} className="bg-lime-50 text-lime-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Start earning in just 4 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="text-center relative group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4 shadow-lg shadow-primary-500/30 group-hover:shadow-2xl group-hover:shadow-primary-500/50 transition-all duration-300">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-6 sm:top-8 left-[60%] w-[80%]">
                    <div className="border-t-2 border-dashed border-gray-300 relative">
                      <ArrowRight className="absolute -right-2 -top-3 w-6 h-6 text-primary-500" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Benefits */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-lime-100 text-lime-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <Star className="w-3 h-3 sm:w-4 sm:h-4" />
              Premium Benefits
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              What You Get as Premium Ambassador
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Unlock exclusive perks and maximize your earnings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {premiumBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-5 sm:p-6 hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-primary-200"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-100 to-lime-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
              What Our Ambassadors Say
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-primary-100 max-w-2xl mx-auto px-4">
              Join hundreds of students already earning with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { name: 'Priya S.', college: 'Delhi University', text: 'Made ₹5000 in my first month! The premium badge really helps build trust.', earnings: '₹5,000+' },
              { name: 'Rahul K.', college: 'IIT Bombay', text: 'The welcome kit was amazing. Daily tasks are easy to complete while studying.', earnings: '₹8,500+' },
              { name: 'Sneha M.', college: 'Christ University', text: 'Best decision I made! The onboarding call helped me understand everything.', earnings: '₹12,000+' },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, boxShadow: "0 25px 50px rgba(0,0,0,0.2)" }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 sm:p-6 border border-white/20 hover:border-white/40 cursor-pointer"
              >
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-bold text-white text-sm sm:text-base truncate">{testimonial.name}</p>
                    <p className="text-primary-200 text-xs sm:text-sm truncate">{testimonial.college}</p>
                  </div>
                  <div className="bg-lime-400 text-black px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap">
                    {testimonial.earnings}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-10 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-100 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-lime-100 rounded-full blur-3xl"></div>

            <div className="relative text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 text-red-600 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6 shadow-lg"
              >
                🔥 Offer Ends Soon - Limited Spots Available
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
                Ready to Start Earning?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 px-4">
                Join now and get your premium ambassador status for just ₹19/month
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 btn-primary px-8 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                Get Premium @ ₹19
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <p className="text-sm sm:text-base text-gray-500 mt-4 sm:mt-6 px-4">
                No credit card required • Cancel anytime • 100% Money back guarantee
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-10 lg:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <img
                  src="StuCare's TM.png"
                  alt="Stucare"
                  className="h-6 sm:h-8 object-contain brightness-100 bg-white rounded-md"
                />
                <span className="text-gray-500">×</span>
                <img
                  src="3048_Scholare_HK-JPG-01__1_-removebg-preview.png"
                  alt="Scholare"
                  className="h-6 sm:h-8 bg-white rounded-md"
                />
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Empowering students to earn while they learn through our ambassador program.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Quick Links</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Legal & Support</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund & Cancellation</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Contact</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li className="break-words">support@stucares.com</li>
                <li>+91 8691909003</li>
                <li className="pt-2">
                  <a
                    href="https://instagram.com/stucare.innovation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    @stucare.innovation
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-xs text-gray-500">
            <p className="mb-4 max-w-4xl mx-auto leading-relaxed px-4">
              Stucare Ambassador is a task‑based rewards program. Earnings are based solely on completed promotional activities. No income is guaranteed. Premium membership provides additional tools and resources and is optional. All payouts comply with the Prize Chits and Money Circulation Schemes (Banning) Act, 1978.
            </p>
            <p>© 2024 Stucare Innovation and Creation Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
