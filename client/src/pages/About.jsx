import React from "react";
import myPic from "../assets/dp_pfp.png";
import resume from "../assets/web_resume.pdf";

export default function About() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent mb-4">
            About Me
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <img src={myPic} className="relative w-full rounded-2xl shadow-2xl shadow-purple-900/50" alt="me coding" />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-900/30 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed">
                Hello! My name is <span className="text-purple-400 font-semibold">Nischal</span>. I am learning web development and building my
                portfolio with React and Tailwind CSS.
              </p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-900/30 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed">
                I enjoy creating simple and interactive web pages, learning new
                technologies, and improving my coding skills.
              </p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-900/30 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed">
                This portfolio showcases my projects, skills, and ways to get in touch
                with me.
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <div className="px-6 py-3 bg-purple-600/20 border border-purple-500/30 rounded-lg">
                <span className="text-purple-400">React</span>
              </div>
              <div className="px-6 py-3 bg-purple-600/20 border border-purple-500/30 rounded-lg">
                <span className="text-purple-400">Tailwind CSS</span>
              </div>
              <div className="px-6 py-3 bg-purple-600/20 border border-purple-500/30 rounded-lg">
                <span className="text-purple-400">JavaScript</span>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-900/30 rounded-xl p-6 mt-6">
              <h3 className="text-xl font-semibold text-purple-400 mb-3">Resume</h3>
              <p className="text-gray-300 mb-4">
                Interested in working together? Download my resume to learn more about my experience and skills.
              </p>
              <a 
                href={resume} 
                download="Nischal_Resume.pdf"
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-600/30"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
