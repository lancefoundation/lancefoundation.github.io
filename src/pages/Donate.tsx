import React, { useState } from 'react';
import { Heart, CreditCard, Shield, Gift, Smartphone, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Donate = () => {
  const [donationType, setDonationType] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mpesa'>('card');
  const [currency, setCurrency] = useState<'usd' | 'kes'>('usd');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const presetAmounts = {
    usd: [25, 50, 100, 250, 500, 1000],
    kes: [2500, 5000, 10000, 25000, 50000, 100000]
  };

  const impactDescriptions = {
    usd: {
      25: "Provides clean water for a family for one month",
      50: "Supplies school materials for 5 children",
      100: "Feeds a family for two weeks",
      250: "Supports a teacher's salary for one month",
      500: "Builds a water well access point",
      1000: "Sponsors a child's education for one year"
    },
    kes: {
      2500: "Provides clean water for a family for one month",
      5000: "Supplies school materials for 5 children",
      10000: "Feeds a family for two weeks",
      25000: "Supports a teacher's salary for one month",
      50000: "Builds a water well access point",
      100000: "Sponsors a child's education for one year"
    }
  };

  const handleAmountSelect = (selectedAmount: string) => {
    setAmount(selectedAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount('');
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as 'card' | 'mpesa');
  };

  const handleCurrencyChange = (value: string) => {
    setCurrency(value as 'usd' | 'kes');
    setAmount('');
    setCustomAmount('');
  };

  const finalAmount = customAmount || amount;
  const finalAmountNumber = parseInt(finalAmount);
  const currencySymbol = currency === 'usd' ? '$' : 'KSh';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!finalAmount || isNaN(finalAmountNumber) || finalAmountNumber < 1) {
      toast({
        title: "Invalid amount",
        description: "Please enter or select a valid amount.",
      });
      setIsLoading(false);
      return;
    }

    if (paymentMethod === 'mpesa') {
      // Validate phone number for Kenyan format
      if (!mpesaPhone.match(/^(2547\d{8}|07\d{8})$/)) {
        toast({
          title: "Invalid Phone",
          description: "Enter a valid Kenyan phone number (e.g., 0712345678 or 254712345678).",
        });
        setIsLoading(false);
        return;
      }

      // Call M-Pesa API integration (placeholder for now)
      try {
        // This would integrate with your M-Pesa API
        toast({
          title: "M-Pesa Integration Ready",
          description: "M-Pesa payment processing will be implemented with your API keys.",
        });
      } catch (err) {
        toast({ title: "M-Pesa Error", description: "Failed to process M-Pesa payment." });
      }
      setIsLoading(false);
      return;
    }

    // Simulate payment processing for Card
    setTimeout(() => {
      toast({
        title: "Thank you for your donation!",
        description: "Your generous contribution will make a real difference in communities worldwide.",
      });
      setAmount('');
      setCustomAmount('');
      setDonorInfo({ name: '', email: '', message: '' });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Make a Donation</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Your generous support helps us create lasting change in communities worldwide. Every donation makes a difference.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Donation</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Currency Selection */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Currency</Label>
                    <Select value={currency} onValueChange={handleCurrencyChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            USD - US Dollar
                          </div>
                        </SelectItem>
                        <SelectItem value="kes">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">KSh</span>
                            KES - Kenyan Shilling
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Donation Type */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Donation Type</Label>
                    <RadioGroup value={donationType} onValueChange={setDonationType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-time" id="one-time" />
                        <Label htmlFor="one-time">One-time donation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly donation</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mpesa" id="mpesa" />
                        <Label htmlFor="mpesa" className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          M-Pesa
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* M-Pesa Phone Number */}
                  {paymentMethod === 'mpesa' && (
                    <div>
                      <Label className="text-base font-medium mb-2 block">M-Pesa Phone Number</Label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input
                          type="tel"
                          placeholder="e.g. 0712345678 or 254712345678"
                          value={mpesaPhone}
                          onChange={(e) => setMpesaPhone(e.target.value)}
                          className="pl-10"
                          minLength={10}
                          maxLength={12}
                          required={paymentMethod === 'mpesa'}
                        />
                      </div>
                    </div>
                  )}

                  {/* Amount Selection */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Amount ({currencySymbol})</Label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {presetAmounts[currency].map((presetAmount) => (
                        <Button
                          key={presetAmount}
                          type="button"
                          variant={amount === presetAmount.toString() ? "default" : "outline"}
                          onClick={() => handleAmountSelect(presetAmount.toString())}
                          className="h-12"
                        >
                          {currencySymbol}{presetAmount.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {currencySymbol}
                      </span>
                      <Input
                        type="number"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        className="pl-12"
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Impact Description */}
                  {finalAmount && impactDescriptions[currency][finalAmountNumber as keyof typeof impactDescriptions[typeof currency]] && (
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <p className="text-teal-800 font-medium">
                        Your {currencySymbol}{finalAmount} donation: {impactDescriptions[currency][finalAmountNumber as keyof typeof impactDescriptions[typeof currency]]}
                      </p>
                    </div>
                  )}

                  {/* Donor Information */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Donor Information</Label>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox 
                        id="anonymous" 
                        checked={isAnonymous}
                        onCheckedChange={(checked) => setIsAnonymous(checked === true)}
                      />
                      <Label htmlFor="anonymous">Make this an anonymous donation</Label>
                    </div>

                    {!isAnonymous && (
                      <>
                        <Input
                          placeholder="Full Name"
                          value={donorInfo.name}
                          onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                          required={!isAnonymous}
                        />
                        <Input
                          type="email"
                          placeholder="Email Address"
                          value={donorInfo.email}
                          onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                          required={!isAnonymous}
                        />
                      </>
                    )}
                    
                    <Textarea
                      placeholder="Leave a message (optional)"
                      value={donorInfo.message}
                      onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                      rows={3}
                    />
                  </div>

                  {/* Payment Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white py-6 text-lg font-semibold"
                    disabled={!finalAmount || isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {paymentMethod === 'mpesa' ? (
                          <Smartphone className="h-5 w-5" />
                        ) : (
                          <CreditCard className="h-5 w-5" />
                        )}
                        {paymentMethod === 'mpesa'
                          ? `Donate ${finalAmount ? currencySymbol : ''}${finalAmount ? parseInt(finalAmount).toLocaleString() : ''} via M-Pesa`
                          : `Donate ${currencySymbol}${finalAmount ? parseInt(finalAmount).toLocaleString() : '0'}${donationType === 'monthly' ? '/month' : ''}`}
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold">Secure Donation</h3>
                    <p className="text-sm text-gray-600">SSL encrypted & PCI compliant</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Your donation is processed securely through industry-standard encryption. We never store your payment information.
                </p>
              </CardContent>
            </Card>

            {/* Tax Deductible */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Gift className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Tax Deductible</h3>
                    <p className="text-sm text-gray-600">501(c)(3) status</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  The Lance Foundation is a registered 501(c)(3) organization. Your donation is tax-deductible to the full extent allowed by law.
                </p>
              </CardContent>
            </Card>

            {/* Impact Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Where Your Money Goes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Programs & Services</span>
                    <span className="font-semibold text-green-600">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fundraising</span>
                    <span className="font-semibold text-blue-600">10%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Administration</span>
                    <span className="font-semibold text-gray-600">5%</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    85¢ of every dollar goes directly to our programs and the communities we serve.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
