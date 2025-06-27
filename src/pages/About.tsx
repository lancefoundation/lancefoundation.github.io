
import React from 'react';
import { Heart, Users, Globe, Award, Target, Eye, BookOpen, Stethoscope, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Lance Williams",
      role: "Founder & Executive Director",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Dedicated to transforming communities through sustainable development"
    },
    {
      name: "Sarah Johnson",
      role: "Program Director",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "15+ years in international development and community health"
    },
    {
      name: "Dr. Michael Chen",
      role: "Medical Director",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Leading healthcare initiatives in underserved communities"
    },
    {
      name: "Elena Rodriguez",
      role: "Field Operations Manager",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Specialist in sustainable development and community engagement"
    }
  ];

  const focusAreas = [
    {
      icon: Stethoscope,
      title: "Healthcare Access",
      description: "Providing essential medical services and health education to underserved communities worldwide."
    },
    {
      icon: BookOpen,
      title: "Education & Literacy",
      description: "Building schools, training teachers, and creating educational opportunities for children and adults."
    },
    {
      icon: Droplets,
      title: "Clean Water & Sanitation",
      description: "Developing sustainable water systems and promoting hygiene practices in rural communities."
    },
    {
      icon: Users,
      title: "Community Development",
      description: "Empowering local leaders and building capacity for long-term sustainable growth."
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every challenge with empathy and understanding, recognizing the dignity in every person we serve."
    },
    {
      icon: Users,
      title: "Community Partnership",
      description: "We work hand-in-hand with local communities, ensuring programs are culturally appropriate and sustainable."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Our programs create long-term impact through capacity building and local ownership."
    },
    {
      icon: Award,
      title: "Accountability",
      description: "We maintain transparency in all operations and measure impact through rigorous evaluation."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About The Lance Foundation</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Transforming lives through sustainable community development, healthcare, education, and empowerment programs that create lasting change.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The Lance Foundation was founded with a vision to create sustainable change in communities worldwide. Named after our founder Dr. Lance Williams, our organization began as a grassroots initiative focused on addressing the most pressing needs of underserved populations.
                </p>
                <p>
                  What started as a small medical mission has evolved into a comprehensive development organization working across multiple sectors. We believe that true transformation happens when communities are empowered to lead their own development journey.
                </p>
                <p>
                  Today, we operate programs in healthcare, education, water and sanitation, and community development, always with the goal of building local capacity and ensuring program sustainability beyond our direct involvement.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Community development work"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-green-500 text-white p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm">Years of Impact</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Focus Areas</h2>
            <p className="text-xl text-gray-600">Creating impact through targeted interventions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {focusAreas.map((area, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <area.icon className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{area.title}</h4>
                  <p className="text-gray-600 text-sm">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8">
              <CardHeader>
                <Target className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To empower communities through sustainable development programs that address healthcare, education, and basic human needs while building local capacity for lasting change.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardHeader>
                <Eye className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A world where every community has the resources, knowledge, and capacity to thrive independently and sustainably.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardHeader>
                <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Our Impact</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Creating measurable, sustainable change through community-driven solutions that address root causes and build local ownership.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <value.icon className="h-10 w-10 text-teal-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Experienced professionals committed to sustainable development</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-teal-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration & Legal */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Legal & Registration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Charity Registration</h4>
              <p className="text-gray-600">#12345678</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Tax Exempt Status</h4>
              <p className="text-gray-600">501(c)(3) Approved</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Financial Transparency</h4>
              <p className="text-gray-600">GuideStar Gold Seal</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
