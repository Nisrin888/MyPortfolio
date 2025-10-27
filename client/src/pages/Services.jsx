import React from "react";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Building responsive websites using HTML, CSS, JavaScript, and React.",
      icon: "💻",
      gradient: "from-purple-500 to-purple-700",
      link: "/projects"
    },
    {
      title: "UI/UX Design",
      description: "Creating simple and user-friendly interfaces for websites and apps.",
      icon: "🎨",
      gradient: "from-purple-600 to-pink-600",
      link: "/projects"
    },
    {
      title: "Game Development",
      description: "I create fun and engaging games with modern web technologies.",
      icon: "🎮",
      gradient: "from-purple-500 to-blue-600",
      link: "/projects"
    },
    {
      title: "Learning & Tutorials",
      description: "Guides and tutorials for beginners in web development and React.",
      icon: "📚",
      gradient: "from-purple-600 to-purple-800",
      link: "/contact"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent mb-4">
            Services
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transforming ideas into digital reality with modern technologies and creative solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-purple-900/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="flex items-start space-x-4">
                  <div className={`text-4xl p-3 rounded-xl bg-gradient-to-br ${service.gradient} bg-opacity-20`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-purple-400 mb-3">
                      {service.title}
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                <Link to={service.link} className="mt-6 flex items-center text-purple-400 hover:text-purple-300 cursor-pointer">
                  <span className="text-sm">Learn more</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
