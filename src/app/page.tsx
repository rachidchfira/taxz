'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FaqSection } from '@/components/sections/faq-section'
import { HowItWorksSection } from '@/components/sections/how-it-works-section'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Calculator,
  ArrowRight,
  Shield,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  PlaneTakeoff,
  Building2,
  MapPin,
  BookOpen,
  Sparkles,
  Star,
  Award,
  Globe,
  Zap,
  TrendingUp,
  ChevronRight
} from 'lucide-react'

const services = [
  {
    icon: FileText,
    title: 'PIT Finalization',
    description: 'Recover your annual tax refund — avg 3.2M VND found per client. We file your return in 8 days.',
    href: '/services/pit-finalization',
    color: 'text-blue-600',
    badge: 'Most Popular',
    stat: 'Avg 3.2M VND refund',
  },
  {
    icon: MapPin,
    title: 'Tax Residency Assessment',
    description: 'Pay 5% or 20%? Misclassified residency is the #1 expat tax mistake. We determine your correct status.',
    href: '/services/tax-residency',
    color: 'text-teal-600',
    badge: null,
    stat: 'Save up to 15% tax rate',
  },
  {
    icon: PlaneTakeoff,
    title: 'Leaving Vietnam',
    description: 'Mandatory departure clearance — completed in 5 days. Leave without tax debt or airport complications.',
    href: '/services/leaving-vietnam',
    color: 'text-orange-600',
    badge: 'Time-Sensitive',
    stat: 'Filed in 5 days avg',
  },
  {
    icon: Building2,
    title: 'Multi-Employer Cases',
    description: 'Worked multiple jobs? Each employer over-withholds independently. We consolidate and recover the difference.',
    href: '/services/multi-employer',
    color: 'text-purple-600',
    badge: null,
    stat: 'Avg 4.5M VND recovered',
  },
]

const stats = [
  { value: '400+', label: 'Returns Filed', sublabel: 'Since 2017', icon: FileText },
  { value: '98%', label: 'Accepted First-Time', sublabel: 'No tax authority queries', icon: TrendingUp },
  { value: '3.2M', label: 'VND Avg Recovered', sublabel: 'Extra deductions found', icon: Zap },
  { value: '8 Days', label: 'Avg Turnaround', sublabel: 'Documents to filed return', icon: Clock },
]

// Pre-determined particle positions to avoid hydration mismatch
const particlePositions = [
  { top: '15%', left: '10%', delay: '0s', duration: '5s' },
  { top: '25%', left: '85%', delay: '1s', duration: '6s' },
  { top: '35%', left: '25%', delay: '2s', duration: '4s' },
  { top: '45%', left: '70%', delay: '0.5s', duration: '7s' },
  { top: '55%', left: '45%', delay: '1.5s', duration: '5s' },
  { top: '65%', left: '90%', delay: '3s', duration: '6s' },
  { top: '75%', left: '15%', delay: '2.5s', duration: '4s' },
  { top: '85%', left: '60%', delay: '0.8s', duration: '5s' },
  { top: '10%', left: '50%', delay: '1.2s', duration: '6s' },
  { top: '30%', left: '35%', delay: '2.2s', duration: '4s' },
  { top: '50%', left: '80%', delay: '0.3s', duration: '7s' },
  { top: '70%', left: '20%', delay: '1.8s', duration: '5s' },
  { top: '20%', left: '65%', delay: '3.5s', duration: '6s' },
  { top: '40%', left: '5%', delay: '2.8s', duration: '4s' },
  { top: '60%', left: '95%', delay: '0.6s', duration: '5s' },
  { top: '80%', left: '40%', delay: '1.4s', duration: '7s' },
  { top: '5%', left: '75%', delay: '3.2s', duration: '6s' },
  { top: '90%', left: '30%', delay: '2s', duration: '4s' },
  { top: '15%', left: '55%', delay: '0.9s', duration: '5s' },
  { top: '95%', left: '85%', delay: '1.6s', duration: '6s' },
]

const whyChooseUs = [
  {
    stat: '98%',
    title: 'First-Time Acceptance',
    description: 'Filings accepted without tax authority queries',
  },
  {
    stat: '3.2M VND',
    title: 'Avg. Extra Deductions',
    description: 'Identified per client vs. self-filing',
  },
  {
    stat: '8 Days',
    title: 'Average Turnaround',
    description: 'From documents to filed return',
  },
  {
    stat: '100%',
    title: 'English Support',
    description: 'All communication, no translation',
  },
]

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    company: 'Fintech Company, HCMC',
    nationality: 'USA',
    content: 'I changed jobs twice in 2024 and was terrified of the multi-employer filing. VietPIT found 14.5M VND in deductions I didn\'t know I qualified for. Process took exactly 9 days.',
    service: 'Multi-Employer Finalization',
    rating: 5,
    verified: true,
    year: '2024',
  },
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'Agency, Hanoi',
    nationality: 'UK',
    content: 'Left Vietnam on short notice. VietPIT completed my departure finalization in 5 days — including a 8.2M VND refund I didn\'t expect. They even helped with the airport clearance documents.',
    service: 'Departure Finalization',
    rating: 5,
    verified: true,
    year: '2024',
  },
  {
    name: 'Hans Mueller',
    role: 'Engineering Manager',
    company: 'Manufacturing, Binh Duong',
    nationality: 'Germany',
    content: 'The tax residency assessment clarified my status after working remotely for 6 months. Turns out I qualified as a resident, which saved me 12% on my tax rate.',
    service: 'Tax Residency Assessment',
    rating: 5,
    verified: true,
    year: '2024',
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Premium Design */}
        <section className="relative overflow-hidden min-h-[100vh] flex flex-col">
          {/* Layered Premium Background */}
          <div className="absolute inset-0 z-0">
            {/* Base gradient - deeper, richer navy */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1E3A8A] to-[#0f172a]" />

            {/* Mesh gradient overlay for depth */}
            <div className="absolute inset-0 opacity-60">
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#1e3a8a] rounded-full blur-[120px]" />
              <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#0e7490] rounded-full blur-[100px] opacity-40" />
              <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-[#1e40af] rounded-full blur-[130px] opacity-30" />
            </div>

            {/* Premium noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

            {/* Elegant grid pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(64, 224, 208, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(64, 224, 208, 0.3) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
            </div>

            {/* Premium Vietnam Skyline with enhanced glow */}
            <div className="absolute bottom-0 left-0 right-0 h-[50%]">
              {/* Skyline glow base */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#40E0D0]/5 to-transparent" />

              <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="skylineGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(64, 224, 208, 0.15)" />
                    <stop offset="100%" stopColor="rgba(64, 224, 208, 0.02)" />
                  </linearGradient>
                </defs>

                {/* Bitexco Financial Tower - Enhanced */}
                <path d="M100 400 L100 160 L108 160 L112 100 L116 160 L124 160 L124 400 Z" fill="url(#skylineGlow)" />
                <path d="M112 100 L112 60 L114 30 L116 60 L116 100 Z" fill="rgba(64, 224, 208, 0.2)" />
                <ellipse cx="114" cy="25" rx="4" ry="4" fill="rgba(64, 224, 208, 0.4)" className="animate-pulse" />

                {/* Landmark 81 inspired */}
                <path d="M1350 400 L1350 80 L1365 40 L1380 80 L1380 400 Z" fill="url(#skylineGlow)" />
                <path d="M1355 80 L1365 40 L1375 80 Z" fill="rgba(64, 224, 208, 0.15)" />

                {/* Modern cluster 1 */}
                <path d="M180 400 L180 200 L200 195 L220 200 L220 400 Z" fill="rgba(64, 224, 208, 0.06)" />
                <path d="M240 400 L240 150 L260 145 L280 150 L280 400 Z" fill="rgba(64, 224, 208, 0.08)" />
                <path d="M300 400 L300 220 L320 215 L340 220 L340 400 Z" fill="rgba(255, 255, 255, 0.03)" />

                {/* Dragon Bridge with glow */}
                <path d="M450 320 Q520 280 590 310 Q660 340 730 300 L730 400 L450 400 Z" fill="rgba(64, 224, 208, 0.04)" />
                <circle cx="520" cy="295" r="3" fill="rgba(64, 224, 208, 0.5)" className="animate-pulse" />
                <circle cx="660" cy="305" r="3" fill="rgba(64, 224, 208, 0.5)" className="animate-pulse" style={{ animationDelay: '1s' }} />

                {/* Hanoi Opera House */}
                <ellipse cx="900" cy="280" rx="70" ry="50" fill="rgba(255, 255, 255, 0.02)" />
                <path d="M830 320 L830 400 L970 400 L970 320 Q900 290 830 320 Z" fill="rgba(64, 224, 208, 0.04)" />

                {/* Premium towers cluster */}
                <path d="M1020 400 L1020 100 L1040 90 L1060 100 L1060 400 Z" fill="rgba(64, 224, 208, 0.07)" />
                <path d="M1080 400 L1080 180 L1100 170 L1120 180 L1120 400 Z" fill="rgba(255, 255, 255, 0.025)" />
                <path d="M1140 400 L1140 140 L1160 130 L1180 140 L1180 400 Z" fill="rgba(64, 224, 208, 0.05)" />

                {/* Temple of Literature inspired */}
                <path d="M1220 400 L1220 260 L1230 255 L1220 250 L1240 230 L1260 250 L1250 255 L1260 260 L1260 400 Z" fill="rgba(255, 255, 255, 0.02)" />
                <path d="M1230 230 L1240 200 L1250 230 Z" fill="rgba(64, 224, 208, 0.08)" />
              </svg>
            </div>

            {/* Floating premium elements */}
            <div className="absolute top-[15%] right-[8%] w-80 h-80 opacity-20">
              <svg viewBox="0 0 200 200" className="w-full h-full animate-float" style={{ animationDuration: '12s' }}>
                <defs>
                  <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#40E0D0" />
                    <stop offset="100%" stopColor="#4169E1" />
                  </linearGradient>
                </defs>
                <path d="M100 20 C60 50 30 90 100 180 C170 90 140 50 100 20" fill="none" stroke="url(#lotusGrad)" strokeWidth="0.8" />
                <path d="M100 40 C70 60 50 90 100 160 C150 90 130 60 100 40" fill="none" stroke="url(#lotusGrad)" strokeWidth="0.5" />
                <path d="M100 60 C80 75 65 90 100 140 C135 90 120 75 100 60" fill="none" stroke="url(#lotusGrad)" strokeWidth="0.3" />
              </svg>
            </div>

            <div className="absolute bottom-[35%] left-[3%] w-56 h-56 opacity-15">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-float" style={{ animationDuration: '15s', animationDelay: '3s' }}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#40E0D0" strokeWidth="0.3" strokeDasharray="8 4" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#4169E1" strokeWidth="0.2" strokeDasharray="5 3" />
              </svg>
            </div>

            {/* Premium floating orbs with glow */}
            <div className="absolute top-0 right-0 w-[900px] h-[900px]">
              <div className="absolute inset-0 bg-gradient-radial from-[#40E0D0]/15 via-transparent to-transparent rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
            </div>
            <div className="absolute bottom-0 left-0 w-[700px] h-[700px]">
              <div className="absolute inset-0 bg-gradient-radial from-[#4169E1]/20 via-transparent to-transparent rounded-full" />
            </div>

            {/* Premium floating particles with varied sizes */}
            <div className="absolute inset-0 overflow-hidden">
              {particlePositions.map((particle, i) => (
                <div
                  key={i}
                  className="absolute rounded-full animate-float"
                  style={{
                    top: particle.top,
                    left: particle.left,
                    animationDelay: particle.delay,
                    animationDuration: particle.duration,
                    width: i % 3 === 0 ? '6px' : i % 5 === 0 ? '4px' : '3px',
                    height: i % 3 === 0 ? '6px' : i % 5 === 0 ? '4px' : '3px',
                    background: i % 4 === 0
                      ? 'radial-gradient(circle, rgba(64, 224, 208, 0.6) 0%, rgba(64, 224, 208, 0) 70%)'
                      : 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)',
                    boxShadow: i % 4 === 0 ? '0 0 8px rgba(64, 224, 208, 0.3)' : 'none'
                  }}
                />
              ))}
            </div>

            {/* Decorative connecting lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
              <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="#40E0D0" strokeWidth="0.5" />
              <line x1="80%" y1="15%" x2="90%" y2="35%" stroke="#40E0D0" strokeWidth="0.5" />
              <line x1="70%" y1="60%" x2="95%" y2="70%" stroke="#4169E1" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Main Hero Content */}
          <div className="relative z-10 flex-1 flex items-center py-16 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                {/* Premium Trust Badge */}
                <div className="animate-fade-in-up mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-medium text-emerald-400">Verified Service</span>
                    </div>
                    <span className="text-white/30">|</span>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-[#40E0D0]" />
                      <span className="text-xs font-medium text-white/80">Government Sources</span>
                    </div>
                  </div>
                </div>

                {/* Premium Headline with gradient text */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <span className="text-white">Vietnam PIT</span>
                  <span className="block mt-1 bg-gradient-to-r from-[#40E0D0] via-[#38bdf8] to-[#40E0D0] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    Tax Refund Service
                  </span>
                </h1>

                {/* Premium Subheadline */}
                <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl text-white/70 font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  Most expats overpay Vietnamese tax — and never know it.{' '}
                  <span className="text-white/90 font-normal">We find the deductions your employer missed, file your return in 8 days, and recover your refund.</span>
                </p>

                {/* Premium CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up mb-10" style={{ animationDelay: '300ms' }}>
                  <Button asChild size="lg" className="group relative overflow-hidden bg-gradient-to-r from-[#40E0D0] to-[#38bdf8] hover:from-[#2dd4bf] hover:to-[#40E0D0] text-[#0a1628] font-semibold px-8 py-7 text-lg rounded-xl shadow-lg shadow-[#40E0D0]/25 hover:shadow-xl hover:shadow-[#40E0D0]/30 transition-all duration-300">
                    <Link href="/calculator">
                      <Calculator className="w-5 h-5 mr-2" />
                      See My Refund Potential
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-7 text-lg rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300">
                    <Link href="/contact">
                      <Sparkles className="w-5 h-5 mr-2 text-[#40E0D0]" />
                      Free 15-Min Assessment
                      <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle2 className="w-4 h-4 text-[#40E0D0]" />
                    <span>Flat fee, no hourly creep</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/30" />
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Clock className="w-4 h-4 text-[#40E0D0]" />
                    <span>8-day avg turnaround</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/30" />
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Award className="w-4 h-4 text-[#40E0D0]" />
                    <span>3.2M VND avg refund found</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Stats Section with Glassmorphism */}
          <div className="relative z-10">
            <div className="container mx-auto px-4 lg:px-8 pb-12 md:pb-16">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="group relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#40E0D0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <stat.icon className="w-6 h-6 text-[#40E0D0] mb-3" />
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/50 font-medium">
                        {stat.label}
                      </div>
                      {stat.sublabel && (
                        <div className="text-xs text-white/30 mt-0.5">
                          {stat.sublabel}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle divider */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </section>

        {/* Social Proof Strip */}
        <section className="py-6 bg-card border-y border-border/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Serving expats from</span>
              {['🇺🇸 USA', '🇬🇧 UK', '🇩🇪 Germany', '🇯🇵 Japan', '🇰🇷 Korea', '🇦🇺 Australia', '🇫🇷 France', '🇨🇦 Canada', '+ 8 more'].map((country) => (
                <span key={country} className="text-sm font-medium text-muted-foreground">{country}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                <Sparkles className="w-3 h-3 mr-1" />
                Our Services
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Four Ways We Recover Money for Expats
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the service that matches your situation — or let us recommend one in a free 15-minute call.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {services.map((service) => (
                <Link key={service.title} href={service.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0`}>
                          <service.icon className={`w-6 h-6 ${service.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-lg group-hover:text-[#40E0D0] transition-colors">
                              {service.title}
                            </h3>
                            {service.badge && (
                              <Badge className="text-xs bg-[#1E3A8A] text-white dark:bg-[#40E0D0] dark:text-[#1E3A8A]">
                                {service.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs font-semibold text-[#40E0D0] mb-2">{service.stat}</div>
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-[#40E0D0] transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg" className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white dark:border-[#40E0D0] dark:text-[#40E0D0] dark:hover:bg-[#40E0D0] dark:hover:text-[#1E3A8A]">
                <Link href="/services">
                  Compare All Services &amp; Pricing →
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <HowItWorksSection />

        {/* Results Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                <TrendingUp className="w-3 h-3 mr-1" />
                Proven Results
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Real Numbers From Real Clients
              </h2>
              <p className="text-lg text-muted-foreground">
                We don't just file returns — we find money your employer missed and make sure you keep it.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {whyChooseUs.map((item) => (
                <Card key={item.title} className="text-center p-6 hover:shadow-md transition-shadow border-2 hover:border-[#40E0D0]/30">
                  <CardContent className="pt-0">
                    <div className="text-3xl md:text-4xl font-bold text-[#1E3A8A] dark:text-[#40E0D0] mb-2">{item.stat}</div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-[#1E3A8A]/5 to-[#40E0D0]/5 border border-[#40E0D0]/20 rounded-2xl p-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <CheckCircle2 className="w-8 h-8 text-[#40E0D0] mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Official Source Backed</h3>
                    <p className="text-sm text-muted-foreground">Every calculation cites vbpl.vn, gdt.gov.vn — no guesswork, no unofficial interpretations</p>
                  </div>
                  <div>
                    <Shield className="w-8 h-8 text-[#40E0D0] mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Rejection Guarantee</h3>
                    <p className="text-sm text-muted-foreground">If your filing is rejected due to our error, we refile at no cost and cover any resulting penalties</p>
                  </div>
                  <div>
                    <Globe className="w-8 h-8 text-[#40E0D0] mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">15+ Nationalities</h3>
                    <p className="text-sm text-muted-foreground">Serving expats from USA, UK, Germany, Japan, Korea, Australia, France and more — all in English</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                Verified Client Results
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                3.2M VND Average Recovered — Here's Who Found It
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {testimonial.verified && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          ✓ Verified
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs border-[#40E0D0]/30 text-[#40E0D0]">
                        {testimonial.service}
                      </Badge>
                    </div>
                    <div className="text-6xl text-[#40E0D0]/20 font-serif leading-none mb-1">"</div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role} • {testimonial.nationality}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <FaqSection />

        <section className="py-16 lg:py-24 bg-[#1E3A8A]">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Tax Deadline Approaching — File Before It's Too Late
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Vietnam's PIT finalization deadline is March 31. Most expats wait until the last week, creating delays and stress. Book today and we guarantee your return is filed on time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] font-medium px-8">
                <Link href="/contact">
                  Check Your Deadline →
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-[#1E3A8A] px-8">
                <Link href="/contact">
                  Get Free Refund Estimate
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
