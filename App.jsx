import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Pill, Bell, Calendar, Menu, X, Clock, Users, Phone } from 'lucide-react';
import Login from './components/Login';
import Signup from './components/Signup';

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center"
          >
            <Heart className="h-8 w-8 text-rose-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">Geriatric Plus</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md">Home</Link>
            <Link to="/login" className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-rose-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-rose-600">Home</Link>
            <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-rose-600">Login</Link>
            <Link to="/signup" className="block px-3 py-2 text-gray-700 hover:text-rose-600">Sign Up</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 to-blue-900/90 backdrop-blur-sm" />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl font-bold text-white mb-6"
          >
            Geriatric Plus
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Your trusted companion for comprehensive elderly care management and support
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/signup"
              className="bg-rose-600 text-white px-8 py-3 rounded-full hover:bg-rose-700 transition-colors inline-flex items-center justify-center text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-gray-900 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center justify-center text-lg"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Care Features</h2>
            <p className="text-xl text-gray-600">Everything you need for better elderly care management</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Pill className="h-12 w-12 text-rose-600" />,
                title: "Medication Management",
                description: "Never miss important medications with our smart reminder system",
                hoverColor: "hover:bg-rose-50"
              },
              {
                icon: <Bell className="h-12 w-12 text-blue-600" />,
                title: "Care Alerts",
                description: "Timely notifications for medications, appointments, and daily activities",
                hoverColor: "hover:bg-blue-50"
              },
              {
                icon: <Calendar className="h-12 w-12 text-green-600" />,
                title: "Appointment Tracking",
                description: "Keep track of all medical appointments and schedules",
                hoverColor: "hover:bg-green-50"
              },
              {
                icon: <Clock className="h-12 w-12 text-purple-600" />,
                title: "Daily Routines",
                description: "Maintain healthy daily routines with gentle reminders",
                hoverColor: "hover:bg-purple-50"
              },
              {
                icon: <Users className="h-12 w-12 text-yellow-600" />,
                title: "Caregiver Connect",
                description: "Stay connected with family members and caregivers",
                hoverColor: "hover:bg-yellow-50"
              },
              {
                icon: <Phone className="h-12 w-12 text-indigo-600" />,
                title: "Emergency Contact",
                description: "Quick access to emergency contacts and medical information",
                hoverColor: "hover:bg-indigo-50"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className={`bg-white p-8 rounded-xl shadow-md transition-all duration-300 ${feature.hoverColor}`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Geriatric Plus?</h2>
            <p className="text-xl text-gray-600">Making elderly care management simple and effective</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Peace of Mind</h3>
                  <p className="text-gray-600 text-lg">Know that your loved ones are well-cared for with our comprehensive monitoring system</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Notifications</h3>
                  <p className="text-gray-600 text-lg">Receive timely alerts for important events and medications</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Family Connection</h3>
                  <p className="text-gray-600 text-lg">Keep the whole family involved in care management</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516307073-35f2a0475eb9?auto=format&fit=crop&q=80"
                  alt="Elderly care"
                  className="object-cover w-full h-full rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;