import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, MapPin, Users, DollarSign, Save, Plus, X } from 'lucide-react';

interface JobData {
  title: string;
  description: string;
  requirements: string;
  location: string;
  job_type: string;
  salary_range: string;
  deadline: string;
  status: 'active' | 'inactive' | 'closed';
  positions_available: number;
  department: string;
  experience_level: string;
  benefits: string[];
  skills_required: string[];
}

interface JobPostingFormProps {
  existingJob?: any;
  onSaved?: () => void;
  onCancel?: () => void;
}

const JobPostingForm = ({ existingJob, onSaved, onCancel }: JobPostingFormProps) => {
  const [jobData, setJobData] = useState<JobData>({
    title: existingJob?.title || '',
    description: existingJob?.description || '',
    requirements: existingJob?.requirements || '',
    location: existingJob?.location || '',
    job_type: existingJob?.job_type || 'full-time',
    salary_range: existingJob?.salary_range || '',
    deadline: existingJob?.deadline || '',
    status: existingJob?.status || 'active',
    positions_available: existingJob?.positions_available || 1,
    department: existingJob?.department || '',
    experience_level: existingJob?.experience_level || 'entry',
    benefits: existingJob?.benefits || [],
    skills_required: existingJob?.skills_required || []
  });
  
  const [newBenefit, setNewBenefit] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!jobData.title || !jobData.description) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const jobPayload = {
        ...jobData,
        deadline: jobData.deadline ? new Date(jobData.deadline).toISOString().split('T')[0] : null,
        updated_at: new Date().toISOString()
      };

      let result;
      if (existingJob) {
        result = await supabase
          .from('job_postings')
          .update(jobPayload)
          .eq('id', existingJob.id);
      } else {
        result = await supabase
          .from('job_postings')
          .insert([{
            ...jobPayload,
            created_at: new Date().toISOString()
          }]);
      }

      if (result.error) throw result.error;

      toast({
        title: 'Success',
        description: `Job ${existingJob ? 'updated' : 'created'} successfully!`,
      });

      if (onSaved) onSaved();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || `Failed to ${existingJob ? 'update' : 'create'} job.`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !jobData.benefits.includes(newBenefit.trim())) {
      setJobData({
        ...jobData,
        benefits: [...jobData.benefits, newBenefit.trim()]
      });
      setNewBenefit('');
    }
  };

  const removeBenefit = (benefit: string) => {
    setJobData({
      ...jobData,
      benefits: jobData.benefits.filter(b => b !== benefit)
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !jobData.skills_required.includes(newSkill.trim())) {
      setJobData({
        ...jobData,
        skills_required: [...jobData.skills_required, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setJobData({
      ...jobData,
      skills_required: jobData.skills_required.filter(s => s !== skill)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          {existingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
        </CardTitle>
        <CardDescription>
          {existingJob ? 'Update job details and requirements' : 'Fill in the details for your new job posting'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={jobData.title}
              onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
              placeholder="e.g., Frontend Developer, Marketing Manager"
            />
          </div>

          <div>
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={jobData.department}
              onChange={(e) => setJobData({ ...jobData, department: e.target.value })}
              placeholder="e.g., Technology, Marketing"
            />
          </div>

          <div>
            <Label htmlFor="positions">Positions Available</Label>
            <Input
              id="positions"
              type="number"
              min="1"
              value={jobData.positions_available}
              onChange={(e) => setJobData({ ...jobData, positions_available: parseInt(e.target.value) || 1 })}
            />
          </div>

          <div>
            <Label htmlFor="job_type">Job Type</Label>
            <Select value={jobData.job_type} onValueChange={(value) => setJobData({ ...jobData, job_type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="attachee">Attachee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="experience_level">Experience Level</Label>
            <Select value={jobData.experience_level} onValueChange={(value) => setJobData({ ...jobData, experience_level: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={jobData.location}
              onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
              placeholder="e.g., Nairobi, Remote, Hybrid"
            />
          </div>

          <div>
            <Label htmlFor="salary_range">Salary Range</Label>
            <Input
              id="salary_range"
              value={jobData.salary_range}
              onChange={(e) => setJobData({ ...jobData, salary_range: e.target.value })}
              placeholder="e.g., KES 80,000 - 120,000"
            />
          </div>

          <div>
            <Label htmlFor="deadline">Application Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={jobData.deadline}
              onChange={(e) => setJobData({ ...jobData, deadline: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={jobData.status} onValueChange={(value: 'active' | 'inactive' | 'closed') => setJobData({ ...jobData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Job Description *</Label>
          <Textarea
            id="description"
            value={jobData.description}
            onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
            placeholder="Detailed job description, responsibilities, and what the role entails..."
            rows={6}
          />
        </div>

        {/* Requirements */}
        <div>
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea
            id="requirements"
            value={jobData.requirements}
            onChange={(e) => setJobData({ ...jobData, requirements: e.target.value })}
            placeholder="Required qualifications, experience, and skills..."
            rows={4}
          />
        </div>

        {/* Skills Required */}
        <div>
          <Label>Skills Required</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill..."
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <Button type="button" onClick={addSkill} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobData.skills_required.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
              </Badge>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <Label>Benefits</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              placeholder="Add a benefit..."
              onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
            />
            <Button type="button" onClick={addBenefit} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobData.benefits.map((benefit, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                {benefit}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeBenefit(benefit)} />
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {existingJob ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {existingJob ? 'Update Job' : 'Create Job'}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPostingForm;