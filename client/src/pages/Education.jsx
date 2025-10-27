import React from "react";

export default function Education() {
  const education = [
    {
      degree: "Software Engineering Technician",
      institution: "Centennial College",
      period: "2022 - Present",
      description: "Currently pursuing a comprehensive program focused on software development, programming languages, database management, and modern web technologies. Gaining hands-on experience in full-stack development and software engineering principles.",
      icon: "💻"
    },
    {
      degree: "High School Diploma",
      institution: "Ideal Model School",
      period: "2020 - 2022",
      description: "Completed secondary education with a focus on mathematics, sciences, and computer studies. Built a strong foundation in analytical thinking and problem-solving skills that led to pursuing software engineering.",
      icon: "🎓"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent mb-4">
            Education
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My academic journey and the knowledge that shapes my development skills
          </p>
        </div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-purple-900/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="text-4xl p-3 rounded-xl bg-purple-600/20">
                    {edu.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-purple-400 mb-2">
                      {edu.degree}
                    </h2>
                    <h3 className="text-xl text-gray-300 mb-2">
                      {edu.institution}
                    </h3>
                    <p className="text-purple-300 font-medium mb-3">
                      {edu.period}
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {edu.description}
                    </p>
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