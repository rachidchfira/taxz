import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Lock, Eye, Database, Users, Bell, Mail, FileText } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | VietPIT',
  description: 'Privacy Policy for VietPIT - Vietnam PIT Finalization Service for Foreigners. Learn how we collect, use, and protect your personal information.',
}

const sections = [
  {
    icon: Database,
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, including:
    
• **Personal Identification**: Full name, email address, phone number, nationality, and passport/ID details
• **Tax Information**: Income details, employment history, tax residency status, and related financial data
• **Communication Data**: Messages, inquiries, and correspondence with our team
• **Usage Data**: Pages visited, features used, and interaction patterns on our website

We collect this information when you:
- Submit contact forms or consultation requests
- Use our tax calculator or assessment tools
- Engage our tax finalization services
- Communicate with our team via email or phone`
  },
  {
    icon: Eye,
    title: '2. How We Use Your Information',
    content: `Your information is used solely for:

• **Service Delivery**: Processing your PIT finalization, tax calculations, and related services
• **Communication**: Responding to inquiries, sending service updates, and providing support
• **Compliance**: Meeting legal obligations under Vietnamese tax law and regulations
• **Improvement**: Enhancing our services and user experience (anonymized data only)

We never sell your personal data to third parties. We only share information when:
- Required by Vietnamese tax authorities for filing purposes
- You explicitly authorize us to do so
- Required by law or legal process`
  },
  {
    icon: Lock,
    title: '3. Data Security',
    content: `We implement robust security measures to protect your data:

• **Encryption**: All data transmissions use 256-bit SSL/TLS encryption
• **Access Control**: Strict access controls limit data access to authorized personnel only
• **Secure Storage**: Data is stored in encrypted databases with regular security audits
• **Vietnam PDP Decree Compliance**: We comply with Personal Data Protection Decree No. 13/2023/ND-CP

While we take all reasonable precautions, no method of transmission over the internet is 100% secure. We continuously improve our security practices to protect your information.`
  },
  {
    icon: Users,
    title: '4. Your Rights',
    content: `Under Vietnamese law and our commitment to transparency, you have the right to:

• **Access**: Request a copy of your personal data we hold
• **Correction**: Request correction of inaccurate or incomplete data
• **Deletion**: Request deletion of your data (subject to legal retention requirements)
• **Portability**: Request your data in a machine-readable format
• **Objection**: Object to processing for direct marketing purposes

To exercise these rights, contact us at privacy@vietpit.vn with "Data Rights Request" in the subject line.`
  },
  {
    icon: Bell,
    title: '5. Cookies & Tracking',
    content: `We use cookies and similar technologies for:

• **Essential Cookies**: Required for website functionality (session management, security)
• **Analytics Cookies**: Anonymous usage statistics to improve our services
• **Preference Cookies**: Remember your settings (theme, language preferences)

You can manage cookie preferences through your browser settings. Disabling essential cookies may affect website functionality.

We do not use cookies for targeted advertising or sell cookie data to third parties.`
  },
  {
    icon: FileText,
    title: '6. Data Retention',
    content: `We retain your data for:

• **Active Service Period**: Throughout our engagement and for the applicable tax year
• **Legal Requirements**: Minimum 5 years after filing, as required by Vietnamese tax law
• **Contractual Obligations**: As needed to fulfill our service agreement with you

After the retention period, data is securely deleted or anonymized for statistical purposes.`
  },
]

export default function PrivacyPolicy() {
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
                Privacy Policy
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Last updated: January 2025
              </p>
              <p className="text-muted-foreground">
                At VietPIT, we take your privacy seriously. This policy explains how we collect, 
                use, and protect your personal information when you use our tax services.
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

              {/* Contact Section */}
              <Card className="bg-[#1E3A8A] text-white">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#40E0D0]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
                      <p className="text-white/80 mb-4">
                        If you have questions about this Privacy Policy or our data practices, 
                        please contact us:
                      </p>
                      <div className="space-y-2 text-sm">
                        <p><strong>Email:</strong> privacy@vietpit.vn</p>
                        <p><strong>Phone:</strong> ZALO: +84703027485</p>
                        <p><strong>Address:</strong> Ho Chi Minh City & Hanoi, Vietnam</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Legal Basis */}
              <Card className="border-[#40E0D0]/20">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      This Privacy Policy is issued in compliance with Vietnam's Personal Data Protection 
                      Decree No. 13/2023/ND-CP and applicable international data protection principles.
                    </p>
                    <Badge variant="outline" className="mt-4 border-[#40E0D0]/30 text-[#40E0D0]">
                      <Shield className="w-3 h-3 mr-1" />
                      PDP Decree 13/2023/ND-CP Compliant
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
