import { motion } from "framer-motion";
import { 
  Users, 
  FileText, 
  Calendar, 
  ArrowRight, 
  Check, 
  Star, 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target, 
  MessageSquare,
  Play,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const features = [
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee for your business data."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance that scales with your business growth and team size."
  },
  {
    icon: Target,
    title: "Smart Analytics",
    description: "AI-powered insights to help you make data-driven decisions and grow faster."
  }
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$14",
    originalPrice: "$28",
    description: "Perfect for small teams",
    features: ["Up to 10 users", "Basic SyncAi features", "Email support", "5GB storage", "Mobile app access"],
    popular: false
  },
  {
    name: "Professional", 
    price: "$49",
    originalPrice: "$98",
    description: "Most popular choice",
    features: ["Up to 50 users", "Advanced analytics", "Priority support", "50GB storage", "Custom integrations", "API access"],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$149",
    originalPrice: "$298", 
    description: "For large organizations",
    features: ["Unlimited users", "Custom features", "24/7 phone support", "Unlimited storage", "White-label solution", "Dedicated manager"]
  }
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, TechFlow Solutions",
    content: "SyncAi transformed our sales process. We've seen a 40% increase in conversion rates since switching.",
    rating: 5,
    avatar: "SM"
  },
  {
    name: "David Rodriguez", 
    role: "Sales Director, GrowthCorp",
    content: "The analytics dashboard gives us insights we never had before. It's like having a data scientist on our team.",
    rating: 5,
    avatar: "DR"
  }
];

const stats = [
  { value: "+24%", label: "Higher leads", color: "text-green-600" },
  { value: "99%", label: "Customer satisfaction score", color: "text-blue-600" },
  { value: "4B+", label: "Daily API calls", color: "text-purple-600" },
  { value: "35B", label: "Messages sent in 2023", color: "text-orange-600" }
];

// Demo chart data
const demoChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'New Contacts',
      data: [12, 19, 15, 25, 22, 30],
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      borderColor: '#22c55e',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
  ],
};

const dealChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [270, 420, 380, 520],
      backgroundColor: ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b'],
      borderRadius: 8,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.svg" 
                alt="CRM Logo" 
                className="w-8 h-8 rounded-full bg-transparent"
              />
              <span className="text-lg font-semibold text-gray-900">SyncAi</span>
            </div>
            
            {/* Centered Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#integrations" className="text-gray-600 hover:text-gray-900 transition-colors">Integrations</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </div>
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost" className="text-gray-600">Log In</Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              MODERN AND SCALEABLE
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Comprehensive SyncAi<br />
                <span className="text-gray-700">Tools for Your Team</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Experience the perfect blend of power and simplicity. Connect your data, teams, and customers with our AI-driven SyncAi platform that scales with your business.
              </p>
            </motion.div>
          </div>

          {/* Demo Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Deal Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">$770.00 deal for Acme Inc.</h3>
                  <p className="text-gray-500">Close date: June 6, 2024</p>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
              <div className="flex space-x-4 mb-6">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
                <Button variant="outline">View Demo</Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Description</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Contact Manager</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>Lead Segmentation</span>
                </div>
              </div>
            </motion.div>

            {/* Chart Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">76 new contacts</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="h-32 mb-4">
                <Line data={demoChartData} options={chartOptions} />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="h-8 bg-green-500 rounded" style={{backgroundColor: '#22c55e'}}></div>
                <div className="h-6 bg-blue-500 rounded" style={{backgroundColor: '#3b82f6'}}></div>
                <div className="h-10 bg-purple-500 rounded" style={{backgroundColor: '#8b5cf6'}}></div>
                <div className="h-7 bg-orange-500 rounded" style={{backgroundColor: '#f59e0b'}}></div>
              </div>
              <div className="mt-3 flex justify-between text-xs text-gray-500">
                <span>Q1</span>
                <span>Q2</span>
                <span>Q3</span>
                <span>Q4</span>
              </div>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3">
                <Play className="mr-2 h-4 w-4" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Doing smarter, not harder
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="bg-green-600 text-white p-8 rounded-2xl"
              >
                <feature.icon className="h-12 w-12 mb-6" />
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-green-100 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section id="integrations" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Scale, flex, and innovate
            </h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Integration with tools</h3>
              <div className="flex justify-center items-center space-x-8">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Data Management</h4>
                <p className="text-gray-600 text-sm">Centralize all your customer data in one secure location</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Workflow Automation</h4>
                <p className="text-gray-600 text-sm">Automate repetitive tasks and focus on what matters</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Real-time Analytics</h4>
                <p className="text-gray-600 text-sm">Get insights that drive better business decisions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transparent pricing for all
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                className={`bg-white rounded-2xl p-8 shadow-lg border-2 ${
                  plan.popular ? 'border-green-500 relative' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                  <div className="text-gray-400 line-through text-lg mb-2">{plan.originalPrice}</div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-3 ${
                    plan.popular 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join over 10k+ of happy customers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All resources you need
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Advanced Analytics Dashboard
              </h3>
              <p className="text-gray-600 mb-6">
                Get deep insights into your business performance with our comprehensive analytics suite.
              </p>
              <Button variant="outline" className="w-full">
                Learn More
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Smart Communication Tools
              </h3>
              <p className="text-gray-600 mb-6">
                Streamline client communication with automated follow-ups and smart templates.
              </p>
              <Button variant="outline" className="w-full">
                Learn More
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Enterprise Security
              </h3>
              <p className="text-gray-600 mb-6">
                Bank-level security with end-to-end encryption and compliance certifications.
              </p>
              <Button variant="outline" className="w-full">
                Learn More
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of businesses using SyncAi to manage their client relationships
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-3">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3">
                <img 
                  src="/logo.svg" 
                  alt="CRM Logo" 
                  className="w-8 h-8 rounded-full bg-transparent"
                />
                <span className="text-2xl font-bold">SyncAi</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The comprehensive CRM platform that helps freelancers and teams manage clients, track proposals, and grow their business efficiently.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Analytics</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CRM. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}