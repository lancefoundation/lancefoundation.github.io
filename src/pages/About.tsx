
import React from 'react';
import { Heart, Users, Globe, Award, Target, Eye, BookOpen, Stethoscope, Droplets, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const About = () => {
  const milestones = [
    {
      year: "2019",
      title: "Foundation Established",
      description: "The Lance Foundation was founded with a mission to address critical health and development challenges in underserved communities."
    },
    {
      year: "2010",
      title: "First Major Project",
      description: "Launched our first large-scale clean water initiative in Kenya, serving 5,000 people in rural communities."
    },
    {
      year: "2015",
      title: "Healthcare Expansion",
      description: "Established 12 healthcare clinics across three countries, providing essential medical services to remote areas."
    },
    {
      year: "2018",
      title: "Education Programs Launch",
      description: "Initiated comprehensive education programs, building schools and training teachers in underserved regions."
    },
    {
      year: "2020",
      title: "COVID-19 Response",
      description: "Rapidly adapted programs to support communities during the pandemic, distributing PPE and supporting healthcare systems."
    },
    {
      year: "2023",
      title: "Milestone Achievement",
      description: "Reached over 100,000 lives directly impacted through our comprehensive development programs."
    }
  ];

  const globalPresence = [
    {
      region: "Central Kenya",
      counties: ["Muranga", "Nyandarua", "Kiambu", "Nairobi" , "Nyeri"],
      programs: ["Clean Water", "Healthcare", "Education"],
      beneficiaries: "1,000+"
    },
    {
      region: "North Eastern Region",
      counties: ["Wajir", "Mandera", "Tana River"],
      programs: ["Healthcare", "Community Development"],
      beneficiaries: "200+"
    },
    {
      region: "Rift Valley Region",
      countries: ["Nakuru", "Eldoret", "Nandi"],
      programs: ["Education", "Healthcare", "Clean Water"],
      beneficiaries: "300+"
    }
  ];

  const focusAreas = [
    {
      icon: Stethoscope,
      title: "Healthcare Access",
      description: "Providing essential medical services, training healthcare workers, and establishing sustainable healthcare systems in underserved communities.",
      impact: "2 mobile clinics established, 20 healthcare workers volunteered"
    },
    {
      icon: BookOpen,
      title: "Education & Literacy",
      description: "Building schools, training teachers, providing educational materials, and creating opportunities for children and adults to learn and grow.",
      impact: "3 schools Supported, 1,200+ students mentored, 85+ teachers Recognised"
    },
    {
      icon: Droplets,
      title: "Clean Water & Sanitation",
      description: "Developing sustainable water systems, promoting hygiene practices, and ensuring access to clean water for drinking and sanitation.",
      impact: "5 wells Equipped, 4,000+ people with clean water access"
    },
    {
      icon: Users,
      title: "Community Development",
      description: "Empowering local leaders, building capacity, and supporting economic development initiatives that create sustainable change.",
      impact: "156 communities served, 300+ local leaders trained"
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
              Transforming lives through sustainable community development, healthcare, education, and empowerment programs that create lasting change across the globe.
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
                  The Lance Foundation was founded in 2019 by Denis Gathua and friends  with a vision to create sustainable change in communities worldwide. What began as a small medical mission has evolved into a comprehensive development organization working across multiple sectors to address the root causes of poverty and inequality.
                </p>
                <p>
                  Named after our founder, our organization has grown from serving a single community to operating in 25 countries across three continents. We believe that true transformation happens when communities are empowered to lead their own development journey, which is why we focus on building local capacity and ensuring program sustainability.
                </p>
                <p>
                  Today, we operate integrated programs in healthcare, education, water and sanitation, and community development, always with the goal of creating measurable, lasting impact that continues long after our direct involvement ends.
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
                <div className="text-2xl font-bold">1,085+</div>
                <div className="text-sm">Lives Transformed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our mission to transform communities</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-teal-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <Calendar className="h-5 w-5 text-teal-600 mr-2" />
                          <span className="text-2xl font-bold text-teal-600">{milestone.year}</span>
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Countrywide Presence</h2>
            <p className="text-xl text-gray-600">Working across Kenya to create lasting change</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {globalPresence.map((region, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <MapPin className="h-6 w-6 text-teal-600 mr-2" />
                    <h3 className="text-xl font-bold text-gray-900">{region.region}</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Counties</h4>
                      <p className="text-gray-600">{region.countries.join(', ')}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Programs</h4>
                      <p className="text-gray-600">{region.programs.join(', ')}</p>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-lg font-semibold text-green-600">{region.beneficiaries}</span>
                      <span className="text-gray-600 ml-1">beneficiaries</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {focusAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <area.icon className="h-12 w-12 text-teal-600 mb-4" />
                  <h4 className="text-2xl font-semibold text-gray-900 mb-4">{area.title}</h4>
                  <p className="text-gray-600 mb-4">{area.description}</p>
                  <div className="flex items-center text-green-600 font-semibold">
                    <Award className="h-4 w-4 mr-2" />
                    <span className="text-sm">{area.impact}</span>
                  </div>
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

      {/* Financial Transparency */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Financial Transparency</h2>
            <p className="text-xl text-gray-600">Committed to accountability and responsible stewardship</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent>
                <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Program Services</h4>
                <p className="text-gray-600 text-sm">Direct investment in our mission programs</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <Award className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">4-Star</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Charity Navigator</h4>
                <p className="text-gray-600 text-sm">Highest rating for accountability and transparency</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">501(c)(3)</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Tax Exempt</h4>
                <p className="text-gray-600 text-sm">Registered nonprofit organization</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
