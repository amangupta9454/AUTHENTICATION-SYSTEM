import { useState } from 'react';

const Interview = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = () => {
    window.open('http://Interviewerr.vercel.app', '_blank', 'noopener,noreferrer');
  };

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Smart Question Bank",
      description: "Access 1000+ curated interview questions across multiple domains and difficulty levels"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Real-time Analysis",
      description: "Get instant feedback on your responses with AI-powered evaluation and scoring"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Performance Tracking",
      description: "Monitor your progress over time with detailed analytics and improvement insights"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Flexible Practice",
      description: "Practice anytime, anywhere with our 24/7 available AI interviewer at your own pace"
    }
  ];

  const stats = [
    { value: "50K+", label: "Practice Sessions" },
    { value: "95%", label: "Success Rate" },
    { value: "1000+", label: "Questions" },
    { value: "24/7", label: "Availability" }
  ];

  return (
    <section className="relative min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-black overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
        
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 animate-fadeInUp">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-200 font-medium">AI-Powered Interview Platform</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <span className="bg-linear-to-r from-indigo-200 via-purple-200 to-white bg-clip-text text-transparent">
              Master Your Next Interview
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Practice with AI-powered mock interviews, get instant feedback, and build confidence to ace your dream job interview
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={handleButtonClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative inline-flex items-center justify-center px-10 py-5 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
            >
              <div
                className={`absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              ></div>
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Start Practicing Now</span>
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2 bg-linear-to-r from-indigo-200 to-purple-200 bg-clip-text">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-500 animate-fadeInUp hover:transform hover:scale-105"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-14 h-14 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center animate-fadeInUp" style={{ animationDelay: '1s' }}>
          <p className="text-gray-300 text-lg mb-4">Ready to level up your interview skills?</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No credit card required • Free to start</span>
          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes particle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(20px) scale(0.5);
            opacity: 0;
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
        .animate-particle {
          animation: particle linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Interview;
