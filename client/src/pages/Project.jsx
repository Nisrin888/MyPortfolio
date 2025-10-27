import React from "react";
import slideShow from '../assets/slideshow.png'
import bugSmasher from '../assets/bugsmasher.png'
import myPortfolio from '../assets/portfolio.jpg'

export default function Projects() {
  const projects = [
    {
      title: "Bug Smasher Game",
      description: "A simple and fun bug smasher game built with JavaScript.",
      image: bugSmasher,
      github: "https://github.com/Nisrin888/buggame",
      tags: ["JavaScript", "Game Dev", "HTML5"]
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio application built with React and Tailwind CSS.",
      image: myPortfolio,
      github: "https://github.com/Nisrin888/portfolio",
      tags: ["React", "Tailwind", "Responsive"]
    },
    {
      title: "Image Slideshow",
      description: "Interactive slideshow application for displaying images.",
      image: slideShow,
      github: "https://github.com/Nisrin888/slideshow",
      tags: ["JavaScript", "CSS", "Animation"]
    }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent mb-4">
            My Projects
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Exploring creativity through code - here are some of my recent works
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-purple-900/30 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
                  <img 
                    src={project.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={project.title} 
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-purple-400 mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full border border-purple-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="py-2 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 text-sm font-medium"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
