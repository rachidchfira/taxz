import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Lock, Server, FileCheck, AlertCircle, RefreshCw, Mail, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Data Protection | VietPIT',
  description: 'Data Protection Policy for VietPIT - Learn about our commitment to protecting your personal and financial data in compliance with Vietnamese law.',
}

const protectionMeasures = [
  {
    title: 'Encryption in Transit',
    description: 'All data transmitted between your browser and our servers is encrypted using TLS 1.3 with 256-bit encryption.',
  },
  {
    title: 'Encryption at Rest',
    description: 'Stored data is encrypted using AES-256 encryption standard, with keys managed through secure key management systems.',
  },
  {
    title: 'Access Controls',
    description: 'Strict role-based access controls ensure only authorized personnel can access client data, with all access logged and auditable.',
  },
  {
    title: 'Secure Backups',
    description: 'Regular encrypted backups with geographic redundancy ensure data recovery capabilities.',
  },
]

const rights = [
  { title: 'Right to Access', description: 'Request a complete copy of your personal data held by VietPIT.' },
  { title: 'Right to Correction', description: 'Request correction of any inaccurate or incomplete personal data.' },
  { title: 'Right to Deletion', description: 'Request deletion of your data (subject to legal retention requirements).' },
  { title: 'Right to Portability', description: 'Receive your data in a structured, machine-readable format.' },
  { title: 'Right to Object', description: 'Object to processing of your data for direct marketing purposes.' },
  { title: 'Right to Restriction', description: 'Request restriction of processing in certain circumstances.' },
]

export default function DataProtection() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                <Shield className="w-3 h-3 mr-1" />
                Legal Document
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                Data Protection Policy
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Last updated: January 2025
              </p>
              <p className="text-muted-foreground">
                This policy outlines our commitment to protecting your personal data in compliance with 
                Vietnam's Personal Data Protection Decree No. 13/2023/ND-CP and international best practices.
              </p>
            </div>
          </div>
        </section>

        {/* Compliance Badge */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4">
              <Badge variant="outline" className="py-2 px-4 border-[#40E0D0]/30">
                <Lock className="w-4 h-4 mr-2 text-[#40E0D0]" />
                256-bit SSL Encryption
              </Badge>
              <Badge variant="outline" className="py-2 px-4 border-[#40E0D0]/30">
                <Shield className="w-4 h-4 mr-2 text-[#40E0D0]" />
                PDP Decree 13/2023/ND-CP Compliant
              </Badge>
              <Badge variant="outline" className="py-2 px-4 border-[#40E0D0]/30">
                <FileCheck className="w-4 h-4 mr-2 text-[#40E0D0]" />
                Regular Security Audits
              </Badge>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* What We Protect */}
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-[#40E0D0]" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-4">1. Data We Protect</h2>
                      <p className="text-muted-foreground mb-4 text-sm">
                        We protect all personal and financial data you share with us, including:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="p-3 rounded-lg bg-muted/50">
                          <h4 className="font-medium mb-1">Personal Information</h4>
                          <p className="text-muted-foreground">Name, nationality, passport/ID, contact details</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <h4 className="font-medium mb-1">Financial Data</h4>
                          <p className="text-muted-foreground">Income, tax withholdings, deductions, bank details</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <h4 className="font-medium mb-1">Employment Data</h4>
                          <p className="text-muted-foreground">Employer information, contracts, work history</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <h4 className="font-medium mb-1">Tax Records</h4>
                          <p className="text-muted-foreground">Filings, calculations, correspondence with authorities</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Measures */}
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-[#40E0D0]" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-4">2. Security Measures</h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {protectionMeasures.map((measure) => (
                          <div key={measure.title} className="p-4 rounded-lg border border-border/50">
                            <h3 className="font-medium mb-2">{measure.title}</h3>
                            <p className="text-sm text-muted-foreground">{measure.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Storage */}
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0">
                      <Server className="w-6 h-6 text-[#40E0D0]" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-4">3. Data Storage & Location</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        Your data is stored on secure servers with the following characteristics:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-[#40E0D0] mt-1">•</span>
                          Primary servers located in secure data centers with 24/7 physical security
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#40E0D0] mt-1">•</span>
                          Geographic redundancy ensures data availability and disaster recovery
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#40E0D0] mt-1">•</span>
                          Data remains within jurisdictions compliant with Vietnamese data protection requirements
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#40E0D0] mt-1">•</span>
                          Regular penetration testing and vulnerability assessments conducted
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Your Rights */}
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-6 h-6 text-[#40E0D0]" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-4">4. Your Data Rights</h2>
                      <p className="text-muted-foreground text-sm mb-6">
                        Under Vietnam's Personal Data Protection Decree, you have the following rights:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {rights.map((right) => (
                          <div key={right.title} className="p-3 rounded-lg bg-muted/30">
                            <h4 className="font-medium text-sm">{right.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{right.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Breach Notification */}
              <Card className="border-orange-500/20">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-4">5. Data Breach Response</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        In the unlikely event of a data breach, we commit to:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          Notify affected individuals within 72 hours of breach confirmation
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          Report to relevant Vietnamese authorities as required by law
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          Take immediate steps to contain and remediate the breach
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          Provide clear information about the nature and scope of the breach
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Retention */}
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="w-6 h-6 text-[#40E0D0]" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-4">6. Data Retention & Deletion</h2>
                      <div className="space-y-4 text-sm text-muted-foreground">
                        <p>
                          <strong>Active Period:</strong> Your data is retained throughout our service engagement.
                        </p>
                        <p>
                          <strong>Legal Requirement:</strong> Tax records are retained for minimum 5 years after filing 
                          as required by Vietnamese tax law.
                        </p>
                        <p>
                          <strong>Deletion:</strong> After the retention period, data is securely deleted using 
                          industry-standard methods that prevent recovery.
                        </p>
                        <p>
                          <strong>Anonymization:</strong> Some data may be anonymized for statistical analysis 
                          without identifying individuals.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Legal Basis */}
              <Card className="border-[#40E0D0]/20">
                <CardContent className="p-6 lg:p-8">
                  <h2 className="text-xl font-semibold mb-4">7. Legal Basis for Processing</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    We process your data based on the following legal grounds:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <h4 className="font-medium">Contract Performance</h4>
                      <p className="text-muted-foreground text-xs mt-1">
                        Processing necessary to deliver tax services you've requested
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <h4 className="font-medium">Legal Obligation</h4>
                      <p className="text-muted-foreground text-xs mt-1">
                        Compliance with Vietnamese tax laws and regulations
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <h4 className="font-medium">Legitimate Interest</h4>
                      <p className="text-muted-foreground text-xs mt-1">
                        Improving services and preventing fraud
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <h4 className="font-medium">Consent</h4>
                      <p className="text-muted-foreground text-xs mt-1">
                        Marketing communications (where explicitly consented)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Section */}
              <Card className="bg-[#1E3A8A] text-white">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#40E0D0]" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2">8. Data Protection Contact</h2>
                      <p className="text-white/80 mb-4">
                        For data protection inquiries or to exercise your rights, contact our Data Protection Officer:
                      </p>
                      <div className="space-y-2 text-sm">
                        <p><strong>Email:</strong> dpo@vietpit.vn</p>
                        <p><strong>Phone:</strong> ZALO: +84703027485</p>
                        <p><strong>Response Time:</strong> Within 30 days of request</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Official Source */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      This policy is issued in compliance with Vietnam's Personal Data Protection Decree.
                    </p>
                    <a 
                      href="https://vbpl.vn" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[#40E0D0] hover:underline"
                    >
                      View Decree 13/2023/ND-CP on vbpl.vn
                      <ExternalLink className="w-4 h-4" />
                    </a>
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
