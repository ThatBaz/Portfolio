import React, { useState, useEffect, useRef } from 'react';
import { Code2, Briefcase, User2, Mail, ChevronDown, ExternalLink, Github, Linkedin } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = ['<Code>', '<Create>', '<Elevate>'];
  
  const sectionRefs = {
    about: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null)
  };

  useEffect(() => {
    setIsVisible(true);
    
    const titleInterval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);

      const sections = ['hero', 'about', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        ref.current.classList.add('section-hidden');
        observer.observe(ref.current);
      }
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearInterval(titleInterval);
    };
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
      tech: ["React", "Node.js", "PostgreSQL"]
    },
    {
      title: "AI Task Manager",
      description: "Smart task management app with AI-powered prioritization",
      image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?auto=format&fit=crop&q=80&w=800",
      tech: ["TypeScript", "Python", "TensorFlow"]
    },
    {
      title: "Blockchain Explorer",
      description: "Real-time blockchain data visualization and analysis tool",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
      tech: ["Web3.js", "React", "GraphQL"]
    }
  ];

  const handleNavClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY !== 0) {
      const container = e.currentTarget;
      container.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-purple-600 transition-all duration-300 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-sm z-40 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hover-lift">
              DevPortfolio
            </div>
            <div className="flex space-x-8">
              {['hero', 'about', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`capitalize transition-all duration-300 hover-lift ${
                    activeSection === section ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {section === 'hero' ? 'home' : section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 h-[80px] flex items-center justify-center">
              <h1 
                key={titleIndex}
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent typing-text"
              >
                {titles[titleIndex]}
              </h1>
            </div>
            <p 
              className={`text-xl text-gray-400 mb-8 ${
                isVisible ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'
              }`}
            >
              Crafting digital experiences that make a difference
            </p>
            <div 
              className={`flex justify-center space-x-4 ${
                isVisible ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'
              }`}
            >
              <button 
                onClick={() => handleNavClick('contact')}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Get in Touch
              </button>
              <button 
                onClick={() => handleNavClick('projects')}
                className="border border-purple-600 px-8 py-3 rounded-full hover:bg-purple-600/10 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                View Work
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section ref={sectionRefs.about} id="about" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center animate-scale-in">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <div className="flex items-center space-x-4 hover-lift">
                <Code2 className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-semibold">Full Stack Developer</h3>
              </div>
              <p className="text-gray-400">
                With over 5 years of experience in web development, I specialize in creating
                scalable applications using modern technologies. My passion lies in solving
                complex problems and delivering exceptional user experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1 bg-purple-600/20 rounded-full text-purple-400 text-sm hover-lift"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative animate-float">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-shadow duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1596778402543-00146d446fac?auto=format&fit=crop&q=80&w=800" 
                  alt="Developer at work"
                  className="object-cover w-full h-full scale-on-hover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        ref={sectionRefs.projects} 
        id="projects" 
        className="h-screen flex items-center overflow-x-hidden"
      >
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-12 text-center animate-scale-in px-6">Featured Projects</h2>
          <div 
            className="flex overflow-x-auto horizontal-snap pb-8 px-6"
            onWheel={handleWheel}
          >
            {projects.map((project, index) => (
              <div 
                key={index}
                className="min-w-[80vw] md:min-w-[40vw] lg:min-w-[33vw] px-4 first:pl-6 last:pr-6"
              >
                <div className="bg-gray-800/50 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover-lift h-full">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="object-cover w-full h-full scale-on-hover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 bg-gray-700/50 rounded-full text-xs hover-lift"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRefs.contact} id="contact" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center animate-scale-in">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid gap-8">
              <div className="flex items-center space-x-4 group hover-lift">
                <Mail className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <a href="mailto:contact@example.com" className="text-gray-400 hover:text-white transition-colors">
                  contact@example.com
                </a>
              </div>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700/50 rounded-full hover:bg-purple-600/20 transition-all duration-300 hover-lift"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700/50 rounded-full hover:bg-purple-600/20 transition-all duration-300 hover-lift"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            © {new Date().getFullYear()} DevPortfolio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;