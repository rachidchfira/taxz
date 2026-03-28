'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Briefcase, 
  GraduationCap, 
  Building2, 
  PlaneTakeoff,
  Users,
  HelpCircle
} from 'lucide-react'

const personas = [
  {
    icon: Briefcase,
    title: 'Foreign Employees',
    subtitle: 'Single Employer',
    description: 'Working for one company in Vietnam with straightforward withholding. Need annual finalization to reconcile actual liability.',
    painPoints: [
      'Uncertain about residency status',
      'Don\'t know if owed refund or arrears',
      'Vietnamese forms are confusing',
    ],
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    icon: Building2,
    title: 'Multi-Employer Workers',
    subtitle: 'Changed Jobs',
    description: 'Worked for multiple employers during the tax year. Requires individual finalization with income aggregation.',
    painPoints: [
      'Multiple withholding certificates',
      'Overlapping tax periods',
      'Complex calculation required',
    ],
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    icon: GraduationCap,
    title: 'Foreign Teachers',
    subtitle: 'Education Sector',
    description: 'Teaching at universities, international schools, or language centers. Often have unique contract structures.',
    painPoints: [
      'Variable monthly income',
      'Contract vs. actual hours',
      'Residency timing issues',
    ],
    color: 'bg-green-500/10 text-green-600',
  },
  {
    icon: PlaneTakeoff,
    title: 'Departing Expats',
    subtitle: 'Leaving Vietnam',
    description: 'Resident foreigners must finalize PIT before leaving Vietnam. Mandatory requirement with specific timeline.',
    painPoints: [
      'Pre-departure deadline pressure',
      'Exit requirements unclear',
      'Need quick turnaround',
    ],
    color: 'bg-orange-500/10 text-orange-600',
  },
  {
    icon: Users,
    title: 'Executives & Managers',
    subtitle: 'Senior Professionals',
    description: 'Higher income brackets with complex compensation packages including allowances, bonuses, and benefits.',
    painPoints: [
      'Tax optimization opportunities',
      'Allowance treatment',
      'Treaty considerations',
    ],
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    icon: HelpCircle,
    title: 'Uncertain Taxpayers',
    subtitle: 'Need Guidance',
    description: 'Unsure about tax obligations, residency, or whether finalization is required. Need expert assessment first.',
    painPoints: [
      'Completely new to Vietnam tax',
      'Mixed income types',
      'Previous years unfinalized',
    ],
    color: 'bg-teal-500/10 text-teal-600',
  },
]

export function PersonasSection() {
  return (
    <section id="who-for" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <Badge variant="outline" className="mb-4">
            Who We Help
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tax Solutions for Every Expat Situation
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're a first-year teacher or a senior executive, we understand 
            the unique challenges foreigners face with Vietnam tax compliance.
          </p>
        </div>

        {/* Personas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <Card key={persona.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${persona.color} flex items-center justify-center`}>
                    <persona.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{persona.title}</CardTitle>
                    <CardDescription className="text-xs">{persona.subtitle}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {persona.description}
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Common Challenges:</p>
                  <ul className="space-y-1">
                    {persona.painPoints.map((point) => (
                      <li key={point} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
