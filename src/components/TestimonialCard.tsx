
import React from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  image
}) => {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <Quote className="h-8 w-8 text-blue-500 mb-4" />
        
        <blockquote className="text-gray-700 mb-6 text-lg italic leading-relaxed">
          "{quote}"
        </blockquote>
        
        <div className="flex items-center gap-4">
          <img 
            src={image} 
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-900">{author}</div>
            <div className="text-sm text-gray-500">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
