
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const projects = [
    {
      title: "Clean Water Initiative",
      description: "Providing access to clean, safe drinking water for rural communities through well construction and water purification systems. This comprehensive program includes training local technicians for maintenance.",
      location: "Kenya, East Africa",
      date: "2024 - Ongoing",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Water & Sanitation",
      beneficiaries: 5000,
      status: "ongoing" as const
    },
    {
      title: "Education for All",
      description: "Building schools and providing educational resources to ensure every child has access to quality education. Includes teacher training and curriculum development programs.",
      location: "Guatemala, Central America",
      date: "2023 - Completed",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Education",
      beneficiaries: 1200,
      status: "completed" as const
    },
    {
      title: "Healthcare Mobile Clinics",
      description: "Bringing essential healthcare services to remote areas through mobile medical units and trained professionals. Focus on preventive care and maternal health.",
      location: "Philippines, Southeast Asia",
      date: "2024 - Upcoming",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Healthcare",
      beneficiaries: 8000,
      status: "upcoming" as const
    },
    {
      title: "Solar Energy Project",
      description: "Installing solar panels in rural communities to provide reliable electricity for homes, schools, and health clinics. Includes technical training for local maintenance.",
      location: "Tanzania, East Africa",
      date: "2023 - Completed",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Energy",
      beneficiaries: 3500,
      status: "completed" as const
    },
    {
      title: "Agricultural Training Program",
      description: "Teaching sustainable farming techniques to improve food security and income generation for rural families. Includes seed distribution and equipment provision.",
      location: "Bangladesh, South Asia",
      date: "2024 - Ongoing",
      image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Agriculture",
      beneficiaries: 2800,
      status: "ongoing" as const
    },
    {
      title: "Emergency Relief Fund",
      description: "Rapid response program providing immediate aid during natural disasters and humanitarian crises. Includes food, shelter, and medical supplies distribution.",
      location: "Global Response",
      date: "2024 - Ongoing",
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Emergency Relief",
      beneficiaries: 15000,
      status: "ongoing" as const
    }
  ];

  const categories = ["all", "Water & Sanitation", "Education", "Healthcare", "Energy", "Agriculture", "Emergency Relief"];
  const statuses = ["all", "ongoing", "completed", "upcoming"];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Discover how we're creating sustainable change across the globe through community-driven development initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Filter by:</span>
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing {filteredProjects.length} of {projects.length} projects
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <div 
                    key={index}
                    className="fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProjectCard {...project} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No projects found
              </h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setStatusFilter('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Want to Support a Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your donation can help us expand these life-changing initiatives to more communities in need.
          </p>
          
          <Button 
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            <a href="/donate">Make a Donation</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Projects;
