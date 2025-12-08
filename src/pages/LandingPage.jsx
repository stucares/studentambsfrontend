import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  Target
} from 'lucide-react';

const LandingPage = () => {
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
    { icon: TrendingUp, title: 'Higher Earnings', description: '2x points on all referrals' },
    { icon: Calendar, title: 'Personal Onboarding', description: 'Scheduled meeting with our team' },
    { icon: Award, title: 'Money Back Guarantee', description: 'Get ₹19 back after completing 1 task' },
  ];

  const howItWorks = [
    { step: 1, title: 'Register', description: 'Sign up as a Stucare Ambassador in just 2 minutes' },
    { step: 2, title: 'Upgrade to Premium', description: 'Get premium for just ₹19/month' },
    { step: 3, title: 'Complete Tasks', description: 'Share products and complete daily tasks' },
    { step: 4, title: 'Earn & Withdraw', description: 'Earn points and convert to real money via UPI' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="StuCare's TM.png" 
              alt="Stucare" 
              className="h-10 object-contain"
            />
            <span className="text-gray-400 text-xl">×</span>
            <img 
              src="3048_Scholare_HK-JPG-01__1_-removebg-preview.png" 
              alt="Scholare" 
              className="h-8 object-contain"
            />
          </div>
          <div className="flex items-center gap-4">
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary-50 via-white to-lime-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Limited Time Offer - Premium @ ₹19/month
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Become a <span className="gradient-text">Premium Ambassador</span> Today
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join the Stucare × Scholare Ambassador Program. Earn money by sharing products, 
                complete daily tasks, and build your personal brand with our exclusive benefits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="btn-primary px-8 py-4 text-lg flex items-center justify-center gap-2"
                >
                  Get Premium @ ₹19
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#how-it-works"
                  className="px-8 py-4 text-lg font-semibold text-gray-700 border-2 border-gray-200 rounded-xl hover:border-primary-300 transition-all flex items-center justify-center gap-2"
                >
                  Learn More
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-lime-400 border-2 border-white flex items-center justify-center text-white text-sm font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-gray-600">
                  <span className="font-bold text-gray-900">500+</span> ambassadors already earning
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Premium Card */}
              <div className="glass-card p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-lime-400 to-lime-500 text-black px-6 py-2 text-sm font-bold rounded-bl-xl">
                  BEST VALUE
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <BadgeCheck className="w-8 h-8 text-primary-500" />
                  <h3 className="text-2xl font-bold text-gray-900">Premium Ambassador</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold text-gray-900">₹19</span>
                  <span className="text-gray-500">/month</span>
                  <span className="ml-2 text-sm text-gray-400 line-through">₹199</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">90% OFF</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    'Verified Blue Tick Badge',
                    'Exclusive Daily Tasks',
                    'Welcome Kit Delivered',
                    '2x Points on Referrals',
                    'Personal Onboarding Call',
                    '₹19 Back After 1st Task'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
                >
                  <Star className="w-5 h-5" />
                  Become Premium Ambassador
                </Link>
                <p className="text-center text-sm text-gray-500 mt-4">
                  100% Money Back Guarantee • Cancel Anytime
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powered by Innovation in Education
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A collaboration between Stucare and Scholare to empower and develop students holistically
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Stucare Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="StuCare's TM.png" 
                  alt="Stucare" 
                  className="h-14 object-contain"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Stucare</h3>
                  <p className="text-gray-500">Empowering India's Youth</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Stucare is an Indian student-focused education and development initiative designed to help students grow beyond textbooks and traditional classroom learning. It focuses on building students holistically by nurturing not only academic excellence but also mental well-being, financial awareness, and essential life skills.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We develop emotionally strong students by promoting mental health awareness, stress management, and self-confidence. We emphasize financial literacy by teaching money management, savings, budgeting, and investments from an early age. Through interactive workshops, quizzes, awareness programs, and digital platforms, Stucare creates engaging, practical, and impactful learning experiences.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed font-medium text-primary-700">
                Our mission: Shape students into responsible, skilled, and future-ready individuals who succeed in both personal and professional lives.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Mental Wellness', 'Financial Literacy', 'Life Skills', 'Leadership', 'Communication', 'Real-World Ready'].map((tag) => (
                  <span key={tag} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* StuQuiz Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-lime-400 to-lime-600 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">StuQuiz</h3>
                  <p className="text-gray-500">Learn Through Play</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                StuQuiz is an interactive quiz-based learning platform by StuCare that transforms traditional education into an exciting game-like experience. We make learning engaging, fun, and rewarding by helping students test their knowledge while enjoying the process.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our platform focuses on improving general knowledge, academic understanding, logical thinking, and problem-solving skills through live and scheduled quizzes. Students receive instant feedback and explanations, helping them learn faster. We motivate participation with win prizes, leaderboard rankings, and reward systems.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed font-medium text-lime-700">
                Core mission: Make learning enjoyable, competitive, and meaningful while building confidence, speed, and smart decision-making abilities.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Live Quizzes', 'Win Prizes', 'Instant Feedback', 'Leaderboards', 'General Knowledge', 'Problem Solving'].map((tag) => (
                  <span key={tag} className="bg-lime-50 text-lime-700 px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start earning in just 4 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg shadow-primary-500/30">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-gray-300"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Benefits */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-lime-100 text-lime-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Premium Benefits
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You Get as Premium Ambassador
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock exclusive perks and maximize your earnings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-lime-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Ambassadors Say
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Join hundreds of students already earning with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-primary-200 text-sm">{testimonial.college}</p>
                  </div>
                  <div className="bg-lime-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                    {testimonial.earnings}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-100 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-lime-100 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
                🔥 Offer Ends Soon - Limited Spots Available
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Start Earning?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join now and get your premium ambassador status for just ₹19/month
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 btn-primary px-10 py-4 text-xl"
              >
                <Sparkles className="w-6 h-6" />
                Get Premium @ ₹19
                <ArrowRight className="w-6 h-6" />
              </Link>
              <p className="text-gray-500 mt-6">
                No credit card required • Cancel anytime • 100% Money back guarantee
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="StuCare's TM.png" 
                  alt="Stucare" 
                  className="h-8 object-contain brightness-100 bg-white rounded-md"
                />
                <span className="text-gray-500">×</span>
                <img 
                  src="3048_Scholare_HK-JPG-01__1_-removebg-preview.png" 
                  alt="Scholare" 
                  className="h-8  bg-white rounded-md "
                />
              </div>
              <p className="text-gray-400 ">
                Empowering students to earn while they learn through our ambassador program.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Our Partners</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://stucares.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Stucare</a></li>
                <li><a href="https://scholare.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Scholare</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@stucares.com</li>
                <li>+91 9876543210</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 Stucare × Scholare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
