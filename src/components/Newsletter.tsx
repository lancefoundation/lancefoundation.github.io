
import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive our latest updates and impact stories.",
      });
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 p-3 rounded-full">
            <Mail className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Stay Connected with Our Mission
        </h2>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Get inspiring stories, project updates, and ways to make a difference delivered to your inbox monthly.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-900 border-t-transparent" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
        
        <p className="text-sm text-white/70 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
