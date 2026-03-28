'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Receipt, 
  DollarSign, 
  Calculator, 
  Shield, 
  Briefcase, 
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react'

const services = [
  {
    icon: Receipt,
    title: 'Tax Finalization',
    description: 'Professional guidance for the Personal Income Tax finalization process in Vietnam, including documentation preparation and submission.',
    buttonText: 'Learn More',
    buttonLink: '#contact',
    delay: '100ms',
  },
  {
    icon: DollarSign,
    title: 'Tax Deductions',
    description: 'Maximize your eligible tax deductions and exemptions under Vietnamese tax regulations for foreign employees.',
    buttonText: 'Explore Deductions',
    buttonLink: '#calculator',
    delay: '200ms',
  },
  {
    icon: Calculator,
    title: 'Tax Calculator',
    description: 'Use our interactive calculators to estimate your personal income tax, insurance contributions, and more.',
    buttonText: 'Calculate Now',
    buttonLink: '#calculator',
    delay: '300ms',
  },
  {
    icon: Shield,
    title: 'Insurance Claims',
    description: 'Expert assistance with social insurance claims and one-off payment processing for foreign employees.',
    buttonText: 'Claim Process',
    buttonLink: '#contact',
    delay: '400ms',
  },
  {
    icon: Briefcase,
    title: 'Life Insurance',
    description: 'Comprehensive life insurance options tailored for foreigners living and working in Vietnam.',
    buttonText: 'Insurance Options',
    buttonLink: '#contact',
    delay: '500ms',
  },
  {
    icon: User,
    title: 'Consultation',
    description: 'Personalized consultation on tax and insurance matters for your specific situation as a foreign employee.',
    buttonText: 'Contact Us',
    buttonLink: '#contact',
    delay: '600ms',
  },
]

const whyChooseUs = [
  {
    icon: Sparkles,
    title: 'Expertise',
    description: "Years of experience in Vietnam's tax and insurance regulations for foreign employees.",
  },
  {
    icon: User,
    title: 'Personalized Service',
    description: 'Tailored solutions for your specific situation and requirements.',
  },
  {
    icon: Shield,
    title: 'Peace of Mind',
    description: 'Compliant, accurate, and timely handling of all your tax and insurance matters.',
  },
]

export function ServicesSection() {
  return (
    <>
      {/* Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text inline-flex items-center">
              Our Services
              <Sparkles className="ml-2 text-[#40E0D0] animate-pulse" />
            </h2>
            <div className="w-24 h-1 gradient-secondary mx-auto rounded-full mb-2"></div>
            <span className="inline-block text-[#40E0D0] font-semibold text-sm">WHAT WE OFFER</span>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.title}
                className="animate-fade-in-up card-hover"
                style={{ animationDelay: service.delay }}
              >
                <Card className="h-full border-border/50 hover:border-[#40E0D0]/30 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="w-14 h-14 rounded-xl gradient-secondary flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-[#1E3A8A]" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full group hover:bg-[#1E3A8A] hover:text-white transition-colors">
                      <Link href={service.buttonLink}>
                        {service.buttonText}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="gradient-primary py-20 md:py-28 relative overflow-hidden">
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute h-2 w-2 rounded-full bg-white/10 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 7}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose VietPIT</h2>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-8 shadow-md transition-transform duration-500 hover:-translate-y-2 glass">
                <div className="w-16 h-16 rounded-full gradient-secondary mx-auto flex items-center justify-center mb-5">
                  <item.icon className="text-[#1E3A8A]" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3 gradient-text">{item.title}</h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4169E1]/5 to-[#40E0D0]/5"></div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Ready to Simplify Your Tax & Insurance Matters?
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Contact our expert team today for professional guidance tailored to your needs as a foreign employee in Vietnam.
            </p>
            <Button asChild size="lg" className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] font-medium px-8 py-6 text-lg group animate-pulse-glow">
              <Link href="#contact">
                <span className="flex items-center justify-center w-full">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
