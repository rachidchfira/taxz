'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  CheckCircle2,
  Loader2
} from 'lucide-react'

const serviceOptions = [
  'PIT Finalization',
  'Tax Residency Assessment',
  'Leaving Vietnam Finalization',
  'Multi-Employer Case',
  'Tax Refund Review',
  'Consultation Only',
  'Not Sure - Need Assessment',
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    service: '',
    message: '',
    consent: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
            Contact Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Contact via ZALO
          </h2>
          <p className="text-lg text-muted-foreground">
            Reach us instantly through ZALO for quick answers and free consultation. 
            No obligation, no pressure — just clear answers.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Request Consultation</CardTitle>
                <CardDescription>
                  Fill in your details and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Request Received</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Thank you for your inquiry. Our team will review your case and respond within 24 hours.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Smith"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (with country code)</Label>
                        <Input
                          id="phone"
                          placeholder="ZALO: +84703027485"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nationality">Nationality</Label>
                        <Input
                          id="nationality"
                          placeholder="e.g., United States"
                          value={formData.nationality}
                          onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">Service Interested In *</Label>
                      <Select 
                        value={formData.service} 
                        onValueChange={(value) => setFormData({...formData, service: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Tell us about your situation</Label>
                      <Textarea
                        id="message"
                        placeholder="Briefly describe your tax situation, including tax year, number of employers, and any specific questions..."
                        className="min-h-[120px]"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
                      />
                      <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                        I agree to the processing of my personal data for the purpose of this inquiry. 
                        I understand my data will be handled according to the{' '}
                        <a href="#privacy" className="text-primary underline">Privacy Policy</a>.
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]" disabled={!formData.consent || isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Request
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Direct Contact</h3>
                  <p className="text-sm text-primary-foreground/70">
                    Prefer to reach us directly? We're here to help.
                  </p>
                </div>

                <div className="space-y-4">
                  <a href="mailto:contact@vietpit.vn" className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-primary-foreground/70">contact@vietpit.vn</p>
                    </div>
                  </a>

                  <a href="https://zalo.me/84703027485" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">ZALO</p>
                      <p className="text-primary-foreground/70">+84703027485</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-primary-foreground/70">Ho Chi Minh City & Hanoi</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-primary-foreground/70">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3">What to Expect</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" />
                    <span>Response within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" />
                    <span>Free initial assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" />
                    <span>Clear pricing before any commitment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" />
                    <span>English communication throughout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" />
                    <span>No obligation consultation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
