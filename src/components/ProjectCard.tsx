
import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  category: string;
  beneficiaries: number;
  status: 'ongoing' | 'completed' | 'upcoming';
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  location,
  date,
  image,
  category,
  beneficiaries,
  status
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="overflow-hidden card-hover cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${getStatusColor(status)} text-white capitalize`}>
            {status}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-900">
            {category}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-500" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-yellow-500" />
            <span>{beneficiaries.toLocaleString()} beneficiaries</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
