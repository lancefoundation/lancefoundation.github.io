
import React, { useState } from 'react';
import { Stethoscope, BookOpen, Droplets, Users, Building, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Programs = () => {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const programs = [
    {
      id: 'healthcare',
      title: 'Healthcare Access Programs',
      icon: Stethoscope,
      description: 'Comprehensive healthcare services including mobile clinics, maternal health, and disease prevention programs.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      details: [
        'Mobile health clinics reaching remote communities',
        'Maternal and child health programs',
        'Immunization and disease prevention campaigns',
        'Training of community health workers',
        'Medical equipment and supplies distribution'
      ],
      impact: {
        beneficiaries: '25,000+',
        locations: '12 countries',
        metric: 'Lives improved'
      }
    },
    {
      id: 'education',
      title: 'Education & Literacy',
      icon: BookOpen,
      description: 'Building educational infrastructure and providing quality learning opportunities for children and adults.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      details: [
        'School construction and renovation projects',
        'Teacher training and capacity building',
        'Adult literacy programs',
        'Educational materials and technology provision',
        'Scholarship programs for disadvantaged students'
      ],
      impact: {
        beneficiaries: '15,000+',
        locations: '8 countries',
        metric: 'Students educated'
      }
    },
    {
      id: 'water',
      title: 'Water & Sanitation',
      icon: Droplets,
      description: 'Providing clean water access and improving sanitation facilities in underserved communities.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      details: [
        'Water well drilling and maintenance',
        'Water purification system installation',
        'Sanitation facility construction',
        'Hygiene education programs',
        'Community water management training'
      ],
      impact: {
        beneficiaries: '35,000+',
        locations: '15 countries',
        metric: 'People with clean water access'
      }
    },
    {
      id: 'community',
      title: 'Community Development',
      icon: Users,
      description: 'Empowering communities through leadership development and capacity building initiatives.',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      details: [
        'Leadership training programs',
        'Community organizing workshops',
        'Microfinance and entrepreneurship support',
        'Women empowerment initiatives',
        'Youth development programs'
      ],
      impact: {
        beneficiaries: '8,500+',
        locations: '10 countries',
        metric: 'Community leaders trained'
      }
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Development',
      icon: Building,
      description: 'Building essential infrastructure to support community growth and development.',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      details: [
        'Road and bridge construction',
        'Community center building',
        'Solar energy installation',
        'Telecommunications infrastructure',
        'Agricultural facility development'
      ],
      impact: {
        beneficiaries: '20,000+',
        locations: '6 countries',
        metric: 'Communities connected'
      }
    },
    {
      id: 'innovation',
      title: 'Innovation & Technology',
      icon: Lightbulb,
      description: 'Leveraging technology and innovation to solve development challenges effectively.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      details: [
        'Digital literacy training',
        'Technology for education programs',
        'Telemedicine initiatives',
        'Agricultural technology transfer',
        'Innovation labs and maker spaces'
      ],
      impact: {
        beneficiaries: '5,000+',
        locations: '4 countries',
        metric: 'Tech-enabled solutions'
      }
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Programs</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Comprehensive development programs designed to create sustainable change and empower communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Six Pillars of Development
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our integrated approach addresses multiple aspects of community development to ensure sustainable and lasting impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card 
                key={program.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProgram(program.id)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <program.icon className="h-6 w-6 text-teal-600" />
                    <Badge variant="secondary" className="text-xs">
                      {program.impact.locations}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-teal-600">
                      {program.impact.beneficiaries}
                    </span>
                    <span className="text-gray-500">{program.impact.metric}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details Modal/Section */}
      {selectedProgram && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {(() => {
              const program = programs.find(p => p.id === selectedProgram);
              if (!program) return null;
              
              return (
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="h-64 lg:h-auto">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <program.icon className="h-8 w-8 text-teal-600" />
                        <h3 className="text-2xl font-bold text-gray-900">{program.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 mb-6">{program.description}</p>
                      
                      <h4 className="font-semibold text-gray-900 mb-3">Key Activities:</h4>
                      <ul className="space-y-2 mb-6">
                        {program.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-4 bg-teal-50 rounded-lg">
                          <div className="text-2xl font-bold text-teal-600">{program.impact.beneficiaries}</div>
                          <div className="text-sm text-gray-600">{program.impact.metric}</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{program.impact.locations}</div>
                          <div className="text-sm text-gray-600">Active Locations</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button asChild className="flex-1">
                          <Link to="/donate">Support This Program</Link>
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedProgram(null)}>
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })()}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your support helps us expand these vital programs to reach more communities in need.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white px-8 py-4"
            >
              <Link to="/donate">Make a Donation</Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4"
            >
              <Link to="/contact">Become a Partner</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
