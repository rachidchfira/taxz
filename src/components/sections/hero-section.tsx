'use client'

import Link from 'next/link'
import Image from 'next/image'
import { memo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calculator, 
  ArrowRight, 
  Shield, 
  CheckCircle2,
  Clock,
  ArrowDown
} from 'lucide-react'

const trustPoints = [
  { icon: Shield, text: 'Official-Source Backed' },
  { icon: CheckCircle2, text: 'Vietnam Tax Authority Compliant' },
  { icon: Clock, text: '7+ Years Experience' },
]

const stats = [
  { value: '400+', label: 'Cases Finalized' },
  { value: '98%', label: 'Success Rate' },
  { value: '15+', label: 'Nationalities Served' },
  { value: '24h', label: 'Avg. Response Time' },
]

// Pre-determined particle positions to avoid hydration mismatch
const particlePositions = [
  { top: '10%', left: '15%', delay: '0s', duration: '4s' },
  { top: '20%', left: '80%', delay: '0.5s', duration: '5s' },
  { top: '30%', left: '25%', delay: '1s', duration: '3.5s' },
  { top: '40%', left: '70%', delay: '1.5s', duration: '6s' },
  { top: '50%', left: '45%', delay: '2s', duration: '4.5s' },
  { top: '60%', left: '90%', delay: '0.3s', duration: '5.5s' },
  { top: '70%', left: '10%', delay: '2.5s', duration: '3s' },
  { top: '80%', left: '60%', delay: '0.8s', duration: '6.5s' },
  { top: '15%', left: '50%', delay: '1.2s', duration: '4.2s' },
  { top: '25%', left: '35%', delay: '1.8s', duration: '5.2s' },
  { top: '35%', left: '85%', delay: '0.2s', duration: '3.8s' },
  { top: '45%', left: '20%', delay: '2.2s', duration: '4.8s' },
  { top: '55%', left: '75%', delay: '0.7s', duration: '5.8s' },
  { top: '65%', left: '40%', delay: '1.4s', duration: '3.2s' },
  { top: '75%', left: '95%', delay: '2.8s', duration: '6.2s' },
  { top: '85%', left: '30%', delay: '0.4s', duration: '4.4s' },
  { top: '5%', left: '65%', delay: '1.6s', duration: '5.4s' },
  { top: '95%', left: '55%', delay: '2.4s', duration: '3.6s' },
  { top: '12%', left: '5%', delay: '0.9s', duration: '6.8s' },
  { top: '88%', left: '85%', delay: '1.1s', duration: '4.6s' },
]

const HeroSection = memo(function HeroSection() {
  const scrollToServices = useCallback(() => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Professional working on laptop"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 scale-105 transition-transform duration-[25s] hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/90 to-[#1E3A8A]/70 mix-blend-multiply"></div>
        
        {/* Animated Floating Particles - Pre-determined positions */}
        <div className="absolute inset-0 overflow-hidden">
          {particlePositions.map((particle, i) => (
            <div 
              key={i}
              className="absolute h-2 w-2 rounded-full bg-[#40E0D0]/30 animate-float"
              style={{
                top: particle.top,
                left: particle.left,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 md:py-32 lg:py-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Trust Badge */}
            <Badge 
              variant="outline" 
              className="mb-6 px-3 py-1 text-xs font-medium border-[#40E0D0]/30 bg-[#40E0D0]/5 text-[#40E0D0] animate-fade-in-up"
            >
              <Shield className="w-3 h-3 mr-1" />
              Official Vietnamese Government Sources
            </Badge>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Expert Tax & Insurance Services
              <span className="block mt-2">
                for Foreign Employees in Vietnam
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 max-w-3xl text-white/90 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Comprehensive PIT finalization, tax residency assessment, and insurance solutions — 
              all backed by official Vietnamese regulations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Button asChild size="lg" className="btn-premium bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] font-medium px-8 py-6 text-lg group">
                <Link href="#calculator">
                  <Calculator className="w-5 h-5 mr-2" />
                  Tax Calculator
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white hover:bg-white/90 text-[#1E3A8A] font-medium px-8 py-6 text-lg border-0">
                <Link href="#contact">
                  Book Consultation
                </Link>
              </Button>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              {trustPoints.map((point) => (
                <div key={point.text} className="flex items-center gap-2 text-sm text-white/80">
                  <point.icon className="w-4 h-4 text-[#40E0D0]" />
                  <span>{point.text}</span>
                </div>
              ))}
            </div>

            {/* Scroll Down Button */}
            <button 
              onClick={scrollToServices}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center mt-20 animate-bounce cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Scroll to services"
            >
              <span className="text-sm mb-2">Explore Our Services</span>
              <ArrowDown size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 bg-white dark:bg-[#1E293B] py-8 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export { HeroSection }
