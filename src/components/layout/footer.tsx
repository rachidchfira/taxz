'use client'

import Link from 'next/link'
import { memo } from 'react'
import { 
  Calculator, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  Shield,
  FileText,
  Lock
} from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'All Services', href: '/services' },
    { name: 'Tax Residency', href: '/services/tax-residency' },
    { name: 'Leaving Vietnam', href: '/services/leaving-vietnam' },
    { name: 'Multi-Employer', href: '/services/multi-employer' },
  ],
  resources: [
    { name: 'Tax Calculator', href: '/calculator' },
    { name: 'Knowledge Base', href: '/knowledge-base' },
    { name: 'Official Sources', href: '/official-sources' },
    { name: 'Pricing', href: '/pricing' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Data Protection', href: '/data-protection' },
  ],
}

const officialSources = [
  { name: 'vbpl.vn', url: 'https://vbpl.vn', description: 'National Legal Database' },
  { name: 'gdt.gov.vn', url: 'https://gdt.gov.vn', description: 'General Dept. of Taxation' },
  { name: 'chinhphu.vn', url: 'https://chinhphu.vn', description: 'Government Portal' },
]

const Footer = memo(function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">VietPIT</span>
                <span className="text-xs text-primary-foreground/60 -mt-1">
                  Foreigner Tax Services
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 max-w-sm">
              Premium Personal Income Tax finalization services for foreigners in Vietnam. 
              All guidance backed by official Vietnamese government sources.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <a href="mailto:contact@vietpit.vn" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" />
                contact@vietpit.vn
              </a>
              <a href="https://zalo.me/84703027485" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" />
                ZALO: +84703027485
              </a>
              <div className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Ho Chi Minh City & Hanoi, Vietnam</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold mb-4 mt-6">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Official Sources Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-primary-foreground/60">
              <Shield className="w-4 h-4" />
              <span>All calculations based on official Vietnamese government sources:</span>
            </div>
            <div className="flex items-center gap-4">
              {officialSources.map((source) => (
                <a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-foreground/70 hover:text-primary-foreground flex items-center gap-1 transition-colors"
                >
                  {source.name}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60">
            <div className="flex items-center gap-4">
              <span>© {new Date().getFullYear()} VietPIT. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                256-bit SSL Encrypted
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                PDP Decree Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

export { Footer }
