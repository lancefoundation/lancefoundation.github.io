
import React, { useState } from 'react';
import { Camera, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'community', name: 'Community' },
    { id: 'education', name: 'Education' },
    { id: 'environment', name: 'Environment' },
    { id: 'wildlife', name: 'Wildlife' },
    { id: 'events', name: 'Events' }
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Community Leadership Workshop",
      category: "community",
      description: "Training local leaders to drive sustainable change"
    },
    {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Lake Conservation Project",
      category: "environment",
      description: "Protecting water resources for future generations"
    },
    {
      url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Digital Literacy Program",
      category: "education",
      description: "Bridging the digital divide in rural communities"
    },
    {
      url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Wildlife Sanctuary Visit",
      category: "wildlife",
      description: "Monitoring endangered species in their natural habitat"
    },
    {
      url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Animal Care Program",
      category: "wildlife",
      description: "Providing medical care for rescued animals"
    },
    {
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Annual Fundraising Gala",
      category: "events",
      description: "Celebrating our achievements and future goals"
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Camera className="h-16 w-16 mx-auto mb-6 text-teal-100" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Photo Gallery</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Explore our journey through powerful images that tell the story of hope, transformation, and community impact.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Filter by category:</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-teal-600 to-green-600 text-white'
                    : 'border-teal-600 text-teal-600 hover:bg-teal-50'
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <Card 
                key={index} 
                className="overflow-hidden card-hover cursor-pointer group"
              >
                <CardContent className="p-0">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-bold mb-2">{image.title}</h3>
                      <p className="text-sm opacity-90">{image.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images found for this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
