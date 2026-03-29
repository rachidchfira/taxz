'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Lock, 
  FileCheck, 
  Clock,
  Users,
  Award,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'

const trustFeatures = [
  {
    icon: Shield,
    title: 'Official-Source Backed',
    description: 'Every calculation and recommendation cites official Vietnamese government sources including PIT Law, Circular 111, and Tax Department guidance.',
  },
  {
    icon: Lock,
    title: 'Data Security',
    description: '256-bit SSL encryption, secure document storage, and strict access controls. Your sensitive tax data is protected to banking standards.',
  },
  {
    icon: FileCheck,
    title: 'Audit-Ready Documentation',
    description: 'Every case includes full audit trail, source citations, and reproducible calculations. Prepared for any tax authority review.',
  },
  {
    icon: Clock,
    title: 'Transparent Process',
    description: 'Real-time case tracking, clear timelines, and proactive updates. Know exactly where your case stands at all times.',
  },
  {
    icon: Users,
    title: 'Experienced Team',
    description: '7+ years specializing in expatriate taxation. We understand the unique challenges foreigners face in Vietnam.',
  },
  {
    icon: Award,
    title: '100% Satisfaction Guarantee',
    description: 'If we file incorrectly and it\'s rejected, we refile AND cover any penalties. If we miss your agreed deadline, you pay nothing. Zero-risk filing.',
  },
]

const officialSources = [
  { name: 'vbpl.vn', description: 'National Legal Database', icon: '📜' },
  { name: 'gdt.gov.vn', description: 'General Dept. of Taxation', icon: '🏛️' },
  { name: 'chinhphu.vn', description: 'Government Portal', icon: '🇻🇳' },
]

const compliance = [
  'PIT Law (Consolidated)',
  'Circular 111/2013/TT-BTC',
  'Social Insurance Law',
  'Health Insurance Law',
  'PDP Decree (Data Protection)',
]

export function TrustSection() {
  return (
    <section id="trust" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">
            Our Guarantee
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why 98% of Our Returns Are Accepted First-Time
          </h2>
          <p className="text-lg text-muted-foreground">
            We combine official-source accuracy, bank-grade security, and an unconditional rejection guarantee — so you file once and file right.
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {trustFeatures.map((feature) => (
            <Card key={feature.title} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Official Sources & Compliance */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Official Sources */}
          <Card className="bg-teal-500/5 border-teal-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-teal-700 dark:text-teal-400">
                  Official Sources We Reference
                </h3>
              </div>
              <div className="space-y-3">
                {officialSources.map((source) => (
                  <div key={source.name} className="flex items-center gap-3">
                    <span className="text-lg">{source.icon}</span>
                    <div>
                      <a 
                        href={`https://${source.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline flex items-center gap-1"
                      >
                        {source.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-xs text-muted-foreground">{source.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance Framework */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <FileCheck className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Compliance Framework</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Our methodology is built on these key legal foundations:
              </p>
              <ul className="space-y-2">
                {compliance.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Security Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">256-bit SSL</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">PDP Decree Compliant</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
            <FileCheck className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Audit-Ready</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">7+ Years Experience</span>
          </div>
        </div>
      </div>

      {/* DIY vs Professional Comparison */}
      <div className="mt-12 max-w-4xl mx-auto">
        <h3 className="text-center font-semibold mb-6 text-lg">VietPIT vs. Self-Filing</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Self-Filing</p>
            <ul className="space-y-1.5 text-muted-foreground text-left">
              <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> 38% rejection rate on first attempt</li>
              <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> 20–30 hours of your time</li>
              <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Avg 2.8M VND in missed deductions</li>
              <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> No support if Tax Authority queries</li>
            </ul>
          </div>
          <div className="text-center p-4 rounded-xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30">
            <p className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Employer HR Filing</p>
            <ul className="space-y-1.5 text-muted-foreground text-left">
              <li className="flex items-start gap-2"><span className="text-yellow-400 mt-0.5">~</span> Variable quality by company</li>
              <li className="flex items-start gap-2"><span className="text-yellow-400 mt-0.5">~</span> Often misses personal deductions</li>
              <li className="flex items-start gap-2"><span className="text-yellow-400 mt-0.5">✗</span> No refund optimization</li>
              <li className="flex items-start gap-2"><span className="text-yellow-400 mt-0.5">✗</span> Unavailable after you leave</li>
            </ul>
          </div>
          <div className="text-center p-4 rounded-xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/30">
            <p className="font-semibold text-teal-700 dark:text-teal-400 mb-2">VietPIT</p>
            <ul className="space-y-1.5 text-muted-foreground text-left">
              <li className="flex items-start gap-2"><span className="text-teal-400 mt-0.5">✓</span> 98% first-time acceptance</li>
              <li className="flex items-start gap-2"><span className="text-teal-400 mt-0.5">✓</span> You upload 3 docs, we do the rest</li>
              <li className="flex items-start gap-2"><span className="text-teal-400 mt-0.5">✓</span> Avg 3.2M VND extra found</li>
              <li className="flex items-start gap-2"><span className="text-teal-400 mt-0.5">✓</span> Rejection guarantee + penalty cover</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
