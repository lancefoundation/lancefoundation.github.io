
import React from 'react';
import { Mail, Linkedin, Globe, Award, Users, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Leadership = () => {
  const leaders = [
    {
      name: "Dr. Denis Gathua",
      role: "Founder & Chief Executive Office",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Denis Gathua founded The Lance Foundation in 2019 with a vision to create sustainable change in underserved communities worldwide. With over 20 years of experience in international development, he has led transformative projects across Africa, Asia, and Latin America.",
      education: "Bsc. in Information Technology, Masinde Muliro University of Science and technology",
      experience: "IT Incident Manager at Sportserve",
      achievements: [
        "Led development of descent housing for a Mother with 5 Autistic Kids in Nyandarua County",
        "Established 19 Charity Events all over the Country",
        "Recipient of the Global Humanitarian Award 2020"
      ],
      email: "denis.gathua@thelancefoundation.org",
      linkedin: "https://linkedin.com/in/denisgathua"
    },
    {
      name: "Bonface Itimu Maina",
      role: "Executive Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Bonface Itimu Maina oversees all program implementation and evaluation across our global operations. His expertise in community development has been instrumental in achieving our mission outcomes.",
      education: "B.Arts. from Masinde Muliro University of Science and technology",
      experience: "5+ years in Community Development and Public Administration",
      achievements: [
        "Developed evidence-based program evaluation frameworks",
        "Led maternal health initiatives reaching 30,000+ women",
        "Published 25+ peer-reviewed articles on global health"
      ],
      email: "itimu.maina@thelancefoundation.org",
      linkedin: "https://linkedin.com/in/bonfaceitimu"
    },
    {
      name: "Michael Chen",
      role: "Director of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Michael Chen brings extensive experience in logistics and project management to ensure efficient program delivery. He coordinates our field operations across multiple countries and manages strategic partnerships.",
      education: "MBA from Wharton School, B.S. in International Business",
      experience: "12+ years in operations management and logistics",
      achievements: [
        "Streamlined operations reducing costs by 30%",
        "Established partnerships with 40+ local organizations",
        "Managed $15M+ in program funding"
      ],
      email: "michael.chen@thelancefoundation.org",
      linkedin: "https://linkedin.com/in/michael-chen-ops"
    }, /**
    {
      name: "Dr. Elena Rodriguez",
      role: "Medical Director",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Dr. Elena Rodriguez leads our healthcare initiatives and ensures medical programs meet the highest standards of care. Her expertise in tropical medicine and public health has been crucial in our health program success.",
      education: "M.D. from University of California, Tropical Medicine Certificate",
      experience: "18+ years in global health and clinical practice",
      achievements: [
        "Established telemedicine programs in 12 countries",
        "Trained 200+ community health workers",
        "Reduced child mortality rates by 40% in program areas"
      ],
      email: "elena.rodriguez@thelancefoundation.org",
      linkedin: "https://linkedin.com/in/elena-rodriguez-md"
    }, **/
    {
      name: "Mary Wanjiku kariuki",
      role: "Chief Financial Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Mary Wanjiku kariuki ensures financial transparency and accountability across all foundation operations. Her background in nonprofit finance and audit has strengthened our financial management and donor relations.",
      education: "B.Arts ,Kenyatta University",
      experience: "7+ years in nonprofit financial management",
      achievements: [
        "Achieved 4-star rating from Charity Navigator",
        "Implemented comprehensive financial tracking systems",
        "Managed Foundations annual program funding and budgetary Allocations"
      ],
      email: "wanjiku.kariuki@thelancefoundation.org",
      linkedin: "https://linkedin.com/in/wanjikukariuki"
    },
    {
      name: "Njambi Gaitho",
      role: "Communication and Digital Creatives",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Njambi Gaitho leads our community engagement efforts, ensuring programs are culturally appropriate and community-driven. Her background in anthropology and development studies brings valuable insights to our work.",
      education: "B.Arts. in Journalism Studies",
      experience: "14+ years in community development and cultural research",
      achievements: [
        "Developed community participation frameworks",
        "Facilitated partnerships with 60+ community leaders",
        "Implemented culturally-sensitive program designs"
      ],
      email: "maria.santos@thelancefoundation.org",
      linkedin: "https://linkedin.com/in/maria-santos-phd"
    }
  ];

  const boardMembers = [
    {
      name: "Ambassador Patricia White",
      role: "Board Chairperson",
      bio: "Former U.S. Ambassador to Kenya and expert in international relations",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Dr. Robert Kim",
      role: "Board Vice-Chair",
      bio: "Renowned surgeon and global health advocate",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Lisa Anderson",
      role: "Board Treasurer",
      bio: "Former CFO of major international development organization",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Users className="h-16 w-16 mx-auto mb-6 text-teal-100" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Leadership Team</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Meet the dedicated professionals leading The Lance Foundation's mission to transform communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Executive Team</h2>
            <p className="text-xl text-gray-600">Experienced leaders driving sustainable change</p>
          </div>

          <div className="space-y-12">
            {leaders.map((leader, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                    {/* Photo and Basic Info */}
                    <div className="text-center lg:text-left">
                      <Avatar className="w-48 h-48 mx-auto lg:mx-0 mb-4">
                        <AvatarImage src={leader.image} alt={leader.name} />
                        <AvatarFallback className="text-4xl">{leader.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                      <p className="text-teal-600 font-semibold text-lg mb-4">{leader.role}</p>
                      <div className="flex justify-center lg:justify-start space-x-3">
                        <a href={`mailto:${leader.email}`} className="text-gray-600 hover:text-teal-600">
                          <Mail className="h-5 w-5" />
                        </a>
                        <a href={leader.linkedin} className="text-gray-600 hover:text-teal-600">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </div>
                    </div>

                    {/* Bio and Details */}
                    <div className="lg:col-span-2 space-y-6">
                      <p className="text-gray-600 leading-relaxed">{leader.bio}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                          <p className="text-gray-600 text-sm">{leader.education}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                          <p className="text-gray-600 text-sm">{leader.experience}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Achievements</h4>
                        <ul className="space-y-2">
                          {leader.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <Award className="h-4 w-4 text-teal-600 mt-1 mr-2 flex-shrink-0" />
                              <span className="text-gray-600 text-sm">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Board of Directors</h2>
            <p className="text-xl text-gray-600">Providing strategic guidance and oversight</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {boardMembers.map((member, index) => (
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

      {/* Organizational Values */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Our Leadership Principles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Target className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Visionary Leadership</h4>
              <p className="text-gray-600">Setting ambitious goals and inspiring teams to achieve transformative impact.</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Collaborative Approach</h4>
              <p className="text-gray-600">Working together with communities, partners, and stakeholders for sustainable solutions.</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Ethical Excellence</h4>
              <p className="text-gray-600">Maintaining the highest standards of integrity and accountability in all our work.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
