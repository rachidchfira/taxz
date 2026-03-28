'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Building2,
  AlertCircle
} from 'lucide-react'

const services = [
  { value: 'pit-finalization', label: 'PIT Finalization' },
  { value: 'tax-residency', label: 'Tax Residency Assessment' },
  { value: 'leaving-vietnam', label: 'Leaving Vietnam' },
  { value: 'multi-employer', label: 'Multi-Employer' },
  { value: 'tax-refund', label: 'Tax Refund' },
  { value: 'consultation', label: 'Consultation' },
  { value: 'not-sure', label: 'Not Sure' },
]

const nationalities = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'South Korea',
  'China', 'Australia', 'Canada', 'Singapore', 'India', 'Vietnam', 'Other'
]

const whatToExpect = [
  {
    icon: Clock,
    title: 'Response within 24 hours',
    description: 'We respond to all inquiries within one business day'
  },
  {
    icon: CheckCircle2,
    title: 'Free initial assessment',
    description: 'Get a preliminary evaluation of your situation at no cost'
  },
  {
    icon: MessageSquare,
    title: 'Clear pricing before commitment',
    description: 'Know exactly what you\'ll pay before making any decisions'
  },
  {
    icon: Building2,
    title: 'English communication',
    description: 'All correspondence and documentation in English'
  },
  {
    icon: AlertCircle,
    title: 'No obligation',
    description: 'Free consultation with no pressure to proceed'
  },
]

interface FormData {
  fullName: string
  email: string
  phone: string
  nationality: string
  service: string
  message: string
  consent: boolean
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  nationality: '',
  service: '',
  message: '',
  consent: false,
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to the privacy policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setIsSuccess(true)
      setFormData(initialFormData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#1E3A8A] py-16 md:py-24">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#1E3A8A]/95 to-[#1E3A8A]/90"></div>
            {/* Decorative elements */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-[#40E0D0]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#40E0D0]/5 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <Badge 
                variant="outline" 
                className="mb-4 px-3 py-1 text-xs font-medium border-[#40E0D0]/30 bg-[#40E0D0]/5 text-[#40E0D0]"
              >
                <Clock className="w-3 h-3 mr-1" />
                Response within 24 hours
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white">
                Get in Touch
              </h1>
              
              <p className="text-lg md:text-xl mb-6 max-w-2xl text-white/80">
                We&apos;re here to help with your tax needs. Reach out to our expert team for personalized assistance.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we&apos;ll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSuccess ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          Thank you for reaching out. Our team will review your inquiry and respond within 24 hours.
                        </p>
                        <Button 
                          onClick={() => setIsSuccess(false)}
                          variant="outline"
                          className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white dark:border-[#40E0D0] dark:text-[#40E0D0] dark:hover:bg-[#40E0D0] dark:hover:text-[#1E3A8A]"
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name & Email */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">
                              Full Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="fullName"
                              placeholder="John Doe"
                              value={formData.fullName}
                              onChange={(e) => handleInputChange('fullName', e.target.value)}
                              className={errors.fullName ? 'border-red-500' : ''}
                            />
                            {errors.fullName && (
                              <p className="text-xs text-red-500">{errors.fullName}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">
                              Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && (
                              <p className="text-xs text-red-500">{errors.email}</p>
                            )}
                          </div>
                        </div>

                        {/* Phone & Nationality */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone (with country code)</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="ZALO: +84703027485"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="nationality">Nationality</Label>
                            <Select
                              value={formData.nationality}
                              onValueChange={(value) => handleInputChange('nationality', value)}
                            >
                              <SelectTrigger id="nationality">
                                <SelectValue placeholder="Select nationality" />
                              </SelectTrigger>
                              <SelectContent>
                                {nationalities.map((nation) => (
                                  <SelectItem key={nation} value={nation.toLowerCase()}>
                                    {nation}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Service Interest */}
                        <div className="space-y-2">
                          <Label htmlFor="service">Service Interested In</Label>
                          <Select
                            value={formData.service}
                            onValueChange={(value) => handleInputChange('service', value)}
                          >
                            <SelectTrigger id="service">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service.value} value={service.value}>
                                  {service.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Tell us about your situation and how we can help..."
                            rows={5}
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                          />
                        </div>

                        {/* Consent Checkbox */}
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Checkbox
                              id="consent"
                              checked={formData.consent}
                              onCheckedChange={(checked) => handleInputChange('consent', checked === true)}
                              className={errors.consent ? 'border-red-500' : ''}
                            />
                            <Label htmlFor="consent" className="text-sm font-normal leading-tight cursor-pointer">
                              I agree to the{' '}
                              <span className="text-[#40E0D0] hover:underline cursor-pointer">privacy policy</span>
                              {' '}and consent to VietPIT processing my personal information for the purpose of this inquiry.{' '}
                              <span className="text-red-500">*</span>
                            </Label>
                          </div>
                          {errors.consent && (
                            <p className="text-xs text-red-500 ml-6">{errors.consent}</p>
                          )}
                        </div>

                        {/* Error Message */}
                        {error && (
                          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                          </div>
                        )}

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full sm:w-auto bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information Sidebar */}
              <div className="space-y-6">
                {/* Contact Details */}
                <Card className="shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-[#40E0D0]" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href="mailto:contact@vietpit.vn" className="font-medium hover:text-[#40E0D0] transition-colors">
                          contact@vietpit.vn
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-[#40E0D0]" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <a href="https://zalo.me/84703027485" className="font-medium hover:text-[#40E0D0] transition-colors">
                          ZALO: +84703027485
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[#40E0D0]" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">Ho Chi Minh City &amp; Hanoi, Vietnam</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-[#40E0D0]" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Response Time</p>
                        <p className="font-medium">Within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Office Hours */}
                <Card className="shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#40E0D0]" />
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Monday - Friday</span>
                        <span className="font-medium">9:00 AM - 6:00 PM (ICT)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Saturday</span>
                        <span className="font-medium">9:00 AM - 1:00 PM (ICT)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Sunday</span>
                        <Badge variant="secondary" className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                          Closed
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                What to Expect
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your <span className="text-[#40E0D0]">Journey</span> with Us
              </h2>
              <p className="text-lg text-muted-foreground">
                Here&apos;s what happens after you reach out to our team
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {whatToExpect.map((item, index) => (
                <Card key={item.title} className="text-center relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1E3A8A] to-[#40E0D0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-[#40E0D0]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#40E0D0]/20 transition-colors">
                      <item.icon className="w-7 h-7 text-[#40E0D0]" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                Our Locations
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Serving <span className="text-[#40E0D0]">Vietnam</span> from Two Locations
              </h2>
              <p className="text-lg text-muted-foreground">
                With offices in both Ho Chi Minh City and Hanoi, we&apos;re positioned to serve clients throughout Vietnam.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* HCMC Office */}
              <Card className="overflow-hidden group">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1E3A8A]/5 to-[#40E0D0]/5">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-[#40E0D0] mx-auto mb-2" />
                      <p className="text-muted-foreground">Ho Chi Minh City</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#40E0D0]"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#40E0D0]" />
                    Ho Chi Minh City Office
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    District 1, Ho Chi Minh City, Vietnam
                  </p>
                </CardContent>
              </Card>

              {/* Hanoi Office */}
              <Card className="overflow-hidden group">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#40E0D0]/5 to-[#1E3A8A]/5">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-[#40E0D0] mx-auto mb-2" />
                      <p className="text-muted-foreground">Hanoi</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#40E0D0] to-[#1E3A8A]"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#40E0D0]" />
                    Hanoi Office
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Ba Dinh District, Hanoi, Vietnam
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-[#1E3A8A]">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Contact Us via ZALO
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Get in touch instantly through ZALO for quick answers and free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] font-medium px-8">
                <a href="https://zalo.me/84703027485" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5 mr-2" />
                  ZALO: +84703027485
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-[#1E3A8A] px-8">
                <a href="mailto:contact@vietpit.vn">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
