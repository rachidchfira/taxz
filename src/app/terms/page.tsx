import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Scale, CheckCircle, AlertTriangle, Clock, RefreshCw, Mail } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | VietPIT',
  description: 'Terms of Service for VietPIT - Vietnam PIT Finalization Service for Foreigners. Read our service agreement and terms of use.',
}

const sections = [
  {
    icon: FileText,
    title: '1. Services Provided',
    content: `VietPIT provides Personal Income Tax (PIT) finalization and related services for foreigners in Vietnam, including:

• **PIT Finalization**: Annual tax return preparation and filing
• **Tax Residency Assessment**: Determination of tax residency status
• **Departure Finalization**: Tax clearance for individuals leaving Vietnam
• **Multi-Employer Cases**: Consolidated filing for multiple income sources
• **Tax Consultation**: Expert advice on Vietnamese tax obligations
• **Document Preparation**: Preparation of required tax forms and supporting documents

All services are provided in accordance with Vietnamese tax laws and regulations, including the Personal Income Tax Law and Circular 111/2013/TT-BTC.`
  },
  {
    icon: CheckCircle,
    title: '2. Client Responsibilities',
    content: `To ensure accurate and timely service, you agree to:

• **Provide Accurate Information**: Supply complete and truthful income, employment, and personal data
• **Submit Required Documents**: Provide all necessary documentation within requested timeframes
• **Respond Promptly**: Reply to inquiries and requests for clarification within 5 business days
• **Review Filings**: Review and approve all documents before submission
• **Inform of Changes**: Notify us immediately of any changes to your circumstances

Failure to provide accurate or timely information may result in delays, inaccuracies, or additional fees.`
  },
  {
    icon: Scale,
    title: '3. Our Obligations',
    content: `VietPIT commits to:

• **Accuracy**: Prepare all filings in accordance with applicable Vietnamese tax laws
• **Confidentiality**: Protect your personal and financial information
• **Timeliness**: Complete services within agreed timeframes (or communicate delays promptly)
• **Transparency**: Provide clear explanations of calculations, procedures, and fees
• **Support**: Offer post-filing support for queries from tax authorities (within service scope)

We base all calculations on official Vietnamese government sources and cite relevant legal provisions.`
  },
  {
    icon: AlertTriangle,
    title: '4. Limitations & Disclaimers',
    content: `Important limitations to understand:

• **Not Legal Advice**: Our services do not constitute legal advice. For complex legal matters, consult a licensed attorney.

• **Accuracy Limitations**: We rely on information you provide. We cannot guarantee accuracy if information is incomplete or incorrect.

• **Authority Decisions**: Final tax determinations are made by Vietnamese tax authorities. We cannot guarantee specific outcomes.

• **Third-Party Delays**: We are not responsible for delays caused by employers, tax authorities, or other third parties.

• **Tax Law Changes**: Vietnamese tax laws may change. We will inform you of material changes affecting your filings.`
  },
  {
    icon: RefreshCw,
    title: '5. Amendments & Corrections',
    content: `If amendments or corrections are needed:

• **Our Error**: If we make an error, we will correct it at no additional cost
• **Client-Provided Information**: Corrections due to inaccurate client information may incur additional fees
• **Authority Requests**: Responses to tax authority inquiries are included in our service fee for 30 days post-filing
• **Beyond 30 Days**: Additional support beyond 30 days is available at hourly rates

Report any suspected errors to us immediately for prompt resolution.`
  },
  {
    icon: Clock,
    title: '6. Service Timeline',
    content: `Standard service timelines:

• **Initial Assessment**: 1-2 business days after document receipt
• **Draft Filing**: 5-7 business days after receiving complete information
• **Final Filing**: Within 2 business days of your approval
• **Peak Season (Jan-Apr)**: Timelines may extend by 3-5 business days

Rush services are available for urgent cases (additional fees apply).`
  },
]

const feesAndPayment = [
  { title: 'Service Fees', content: 'Fees are quoted before service commencement and outlined in your service agreement.' },
  { title: 'Payment Terms', content: 'Payment is due upon service agreement signing, unless otherwise arranged.' },
  { title: 'Refund Policy', content: 'Refunds are available if services are not delivered as agreed. No refunds after filing submission.' },
  { title: 'Fee Changes', content: 'We reserve the right to adjust fees with 30 days notice for ongoing services.' },
]

export default function TermsOfService() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                <Scale className="w-3 h-3 mr-1" />
                Legal Document
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                Terms of Service
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Last updated: January 2025
              </p>
              <p className="text-muted-foreground">
                These Terms of Service govern your use of VietPIT's tax services. 
                By engaging our services, you agree to these terms.
              </p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {sections.map((section) => (
                <Card key={section.title}>
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0">
                        <section.icon className="w-6 h-6 text-[#40E0D0]" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                        <div className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Fees & Payment */}
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <h2 className="text-xl font-semibold mb-6">7. Fees & Payment</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {feesAndPayment.map((item) => (
                      <div key={item.title} className="p-4 rounded-lg bg-muted/50">
                        <h3 className="font-medium mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Liability */}
              <Card className="border-orange-500/20">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-4">8. Limitation of Liability</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        VietPIT's total liability for any claims arising from our services shall not exceed 
                        the fees paid for the specific service in question. We are not liable for indirect, 
                        incidental, or consequential damages, including but not limited to penalties imposed 
                        by tax authorities due to client-provided inaccurate information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Governing Law */}
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <h2 className="text-xl font-semibold mb-4">9. Governing Law & Dispute Resolution</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    These terms are governed by the laws of the Socialist Republic of Vietnam. 
                    Any disputes shall first be resolved through good-faith negotiation. 
                    If negotiation fails, disputes shall be submitted to the competent courts of Vietnam.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Section */}
              <Card className="bg-[#1E3A8A] text-white">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#40E0D0]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-2">10. Questions?</h2>
                      <p className="text-white/80 mb-4">
                        If you have questions about these Terms of Service, please contact us:
                      </p>
                      <div className="space-y-2 text-sm">
                        <p><strong>Email:</strong> legal@vietpit.vn</p>
                        <p><strong>Phone:</strong> ZALO: +84703027485</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Acceptance */}
              <Card className="border-[#40E0D0]/20">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      By engaging VietPIT's services, you acknowledge that you have read, understood, 
                      and agree to be bound by these Terms of Service.
                    </p>
                    <Badge variant="outline" className="mt-4 border-[#40E0D0]/30 text-[#40E0D0]">
                      <FileText className="w-3 h-3 mr-1" />
                      Service Agreement Provided Upon Engagement
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
