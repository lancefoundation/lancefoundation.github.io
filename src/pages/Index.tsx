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
      title: "Clean Water Initiative",
      description: "Providing access to clean, safe drinking water for rural communities through well construction and water purification systems.",
      location: "Kenya, East Africa",
      date: "2024 - Ongoing",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Water & Sanitation",
      beneficiaries: 5000,
      status: "ongoing" as const
    },
    {
      title: "Education for All",
      description: "Building schools and providing educational resources to ensure every child has access to quality education.",
      location: "Guatemala, Central America",
      date: "2023 - Completed",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Education",
      beneficiaries: 1200,
      status: "completed" as const
    },
    {
      title: "Wildlife Conservation Program",
      description: "Protecting endangered species and their habitats through community-based conservation efforts.",
      location: "Philippines, Southeast Asia",
      date: "2024 - Upcoming",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Environment",
      beneficiaries: 8000,
      status: "upcoming" as const
    }
  ];

  const testimonials = [
    {
      quote: "Thanks to The Lance Foundation's education program, my daughter can now attend school. This opportunity will change our family's future forever.",
      author: "Maria Santos",
      role: "Parent, Guatemala",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "The clean water project transformed our entire village. We no longer have to walk hours for water, and our children are healthier.",
      author: "John Kamau",
      role: "Village Elder, Kenya",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Working with The Lance Foundation has been incredibly rewarding. Their commitment to sustainable development truly makes a lasting impact.",
      author: "Dr. Sarah Chen",
      role: "Environmental Scientist",
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
              Our Impact in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we're making a difference across the globe through sustainable development projects that create lasting change.
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
              Measuring Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              Every donation creates measurable change in communities worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center fade-in-up">
              <div className="text-4xl sm:text-5xl font-bold text-teal-600 mb-2">$2.5M</div>
              <div className="text-lg text-gray-600">Funds Raised</div>
            </div>
            <div className="text-center fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-lg text-gray-600">Directly to Programs</div>
            </div>
            <div className="text-center fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl sm:text-5xl font-bold text-pink-500 mb-2">500+</div>
              <div className="text-lg text-gray-600">Volunteers</div>
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
              Stories of Hope
            </h2>
            <p className="text-xl text-gray-600">
              Hear from the communities and volunteers whose lives have been transformed
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

      {/* Call to Action Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your support can transform lives and build stronger communities. Every contribution matters.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              <Link to="/donate">Start Donating</Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              <Link to="/contact">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default Index;
