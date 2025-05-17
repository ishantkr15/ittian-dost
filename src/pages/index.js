import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DarkModeToggle from '../components/DarkModeToggle';
import TestimonialCarousel from '../components/TestimonialCarousel';

export default function Home() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Head>
        <title>IITian Dost - AI JEE Mentor</title>
        <meta name="description" content="AI-powered JEE problem-solving assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
            <span className="text-white font-bold">ID</span>
          </div>
          <h1 className="text-xl font-bold">IITian Dost</h1>
        </motion.div>
        <nav className="flex items-center space-x-6">
          <Link href="/solve" className="hover:text-purple-600 transition-colors">Solve Now</Link>
          <Link href="/pricing" className="hover:text-purple-600 transition-colors">Pricing</Link>
          <DarkModeToggle />
          <Link href="/solve" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Try Now
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet <span className="text-purple-600">IITian Dost</span>—your AI JEE mentor
            </h1>
            <p className="text-xl mb-8">
              Snap a problem, get step-by-step solutions with animations. Free forever for students!
            </p>
            <Link href="/solve" className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-lg font-medium">
              Try Now → Type/Paste/Upload
            </Link>
          </motion.div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className={`absolute -inset-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 opacity-75 blur-lg ${darkMode ? '' : 'mix-blend-multiply'}`}></div>
              <div className={`relative rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 shadow-xl`}>
                <div className="h-64 flex items-center justify-center">
                  <video autoPlay loop muted playsInline className="h-full rounded-lg">
                    <source src="/videos/demo.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why IITian Dost?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🧠',
                  title: 'AI that understands JEE patterns',
                  description: 'Trained on 10,000+ JEE problems to provide exam-specific solutions'
                },
                {
                  icon: '📸',
                  title: 'Scan handwritten problems',
                  description: 'Upload photos of your notebook and get instant solutions'
                },
                {
                  icon: '📊',
                  title: 'Weakness tracker',
                  description: 'Get personalized insights on topics you need to improve'
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Beta Users Say</h2>
          <TestimonialCarousel />
        </section>
      </main>

      <footer className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} IITian Dost. Free forever for students.</p>
        </div>
      </footer>
    </div>
  );
}