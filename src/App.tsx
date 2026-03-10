import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  User, 
  Briefcase, 
  ChevronDown, 
  Moon, 
  Sun,
  Terminal,
  Palette,
  Globe,
  Send,
  Smartphone,
  Database,
  Server,
  Layers,
  Camera,
  Menu,
  X
} from 'lucide-react';

/**
 * CUSTOMIZE YOUR DATA HERE
 * ------------------------------------------------------------------
 * Update these objects to reflect your personal information, skills,
 * and projects.
 */

const PERSONAL_INFO = {
  name: "Yosef Salah",
  title: "Backend & Flutter Developer",
  bio: "I architect scalable backend systems and build beautiful cross-platform mobile applications. Specialized in Flutter for mobile experiences and Node.js/Python for robust server-side logic.",
  email: "yosefsalah360@gmail.com",
  
  // INSTRUCTIONS FOR PERSONAL PHOTO:
  // 1. For a live website, move your photo (e.g., 'me.jpg') into your project's 'public' folder.
  // 2. Then set the line below to: photo: "/me.jpg"
  // 3. For now, you can use the upload button on the website preview to test your look.
  photo:"src/assets/my image.jpeg",
  
  socials: {
    github: "https://github.com/Yosef-Salah",
    linkedin: "https://www.linkedin.com/in/yosef-salah-elskily/",
  }
};

const SKILLS = [
  { name: "Flutter / Dart", icon: <Smartphone size={20} />, level: 95 },
  { name: "Spring / Java", icon: <Server size={20} />, level: 90 },
  { name: "PostgreSQL / SQL", icon: <Database size={20} />, level: 85 },
  { name: "Firebase / Cloud", icon: <Layers size={20} />, level: 80 },
];

const PROJECTS = [
  {
    id: 1,
    title: "AI Medical App",
    description: "A full-featured cross-platform mobile app built with Flutter. Handles real-time order tracking, payment integration, and push notifications.",
    tags: ["Flutter", "Dart", "Firebase", "Stripe API"],
    link: "#",
    color: "bg-orange-500"
  },
  {
    id: 2,
    title: "Equipment Management System",
    description: "Scalable backend architecture for a social media platform. Handles auth, media processing, and data aggregation using Dockerized services.",
    tags: ["Spring Boot", "Python", "Figma", "React.js"],
    link: "#",
    color: "bg-blue-600"
  },
];

// ------------------------------------------------------------------

const NavLink = ({ href, children, active, onClick }: { href: string, children: React.ReactNode, active: boolean, onClick?: () => void }) => (
  <a 
    href={href}
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 block text-center md:inline-block ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`}
  >
    {children}
  </a>
);

const SectionHeading = ({ children, id }: { children: React.ReactNode, id?: string }) => (
  <h2 id={id} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 relative inline-block">
    {children}
    <span className="absolute -bottom-2 left-0 w-1/3 h-1.5 bg-indigo-500 rounded-full"></span>
  </h2>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${darkMode ? 'bg-slate-950/80 border-b border-slate-800' : 'bg-white/80 border-b border-slate-200'} backdrop-blur-md`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="text-xl font-bold tracking-tighter flex items-center gap-2 z-50">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              {PERSONAL_INFO.name.charAt(0)}
            </div>
            <span className={darkMode ? 'text-white' : 'text-slate-900'}>{PERSONAL_INFO.name}</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink href="#home" active={activeSection === 'home'}>Home</NavLink>
            <NavLink href="#about" active={activeSection === 'about'}>About</NavLink>
            <NavLink href="#projects" active={activeSection === 'projects'}>Projects</NavLink>
            <NavLink href="#contact" active={activeSection === 'contact'}>Contact</NavLink>
          </div>

          <div className="hidden md:block">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-16 left-0 w-full p-4 border-b shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex flex-col gap-2">
              <NavLink href="#home" active={activeSection === 'home'} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
              <NavLink href="#about" active={activeSection === 'about'} onClick={() => setIsMobileMenuOpen(false)}>About</NavLink>
              <NavLink href="#projects" active={activeSection === 'projects'} onClick={() => setIsMobileMenuOpen(false)}>Projects</NavLink>
              <NavLink href="#contact" active={activeSection === 'contact'} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
        {/* Background blobs */}
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse delay-700 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`}></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-4 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-500 text-sm font-medium animate-fade-in-up">
            Available for hire
          </div>
          <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Building digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              masterpieces.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#projects" className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2">
              <Briefcase size={18} />
              View Work
            </a>
            <a href="#contact" className={`w-full sm:w-auto px-8 py-3 rounded-full font-medium transition-all border flex items-center justify-center ${darkMode ? 'border-slate-700 hover:bg-slate-800 text-white' : 'border-slate-200 hover:bg-slate-100 text-slate-900'}`}>
              Contact Me
            </a>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
            <a href="#about" className="text-slate-400 hover:text-indigo-500 transition-colors">
              <ChevronDown size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading>About Me</SectionHeading>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                I started my journey into development 5 years ago. What started as tweaking MySpace themes has evolved into building enterprise-scale applications.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                I'm passionate about open source, accessibility, and creating interfaces that feel natural to use. When I'm not coding, you can find me hiking or brewing the perfect cup of coffee.
              </p>
              
              <div className="pt-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Tech Stack</h3>
                <div className="grid grid-cols-2 gap-4">
                  {SKILLS.map((skill) => (
                    <div key={skill.name} className={`p-3 rounded-lg flex items-center gap-3 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                      <div className="text-indigo-500 shrink-0">{skill.icon}</div>
                      <div className="w-full">
                        <div className={`font-medium text-sm md:text-base ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{skill.name}</div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-1.5">
                          <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative order-1 md:order-2">
              <div className={`aspect-square rounded-2xl overflow-hidden relative z-10 ${darkMode ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center group`}>
                <img 
                  src=src/assets/my image.jpeg
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent mix-blend-overlay pointer-events-none"></div>
                
                {/* Image Upload Overlay */}
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20">
                  <div className="text-white text-center">
                    <Camera size={32} className="mx-auto mb-2" />
                    <span className="text-sm font-medium">Change Photo</span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500 rounded-full blur-2xl opacity-40"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full blur-2xl opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading>Featured Projects</SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <div 
                key={project.id} 
                className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${darkMode ? 'bg-slate-900 hover:shadow-indigo-500/10' : 'bg-white shadow-lg hover:shadow-indigo-500/20'}`}
              >
                {/* Project Image Placeholder */}
                <div className={`h-48 ${project.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <Code className="text-white opacity-50 transform group-hover:scale-110 transition-transform duration-500" size={48} />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                    <a href={project.link} className="text-slate-400 hover:text-indigo-500 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                  
                  <p className={`mb-6 text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className={`text-xs px-3 py-1 rounded-full font-medium ${darkMode ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href={PERSONAL_INFO.socials.github} 
              target="_blank" 
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-slate-100 text-slate-900 border border-slate-200'}`}
            >
              <Github size={20} />
              View more on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 ${darkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className={`rounded-3xl p-8 md:p-12 overflow-hidden relative ${darkMode ? 'bg-slate-950 border border-slate-800' : 'bg-white shadow-xl'}`}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Let's work together</h2>
                <p className={`max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Have a project in mind or just want to say hi? I'm currently open to new opportunities.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                <div className="md:col-span-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email</div>
                      <a href={`mailto:${PERSONAL_INFO.email}`} className={`hover:text-indigo-500 transition-colors break-all ${darkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-8">
                    <a href={PERSONAL_INFO.socials.github} className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:text-indigo-600 hover:bg-slate-200'}`}>
                      <Github size={20} />
                    </a>
                    <a href={PERSONAL_INFO.socials.linkedin} className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:text-indigo-600 hover:bg-slate-200'}`}>
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Name</label>
                      <input 
                        type="text" 
                        id="name"
                        required
                        className={`w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode ? 'bg-slate-900 border border-slate-700 text-white placeholder-slate-600' : 'bg-slate-50 border border-slate-200 text-slate-900'}`}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email</label>
                      <input 
                        type="email" 
                        id="email"
                        required
                        className={`w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode ? 'bg-slate-900 border border-slate-700 text-white placeholder-slate-600' : 'bg-slate-50 border border-slate-200 text-slate-900'}`}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Message</label>
                    <textarea 
                      id="message"
                      required
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none ${darkMode ? 'bg-slate-900 border border-slate-700 text-white placeholder-slate-600' : 'bg-slate-50 border border-slate-200 text-slate-900'}`}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || submitStatus === 'success'}
                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                      submitStatus === 'success' 
                        ? 'bg-emerald-500 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending...</span>
                    ) : submitStatus === 'success' ? (
                      <span>Message Sent!</span>
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 text-center text-sm ${darkMode ? 'bg-slate-950 text-slate-500' : 'bg-slate-50 text-slate-400'}`}>
        <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
