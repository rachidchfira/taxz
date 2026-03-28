'use client'

import { memo, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Michael T.',
    role: 'Software Engineer',
    nationality: 'United States',
    company: 'Tech Company, HCMC',
    content: 'After three years of confusion about my tax obligations, VietPIT finally gave me clarity. They identified a refund I didn\'t know I was entitled to. Professional, thorough, and worth every dong.',
    rating: 5,
  },
  {
    name: 'Emma L.',
    role: 'English Teacher',
    nationality: 'United Kingdom',
    company: 'International School, Hanoi',
    content: 'Leaving Vietnam was stressful enough without worrying about tax finalization. They handled everything efficiently, explained the process clearly, and gave me peace of mind before my departure.',
    rating: 5,
  },
  {
    name: 'Hans M.',
    role: 'Engineering Manager',
    nationality: 'Germany',
    company: 'Manufacturing Company, Binh Duong',
    content: 'Working with multiple employers during the year made my tax situation complex. VietPIT aggregated everything correctly and found deductions I would have missed. Very professional service.',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Marketing Director',
    nationality: 'Australia',
    company: 'Agency, HCMC',
    content: 'The calculator gave me a rough estimate, but the actual service went much deeper. They caught issues with my residency determination that would have caused problems. Highly recommend.',
    rating: 5,
  },
  {
    name: 'Takeshi N.',
    role: 'Finance Manager',
    nationality: 'Japan',
    company: 'Trading Company, HCMC',
    content: 'Finally, tax guidance in English that I can understand. The team was patient with my questions and provided clear explanations with legal citations. True professionals.',
    rating: 5,
  },
  {
    name: 'Marie-Claire D.',
    role: 'NGO Coordinator',
    nationality: 'France',
    company: 'International NGO, Hanoi',
    content: 'I was unsure about my tax residency status after splitting time between Vietnam and home. The assessment was thorough and gave me confidence in my filing. Excellent communication throughout.',
    rating: 5,
  },
]

// Memoized testimonial card component
const TestimonialCard = memo(function TestimonialCard({ 
  testimonial 
}: { 
  testimonial: typeof testimonials[0] 
}) {
  const initials = useMemo(() => 
    testimonial.name.split(' ').map(n => n[0]).join(''),
    [testimonial.name]
  )

  return (
    <Card className="relative">
      <CardContent className="pt-6">
        <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
        
        {/* Rating */}
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Content */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          "{testimonial.content}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
            {initials}
          </div>
          <div>
            <p className="font-medium text-sm">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">
              {testimonial.role} • {testimonial.nationality}
            </p>
            <p className="text-xs text-muted-foreground">
              {testimonial.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

export const TestimonialsSection = memo(function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">
            Client Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Expatriates Across Vietnam
          </h2>
          <p className="text-lg text-muted-foreground">
            Real experiences from foreigners who trusted us with their tax finalization.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* Trust Note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          All testimonials are from verified clients. Names have been abbreviated for privacy.
        </p>
      </div>
    </section>
  )
})
