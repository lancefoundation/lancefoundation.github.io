
import React from 'react';
import { TrendingUp, Users, Globe, Award, BarChart3, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Impact = () => {
  const impactStats = [
    {
      icon: Users,
      title: "Lives Transformed",
      value: "108,500+",
      description: "People directly impacted by our programs",
      color: "text-teal-600"
    },
    {
      icon: Globe,
      title: "Global Reach",
      value: "25",
      description: "Countries where we operate",
      color: "text-green-600"
    },
    {
      icon: Award,
      title: "Projects Completed",
      value: "342",
      description: "Successful development initiatives",
      color: "text-blue-600"
    },
    {
      icon: Target,
      title: "Communities Served",
      value: "156",
      description: "Rural and urban communities reached",
      color: "text-purple-600"
    }
  ];

  const programProgress = [
    {
      program: "Healthcare Access",
      progress: 85,
      target: "30,000 people",
      achieved: "25,500 people",
      color: "bg-red-500"
    },
    {
      program: "Education & Literacy",
      progress: 78,
      target: "20,000 students",
      achieved: "15,600 students",
      color: "bg-blue-500"
    },
    {
      program: "Clean Water Access",
      progress: 92,
      target: "40,000 people",
      achieved: "36,800 people",
      color: "bg-cyan-500"
    },
    {
      program: "Community Development",
      progress: 73,
      target: "12,000 beneficiaries",
      achieved: "8,760 beneficiaries",
      color: "bg-green-500"
    }
  ];

  const stories = [
    {
      title: "Clean Water Changes Everything",
      location: "Kenya",
      impact: "5,000 people now have access to clean water",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "The installation of 12 water wells in rural Kenya has transformed entire communities, reducing waterborne diseases by 80% and allowing children to attend school instead of walking hours for water."
    },
    {
      title: "Education Opens Doors",
      location: "Guatemala",
      impact: "1,200 children enrolled in new schools",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Building 8 schools and training 45 teachers has brought quality education to remote villages, with 95% of students showing improved literacy rates within the first year."
    },
    {
      title: "Healthcare Reaches Remote Areas",
      location: "Philippines",
      impact: "8,000 people received medical care",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Mobile health clinics have provided essential medical services to isolated island communities, including prenatal care, immunizations, and treatment for chronic conditions."
    }
  ];

  const financialTransparency = [
    { category: "Program Services", percentage: 85, amount: "$2,125,000" },
    { category: "Administration", percentage: 10, amount: "$250,000" },
    { category: "Fundraising", percentage: 5, amount: "$125,000" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <TrendingUp className="h-16 w-16 mx-auto mb-6 text-teal-100" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Impact</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Measuring the tangible difference we're making in communities worldwide through data-driven development.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Impact by the Numbers
            </h2>
            <p className="text-xl text-gray-600">
              Every number represents a life changed, a community empowered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h4>
                  <p className="text-gray-600 text-sm">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Progress */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              2024 Program Progress
            </h2>
            <p className="text-xl text-gray-600">
              Tracking our progress towards annual goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programProgress.map((program, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{program.program}</span>
                    <span className="text-2xl font-bold">{program.progress}%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={program.progress} className="mb-4" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Achieved: {program.achieved}</span>
                    <span>Target: {program.target}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Stories of Change
            </h2>
            <p className="text-xl text-gray-600">
              Real impact in real communities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-teal-600 font-medium mb-2">{story.location}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{story.title}</h3>
                  <div className="text-lg font-semibold text-green-600 mb-3">{story.impact}</div>
                  <p className="text-gray-600 text-sm">{story.description}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Financial Transparency
            </h2>
            <p className="text-xl text-gray-600">
              How your donations are used (2023 Annual Report)
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Fund Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {financialTransparency.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.category}</span>
                      <div className="text-right">
                        <span className="font-bold">{item.percentage}%</span>
                        <div className="text-sm text-gray-600">{item.amount}</div>
                      </div>
                    </div>
                    <Progress value={item.percentage} className="h-3" />
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <p className="text-center text-green-800">
                  <strong>85 cents of every dollar</strong> goes directly to program services
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Be Part of Our Impact
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of supporters who are helping us create measurable change worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Donate Now
            </button>
            
            <button 
              className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              View Annual Report
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
