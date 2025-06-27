
import React from 'react';
import { Heart, Users, Globe, Award, Target, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Executive Director",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "15+ years in international development"
    },
    {
      name: "Dr. Michael Chen",
      role: "Program Director",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Medical background with focus on community health"
    },
    {
      name: "Elena Rodriguez",
      role: "Field Operations Manager",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Specialist in sustainable development projects"
    },
    {
      name: "James Okoye",
      role: "Community Engagement Lead",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Expert in grassroots community mobilization"
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
      title: "Community",
      description: "We believe in the power of collaboration and work hand-in-hand with local communities to create lasting change."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Our programs are designed to create long-term impact that continues to benefit communities for generations."
    },
    {
      icon: Award,
      title: "Transparency",
      description: "We maintain the highest standards of accountability and openly share our impact and financial information."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About HopeFoundation</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              For over 15 years, we've been dedicated to creating sustainable change in communities worldwide through education, healthcare, and development programs.
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
                  HopeFoundation was born from a simple belief: that every person deserves access to basic human needs like clean water, education, and healthcare. Founded in 2009 by a group of passionate volunteers, we started with a single project in rural Kenya.
                </p>
                <p>
                  Today, we've expanded our reach to 25 countries, completed over 120 projects, and positively impacted more than 50,000 lives. Our growth has been guided by the communities we serve, ensuring that every program addresses real, locally-identified needs.
                </p>
                <p>
                  What sets us apart is our commitment to sustainability and community ownership. We don't just provide aid; we work alongside communities to build capacity, transfer knowledge, and ensure that positive changes continue long after our projects end.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Community gathering"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-gray-900 p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm">Years of Impact</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To empower communities worldwide through sustainable development programs that address education, healthcare, and basic human needs.
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
                  A world where every person has access to the resources and opportunities needed to thrive and build a better future.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardHeader>
                <Heart className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Our Impact</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Creating lasting change through community-driven solutions that address root causes and build local capacity.
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
                  <value.icon className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals committed to making a difference</p>
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
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration & Legal */}
      <section className="py-16 bg-gray-50">
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
