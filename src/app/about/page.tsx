'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import {
  Users,
  Shield,
  Award,
  Clock,
  Target,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Globe,
  BookOpen,
  Languages,
  DollarSign,
  UserCheck,
  GraduationCap,
  Briefcase,
  Heart,
  Star
} from 'lucide-react'

const whyChooseUs = [
  {
    icon: BookOpen,
    title: 'Official Source Backed',
    description: 'All guidance cites Vietnamese government sources. Every recommendation is traceable to official regulations on vbpl.vn, gdt.gov.vn, and chinhphu.vn.',
    highlight: '100% Verifiable'
  },
  {
    icon: Languages,
    title: 'English Communication',
    description: 'Full English support throughout the entire process. No language barriers, no misunderstandings. Clear explanations of complex tax concepts.',
    highlight: 'Native-Level English'
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden fees, no surprise charges. You know exactly what you pay upfront. Our pricing is clear, competitive, and all-inclusive.',
    highlight: 'Price Match Guarantee'
  },
  {
    icon: UserCheck,
    title: 'Experienced Team',
    description: 'Tax professionals with international experience and deep knowledge of Vietnam\'s tax landscape. We understand both local regulations and global perspectives.',
    highlight: '50+ Years Combined'
  }
]

const teamMembers = [
  {
    role: 'Tax Consultants',
    description: 'Licensed tax practitioners specializing in expatriate taxation',
    icon: Briefcase,
    count: '5+ Specialists'
  },
  {
    role: 'Legal Advisors',
    description: 'Experts in Vietnamese tax law and international treaties',
    icon: GraduationCap,
    count: '3+ Advisors'
  },
  {
    role: 'Client Support',
    description: 'Dedicated English-speaking support team for seamless communication',
    icon: Heart,
    count: '24/7 Available'
  }
]

const credentials = [
  {
    icon: Award,
    title: 'Licensed Tax Practitioners',
    description: 'Certified by the General Department of Taxation of Vietnam'
  },
  {
    icon: Users,
    title: 'Professional Association Member',
    description: 'Active member of Vietnam Tax Consultants Association'
  },
  {
    icon: Clock,
    title: '50+ Years Combined Experience',
    description: 'Our team brings decades of tax expertise across multiple jurisdictions'
  },
  {
    icon: Globe,
    title: 'International Background',
    description: 'Team members with experience in Big 4 firms and multinational corporations'
  }
]

const stats = [
  { value: '400+', label: 'Cases Finalized', icon: CheckCircle2 },
  { value: '98%', label: 'Success Rate', icon: Target },
  { value: '15+', label: 'Nationalities Served', icon: Globe },
  { value: '7+', label: 'Years Experience', icon: Clock }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#40E0D0]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1E3A8A]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="text-sm px-4 py-1.5 border-[#40E0D0]/30 text-[#40E0D0] dark:text-[#40E0D0]">
              About VietPIT
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="gradient-text">Professional Tax Services</span>
              <br />
              <span className="text-foreground">for Foreign Employees</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our mission is to simplify Vietnam&apos;s Personal Income Tax finalization process for expatriates.
              We combine deep local expertise with international service standards, ensuring every client
              receives accurate, compliant, and stress-free tax resolution.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white">
                <Link href="/#contact">
                  <Phone className="w-4 h-4 mr-2" />
                  Book Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white dark:border-[#40E0D0] dark:text-[#40E0D0] dark:hover:bg-[#40E0D0] dark:hover:text-[#1E3A8A]">
                <Link href="/#services">
                  Our Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm">
                Our Story
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold">
                Founded to Help Foreigners Navigate Vietnam&apos;s Tax System
              </h2>

              <div className="space-y-4 text-muted-foreground">
                <p>
                  VietPIT was born from a simple observation: foreign employees in Vietnam often struggle
                  with tax finalization due to language barriers, unfamiliar regulations, and complex
                  bureaucratic processes.
                </p>
                <p>
                  Since our founding, we have dedicated ourselves exclusively to Personal Income Tax
                  services for expatriates. This specialization allows us to develop deep expertise,
                  stay current with regulatory changes, and provide guidance that is both accurate
                  and practical.
                </p>
                <p>
                  Every piece of advice we give is backed by official Vietnamese government sources.
                  We believe in transparency and traceability &mdash; our clients deserve to know exactly
                  where their guidance comes from.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-card rounded-lg border">
                  <div className="text-2xl font-bold text-[#1E3A8A] dark:text-[#40E0D0]">7+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border">
                  <div className="text-2xl font-bold text-[#1E3A8A] dark:text-[#40E0D0]">400+</div>
                  <div className="text-sm text-muted-foreground">Clients Served</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border">
                  <div className="text-2xl font-bold text-[#1E3A8A] dark:text-[#40E0D0]">100%</div>
                  <div className="text-sm text-muted-foreground">Source-Backed</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-[#1E3A8A] text-white overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#40E0D0]/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-[#40E0D0]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Our Commitment</h3>
                      <p className="text-white/70 text-sm">Official Source Backed Guidance</p>
                    </div>
                  </div>

                  <p className="text-white/80 leading-relaxed mb-6">
                    We maintain strict standards for accuracy and compliance. Every recommendation
                    we make can be traced to official Vietnamese government publications, ensuring
                    you have complete confidence in your tax finalization.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#40E0D0]" />
                      <span className="text-sm">Citations from vbpl.vn (National Legal Database)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#40E0D0]" />
                      <span className="text-sm">References to gdt.gov.vn (Tax Authority)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#40E0D0]" />
                      <span className="text-sm">Government Portal (chinhphu.vn) sources</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-[#40E0D0]/20 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="text-sm mb-4">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Four Pillars of Excellence
            </h2>
            <p className="text-muted-foreground text-lg">
              What sets VietPIT apart is our unwavering commitment to quality, transparency,
              and client satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={item.title} className="card-hover group">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#1E3A8A]/5 dark:bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#40E0D0]/20 transition-colors">
                      <item.icon className="w-7 h-7 text-[#1E3A8A] dark:text-[#40E0D0]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <Badge variant="secondary" className="text-xs bg-[#40E0D0]/10 text-[#40E0D0] border-[#40E0D0]/20">
                          {item.highlight}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="text-sm mb-4">
              Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional Team at Your Service
            </h2>
            <p className="text-muted-foreground text-lg">
              Our diverse team brings together expertise in Vietnamese tax law, international
              accounting standards, and client-focused service delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.role} className="text-center card-hover">
                <CardContent className="p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#4169E1] flex items-center justify-center">
                    <member.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.role}</h3>
                  <p className="text-muted-foreground mb-4">{member.description}</p>
                  <Badge variant="outline" className="border-[#40E0D0]/30 text-[#40E0D0]">
                    {member.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team members hold certifications from recognized professional bodies and
              participate in ongoing training to stay current with Vietnam&apos;s evolving
              tax regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="text-sm mb-4">
                Credentials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Qualified & Certified Professionals
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We maintain the highest professional standards. Our credentials reflect
                our commitment to excellence and continuous professional development.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {credentials.map((credential) => (
                  <div key={credential.title} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <credential.icon className="w-6 h-6 text-[#40E0D0] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">{credential.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{credential.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Card className="border-2 border-[#40E0D0]/20">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#40E0D0]/10 flex items-center justify-center">
                      <Star className="w-8 h-8 text-[#40E0D0]" />
                    </div>
                    <h3 className="text-2xl font-bold">Client Satisfaction</h3>
                    <p className="text-muted-foreground">Based on client feedback</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Overall Satisfaction</span>
                        <span className="text-sm text-[#40E0D0]">4.9/5.0</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#40E0D0] rounded-full" style={{ width: '98%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Communication Quality</span>
                        <span className="text-sm text-[#40E0D0]">4.8/5.0</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#40E0D0] rounded-full" style={{ width: '96%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Accuracy & Compliance</span>
                        <span className="text-sm text-[#40E0D0]">99%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#40E0D0] rounded-full" style={{ width: '99%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Would Recommend</span>
                        <span className="text-sm text-[#40E0D0]">97%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#40E0D0] rounded-full" style={{ width: '97%' }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-[#1E3A8A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="text-center mb-12">
            <Badge className="bg-[#40E0D0]/20 text-[#40E0D0] border-[#40E0D0]/30 mb-4">
              Our Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Numbers That Speak
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-[#40E0D0]" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="bg-gradient-to-br from-[#1E3A8A] to-[#4169E1] text-white overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Get Started?
                  </h2>
                  <p className="text-white/80 text-lg mb-6">
                    Book a free consultation with our tax experts. We&apos;ll assess your
                    situation and provide clear guidance on your PIT finalization needs.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg" className="bg-[#40E0D0] text-[#1E3A8A] hover:bg-[#40E0D0]/90">
                      <a href="https://zalo.me/84703027485" target="_blank" rel="noopener noreferrer">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact via ZALO
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-[#1E3A8A] font-semibold transition-all duration-300">
                      <Link href="/#services">
                        View Services
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6 lg:p-8">
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>

                  <div className="space-y-4">
                    <a href="mailto:contact@vietpit.vn" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-white/60">Email</div>
                        <div className="font-medium">contact@vietpit.vn</div>
                      </div>
                    </a>

                    <a href="https://zalo.me/84703027485" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-white/60">Phone</div>
                        <div className="font-medium">ZALO: +84703027485</div>
                      </div>
                    </a>

                    <div className="flex items-center gap-3 text-white/80">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-white/60">Location</div>
                        <div className="font-medium">Ho Chi Minh City & Hanoi, Vietnam</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
