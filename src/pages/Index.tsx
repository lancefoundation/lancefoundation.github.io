import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import TestimonialCard from '@/components/TestimonialCard';
import PhotoGalleryPreview from '@/components/PhotoGalleryPreview';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PartnersCarousel from '@/components/PartnersCarousel';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const featuredProjects = [
    {
      title: "Clean Water for Rural Kenya",
      description: "Installing solar-powered water pumps and purification systems to provide clean, accessible water to remote villages in Kenya.",
      location: "Machakos County, Kenya",
      date: "2024 - Ongoing",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Water & Sanitation",
      beneficiaries: 12000,
      status: "ongoing" as const
    },
    {
      title: "Digital Learning Centers",
      description: "Establishing computer labs and digital literacy programs in schools across Guatemala to bridge the technology gap.",
      location: "Guatemala Highlands",
      date: "2023 - Completed",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Education",
      beneficiaries: 2400,
      status: "completed" as const
    },
    {
      title: "Mobile Health Clinics",
      description: "Deploying mobile medical units to provide healthcare services to isolated island communities in the Philippines.",
      location: "Mindanao Islands, Philippines",
      date: "2024 - Upcoming",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Healthcare",
      beneficiaries: 18000,
      status: "upcoming" as const
    }
  ];

  const testimonials = [
    {
      quote: "The Lance Foundation's water project changed everything for our village. Our children are healthier, and we can focus on education instead of walking hours for water.",
      author: "Grace Wanjiku",
      role: "Village Elder, Kenya",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Thanks to the digital learning center, my students now have access to the same educational resources as children in the city. It's opening up a world of possibilities.",
      author: "Carlos Mendez",
      role: "Teacher, Guatemala",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Working with The Lance Foundation has been incredibly fulfilling. Their community-centered approach ensures that programs are sustainable and culturally appropriate.",
      author: "Dr. Maria Santos",
      role: "Healthcare Partner",
      image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Projects Section */}
      <section className={`py-20 bg-gradient-to-b from-gray-50 to-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 stagger-animation">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 gradient-text">
              Transforming Communities Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Through strategic partnerships and community-driven solutions, we're creating sustainable change that lasts for generations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <div 
                key={index}
                className="stagger-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              asChild
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our Global Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Measurable change through strategic community development
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center floating-stats">
              <div className="text-5xl sm:text-6xl font-bold text-teal-600 mb-3">108K+</div>
              <div className="text-lg text-gray-600 font-medium">Lives Transformed</div>
            </div>
            <div className="text-center floating-stats" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl sm:text-6xl font-bold text-green-600 mb-3">342</div>
              <div className="text-lg text-gray-600 font-medium">Projects Completed</div>
            </div>
            <div className="text-center floating-stats" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl sm:text-6xl font-bold text-pink-500 mb-3">25</div>
              <div className="text-lg text-gray-600 font-medium">Countries Served</div>
            </div>
            <div className="text-center floating-stats" style={{ animationDelay: '0.3s' }}>
              <div className="text-5xl sm:text-6xl font-bold text-teal-700 mb-3">15</div>
              <div className="text-lg text-gray-600 font-medium">Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Carousel */}
      <PartnersCarousel />

      {/* Photo Gallery Preview */}
      <PhotoGalleryPreview />

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-r from-teal-50 via-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Voices from the Field
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from the communities and partners we work alongside
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="slide-in-elegant"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 via-teal-700 to-green-600 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 floating-text">
            Join Our Mission for Change
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Every contribution, whether financial or volunteer time, helps us create meaningful impact in communities that need it most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Button 
              asChild
              size="lg"
              className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
            >
              <Link to="/donate" className="block text-center">Make a Donation</Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <Link to="/contact" className="block text-center">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default Index;
