import React, { useState, useEffect, useRef } from 'react';
import { Code2, ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = ['< Code >', '< Create >', '< Elevate >'];
  
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
      title: "E-Commerce Furniture Platform",
      description: "A full-stack e-commerce solution with real-time inventory management",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
      tech: ["WooCommerce", "PHP", "JavaScript", "MySQL", "AWS"],
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
              Barry-Dev
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-gray-900"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),transparent_50%)]"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400/20"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [1, 2, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
          
          {/* Gradient mesh */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-pink-500/5 via-transparent to-transparent"></div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center z-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-1 bg-gray-900 rounded-full flex items-center justify-center">
                <Code2 className="w-12 h-12 text-purple-400" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            {titles[titleIndex]}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Full Stack Developer | Web Designer | AI Enthusiast
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all relative group overflow-hidden"
              onClick={() => handleNavClick('contact')}
            >
              <span className="relative z-10">Let's Work Together</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-purple-600 hover:bg-purple-600/20 rounded-lg transition-all relative group overflow-hidden"
              onClick={() => handleNavClick('projects')}
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-purple-600/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 bg-purple-400 rounded-full"
            ></motion.div>
          </div>
        </motion.div>
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
              With 3+ years of hands-on experience in full stack development, I build robust, responsive, and scalable web applications. 
              My approach blends clean code, thoughtful design, and efficient backend architecture to deliver seamless user experiences. 
              Passionate about continuous learning, I actively integrate emerging technologies and best practices to solve real-world problems and bring ideas to life.
              My passion lies in solving complex problems and delivering exceptional user experiences.
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
                  src="https://github.com/ThatBaz/Portfolio/blob/main/src/images/Developer-scaled.jpg?raw=true" 
                  alt="Barry Jellah"
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
                <a href="mailto:b.jellah@lybotics.com" className="text-gray-400 hover:text-white transition-colors">
                  b.jellah@lybotics.com
                </a>
              </div>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/ThatBaz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700/50 rounded-full hover:bg-purple-600/20 transition-all duration-300 hover-lift"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/barryjellah/" 
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
            © {new Date().getFullYear()} Baz-Dev. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;