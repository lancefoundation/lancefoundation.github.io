import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Briefcase, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface JobPosting {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  job_type: string;
  salary_range: string;
  deadline: string;
  status: string;
  created_at: string;
}

const Careers = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load job postings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading careers...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
            Join Our Mission
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Be part of our team making a difference in communities across the world. 
            Explore opportunities to grow while serving humanity.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">50+</h3>
              <p className="text-muted-foreground">Team Members</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <Briefcase className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">{jobs.length}</h3>
              <p className="text-muted-foreground">Open Positions</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">5+</h3>
              <p className="text-muted-foreground">Countries</p>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Current Openings</h2>
          {jobs.length === 0 ? (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-12 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Open Positions</h3>
                <p className="text-muted-foreground">
                  We don't have any open positions right now, but we're always looking for passionate individuals. 
                  Check back soon or reach out to us directly.
                </p>
              </CardContent>
            </Card>
          ) : (
            jobs.map((job) => (
              <Card key={job.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-foreground">{job.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{job.job_type}</Badge>
                      {job.salary_range && <Badge variant="secondary">{job.salary_range}</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {job.description && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Description</h4>
                        <p className="text-muted-foreground">{job.description}</p>
                      </div>
                    )}
                    {job.requirements && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Requirements</h4>
                        <p className="text-muted-foreground">{job.requirements}</p>
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4">
                      {job.deadline && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Deadline: {new Date(job.deadline).toLocaleDateString()}
                        </div>
                      )}
                      <Button 
                        onClick={() => window.open(`mailto:careers@thelancefoundation.org?subject=Application for ${job.title}&body=Dear Hiring Team,%0D%0A%0D%0AI am interested in applying for the ${job.title} position.%0D%0A%0D%0APlease find my application details below:%0D%0A%0D%0ABest regards`)}
                        className="md:ml-auto"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Contact Section */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">Don't See the Right Position?</h3>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals who share our passion for making a difference. 
              Send us your resume and tell us how you'd like to contribute.
            </p>
            <Button 
              variant="outline"
              onClick={() => window.open('mailto:careers@thelancefoundation.org?subject=General Application&body=Dear Hiring Team,%0D%0A%0D%0AI am interested in opportunities with The Lance Foundation.%0D%0A%0D%0APlease find my details below:%0D%0A%0D%0ABest regards')}
            >
              Contact HR Team
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Careers;