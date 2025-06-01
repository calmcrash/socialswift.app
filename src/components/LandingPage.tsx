import React from 'react';
import { Calendar, BarChart2, Users, Play, Shield, Layout } from 'lucide-react';
import Logo from './Logo';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
          <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          <a href="/login" className="text-gray-300 hover:text-white transition-colors">Login</a>
          <a href="/signup" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg transition-colors">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center bg-[#1F2937] rounded-full px-4 py-2 mb-8">
          <span className="text-[#7C3AED] mr-2">🚀 New:</span>
          <span className="text-gray-300">AI-Powered Content Generation</span>
        </div>

        <h1 className="text-6xl font-bold mb-6">
          Manage Your<br />
          <span className="bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#60A5FA] text-transparent bg-clip-text">
            Social Media
          </span><br />
          Like a Pro
        </h1>

        <p className="text-gray-400 text-xl mb-12 max-w-3xl mx-auto">
          Schedule posts, analyze performance, and grow your audience across all
          platforms with our comprehensive social media management suite.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <a href="/signup" className="bg-gradient-to-r from-[#7C3AED] to-[#60A5FA] text-white px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Start Free Trial →
          </a>
          <a href="#demo" className="bg-[#1F2937] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#374151] transition-colors">
            ▶ Watch Demo
          </a>
        </div>

        <p className="text-gray-500 mb-8">
          Trusted by 10,000+ businesses worldwide
        </p>
        <div className="flex justify-center gap-12 text-gray-400">
          <span className="font-semibold">TechCorp</span>
          <span className="font-semibold">StartupHub</span>
          <span className="font-semibold">MediaFlow</span>
          <span className="font-semibold">BrandWorks</span>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Everything You Need to <span className="text-[#7C3AED]">Succeed</span>
        </h2>
        <p className="text-gray-400 text-center mb-16">
          Powerful features designed to help you create, schedule, and analyze your
          social media content effortlessly.
        </p>

        <div className="grid grid-cols-3 gap-8">
          <FeatureCard
            icon={<Calendar className="w-12 h-12 text-[#7C3AED]" />}
            title="Smart Scheduling"
            description="Schedule posts across all platforms with optimal timing suggestions powered by AI."
          />
          <FeatureCard
            icon={<BarChart2 className="w-12 h-12 text-[#7C3AED]" />}
            title="Advanced Analytics"
            description="Get detailed insights into your performance with comprehensive analytics and reporting."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-[#7C3AED]" />}
            title="Team Collaboration"
            description="Work seamlessly with your team using built-in collaboration tools and approval workflows."
          />
          <FeatureCard
            icon={<Play className="w-12 h-12 text-[#7C3AED]" />}
            title="Content Creation"
            description="Generate engaging content with AI assistance and access to millions of stock assets."
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12 text-[#7C3AED]" />}
            title="Brand Safety"
            description="Protect your brand with automated moderation and compliance monitoring tools."
          />
          <FeatureCard
            icon={<Layout className="w-12 h-12 text-[#7C3AED]" />}
            title="Multi-Platform"
            description="Manage Instagram, Facebook, Twitter, LinkedIn, and TikTok from one dashboard."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-[#1F2937] p-8 rounded-xl">
    <div className="mb-6">{icon}</div>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default LandingPage;