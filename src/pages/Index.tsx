
import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import TestimonialCard from '@/components/TestimonialCard';
import PhotoGalleryPreview from '@/components/PhotoGalleryPreview';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      <section className={`py-16 bg-gray-50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Transforming Communities Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Through strategic partnerships and community-driven solutions, we're creating sustainable change that lasts for generations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div 
                key={index}
                className="fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              asChild
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Global Impact
            </h2>
            <p className="text-xl text-gray-600">
              Measurable change through strategic community development
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center fade-in-up">
              <div className="text-4xl sm:text-5xl font-bold text-teal-600 mb-2">108K+</div>
              <div className="text-lg text-gray-600">Lives Transformed</div>
            </div>
            <div className="text-center fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">342</div>
              <div className="text-lg text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl sm:text-5xl font-bold text-pink-500 mb-2">25</div>
              <div className="text-lg text-gray-600">Countries Served</div>
            </div>
            <div className="text-center fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl sm:text-5xl font-bold text-teal-700 mb-2">15</div>
              <div className="text-lg text-gray-600">Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <PhotoGalleryPreview />

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Voices from the Field
            </h2>
            <p className="text-xl text-gray-600">
              Hear from the communities and partners we work alongside
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="slide-in-right"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Approach to Development
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We believe in sustainable, community-driven solutions that create lasting change. Our programs are designed with local input and built for long-term success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Listen & Learn</h3>
              <p className="text-gray-600">We start by understanding community needs, priorities, and existing resources through extensive consultation.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Partner & Plan</h3>
              <p className="text-gray-600">We collaborate with local leaders and organizations to design culturally appropriate and sustainable solutions.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-500">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Implement & Transfer</h3>
              <p className="text-gray-600">We execute programs while building local capacity, ensuring communities can maintain and expand the work independently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Join Our Mission for Change
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Every contribution, whether financial or volunteer time, helps us create meaningful impact in communities that need it most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              <Link to="/donate">Make a Donation</Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              <Link to="/contact">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default Index;
