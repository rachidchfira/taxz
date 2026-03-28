'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Award,
  Target,
  Heart,
  Lightbulb,
  ArrowRight
} from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Every calculation is exact. Every citation verified. We don\'t approximate when accuracy matters.',
  },
  {
    icon: Lightbulb,
    title: 'Clarity',
    description: 'Complex tax concepts explained in plain English. You understand what you\'re paying and why.',
  },
  {
    icon: Heart,
    title: 'Service',
    description: 'Your success is our success. We go beyond compliance to find opportunities and avoid problems.',
  },
  {
    icon: Award,
    title: 'Integrity',
    description: 'Honest pricing, clear timelines, no surprises. We build trust through transparency.',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <Badge variant="outline">About VietPIT</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Specialists in Expat Tax Finalization
            </h2>
            <p className="text-lg text-muted-foreground">
              We focus exclusively on Personal Income Tax for foreigners in Vietnam. 
              This specialization means deeper expertise, better outcomes, and a service 
              experience designed around the unique needs of expatriates.
            </p>
            <p className="text-muted-foreground">
              Our team combines Vietnamese tax expertise with international service standards. 
              We understand that navigating tax obligations in a foreign country is stressful — 
              our mission is to make it straightforward, clear, and even enlightening.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {values.map((value) => (
                <div key={value.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{value.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="mt-4">
              <Link href="#contact">
                Work With Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Stats Card */}
          <div className="relative">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">By the Numbers</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-4xl font-bold">400+</div>
                    <div className="text-sm text-primary-foreground/70">Cases Finalized</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">98%</div>
                    <div className="text-sm text-primary-foreground/70">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">15+</div>
                    <div className="text-sm text-primary-foreground/70">Nationalities Served</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">7+</div>
                    <div className="text-sm text-primary-foreground/70">Years Experience</div>
                  </div>
                </div>

                <div className="h-px bg-primary-foreground/20 my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-foreground/70">Average Response Time</span>
                    <span className="font-medium">Under 24 hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-foreground/70">Client Satisfaction</span>
                    <span className="font-medium">4.9 / 5.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-foreground/70">Refund Success Rate</span>
                    <span className="font-medium">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decorative Element */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-primary/10 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
