
import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';

const Hero = () => {
  const [counters, setCounters] = useState({
    lives: 0,
    projects: 0,
    countries: 0
  });

  // Counter animation effect
  useEffect(() => {
    const animateCounter = (target: number, key: 'lives' | 'projects' | 'countries') => {
      let current = 0;
      const increment = target / 100; // Adjust speed here
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 20);
    };

    // Start animations with delay
    setTimeout(() => animateCounter(108000, 'lives'), 500);
    setTimeout(() => animateCounter(342, 'projects'), 700);
    setTimeout(() => animateCounter(25, 'countries'), 900);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      ></div>
      
      {/* Content */}
       <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-24"> {/* Added pt-24 here */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 fade-in-up">
          Creating Lasting Impact,
          <br />
          <span className="text-green-300">Transforming Lives</span>
        </h1>
        
        <p className="text-xl sm:text-2xl mb-4 opacity-90 max-w-3xl mx-auto slide-in-right">
          The Lance Foundation works tirelessly to build stronger communities through education, healthcare, environmental conservation, and sustainable development programs worldwide.
        </p>
        
        {/* Motto */}
        <div className="text-lg sm:text-xl mb-8 opacity-80 italic font-light">
          "Service to Humanity is Service to God"
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 max-w-2xl mx-auto">
          <Button 
            asChild
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-gray-900 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 pulse-glow shadow-2xl w-full sm:w-auto text-center"
          >
            <Link to="/donate" className="block">Donate Now</Link>
          </Button>
          
         <Button
      asChild
      variant="outline"
      size="lg"
      className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-xl w-full sm:w-auto text-center"
    >
      <Link to="/projects" className="block">View Our Work</Link>
    </Button>
        </div>
        
        {/* Image Carousel */}
        <div className="mb-12">
          <ImageCarousel />
        </div>
        
        {/* Stats with Counter Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
          <div className="text-center fade-in-up">
            <div className="text-3xl sm:text-4xl font-bold text-green-300 mb-2 counter-animation">
              {counters.lives.toLocaleString()}+
            </div>
            <div className="text-lg opacity-90">Lives Impacted</div>
          </div>
          <div className="text-center fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl sm:text-4xl font-bold text-green-300 mb-2 counter-animation">
              {counters.projects}+
            </div>
            <div className="text-lg opacity-90">Projects Completed</div>
          </div>
          <div className="text-center fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-3xl sm:text-4xl font-bold text-green-300 mb-2 counter-animation">
              {counters.countries}
            </div>
            <div className="text-lg opacity-90">Countries Served</div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white opacity-70" />
      </div>
    </section>
  );
};

export default Hero;
