'use client'

import Link from 'next/link'
import { useState, useEffect, useSyncExternalStore, useCallback, memo } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Calculator, 
  Menu, 
  Moon, 
  Sun, 
  ChevronDown,
  Shield,
  FileText,
  BookOpen,
  Phone,
  PlaneTakeoff,
  Building2,
  MapPin,
  ArrowRight
} from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

// Custom hook for safe hydration
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

const services = [
  { name: 'All Services', href: '/services', icon: FileText, description: 'View all our services' },
  { name: 'Tax Residency Assessment', href: '/services/tax-residency', icon: MapPin, description: '183-day rule analysis' },
  { name: 'Leaving Vietnam', href: '/services/leaving-vietnam', icon: PlaneTakeoff, description: 'Exit tax finalization' },
  { name: 'Multi-Employer Cases', href: '/services/multi-employer', icon: Building2, description: 'Complex income cases' },
]

const resources = [
  { name: 'Tax Calculator', href: '/calculator', icon: Calculator, description: 'PIT & Insurance calculator' },
  { name: 'Knowledge Base', href: '/knowledge-base', icon: BookOpen, description: 'FAQs and guides' },
  { name: 'Official Sources', href: '/official-sources', icon: Shield, description: 'Legal basis library' },
]

const menuItems = [
  { name: 'Services', href: '/services', icon: FileText },
  { name: 'Tax Residency', href: '/services/tax-residency', icon: MapPin },
  { name: 'Leaving Vietnam', href: '/services/leaving-vietnam', icon: PlaneTakeoff },
  { name: 'Tax Calculator', href: '/calculator', icon: Calculator },
  { name: 'Pricing', href: '/pricing', icon: Shield },
  { name: 'About', href: '/about', icon: BookOpen },
]

const Header = memo(function Header() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const mounted = useMounted()

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])
  
  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-effect backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-50">
              <div className="relative w-11 h-11 rounded-xl gradient-primary flex items-center justify-center overflow-hidden shadow-lg shadow-[#1E3A8A]/20 group-hover:shadow-xl group-hover:shadow-[#1E3A8A]/30 group-hover:scale-105 transition-all duration-300">
                <Calculator className="w-5 h-5 text-white" />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-[#40E0D0] transition-colors duration-300">
                  VietPIT
                </span>
                <span className="text-[10px] text-muted-foreground -mt-0.5 hidden sm:block">
                  Foreigner Tax Services
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1 link-underline px-4">
                    Services <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-72 p-2">
                  <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider px-2">Main Services</DropdownMenuLabel>
                  {services.slice(0, 1).map((service) => (
                    <DropdownMenuItem key={service.name} asChild>
                      <Link href={service.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#40E0D0]/10 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <service.icon className="w-5 h-5 text-[#40E0D0]" />
                        </div>
                        <div>
                          <span className="font-medium">{service.name}</span>
                          <p className="text-xs text-muted-foreground">{service.description}</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider px-2">Specialized Services</DropdownMenuLabel>
                  {services.slice(1).map((service) => (
                    <DropdownMenuItem key={service.name} asChild>
                      <Link href={service.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#40E0D0]/10 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <service.icon className="w-5 h-5 text-[#40E0D0]" />
                        </div>
                        <div>
                          <span className="font-medium">{service.name}</span>
                          <p className="text-xs text-muted-foreground">{service.description}</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Resources Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1 link-underline px-4">
                    Resources <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 p-2">
                  {resources.map((resource) => (
                    <DropdownMenuItem key={resource.name} asChild>
                      <Link href={resource.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#40E0D0]/10 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <resource.icon className="w-5 h-5 text-[#40E0D0]" />
                        </div>
                        <div>
                          <span className="font-medium">{resource.name}</span>
                          <p className="text-xs text-muted-foreground">{resource.description}</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" asChild className="link-underline px-4">
                <Link href="/pricing">Pricing</Link>
              </Button>
              <Button variant="ghost" asChild className="link-underline px-4">
                <Link href="/about">About</Link>
              </Button>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="hidden sm:flex hover:bg-[#40E0D0]/10 hover:text-[#40E0D0] transition-colors"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}

              <Button asChild className="hidden sm:flex btn-premium gradient-primary text-white shadow-lg shadow-[#1E3A8A]/20 hover:shadow-xl hover:shadow-[#1E3A8A]/30 hover:scale-105 transition-all duration-300">
                <Link href="/contact">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Us
                </Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="lg:hidden relative z-50 w-11 h-11 flex items-center justify-center rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-5">
                  <span 
                    className={`absolute left-0 top-0.5 w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                      isOpen ? 'rotate-45 top-2' : ''
                    }`}
                  />
                  <span 
                    className={`absolute left-0 top-2 w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                      isOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span 
                    className={`absolute left-0 top-[14px] w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                      isOpen ? '-rotate-45 top-2' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#1E3A8A] to-[#0F172A] transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#40E0D0]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4169E1]/15 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
          
          {/* Floating lotus shapes */}
          <div className="absolute top-[20%] right-[10%] w-32 h-32 opacity-10 animate-float" style={{ animationDuration: '8s' }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50 5 C25 25 15 50 50 95 C85 50 75 25 50 5" fill="none" stroke="#40E0D0" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-8">
          {/* Navigation Links with Staggered Animation */}
          <nav className="flex flex-col items-center gap-2">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className={`group flex items-center gap-4 text-2xl md:text-3xl font-semibold text-white/80 hover:text-white transition-all duration-300 transform ${
                  isOpen 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 80 + 150}ms` : '0ms'
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#40E0D0]/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-6 h-6 text-[#40E0D0]" />
                </div>
                <span>{item.name}</span>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div 
            className={`w-24 h-px bg-gradient-to-r from-transparent via-[#40E0D0]/50 to-transparent my-8 transition-all duration-500 ${
              isOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transitionDelay: isOpen ? '700ms' : '0ms' }}
          />

          {/* Bottom Actions */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-500 ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isOpen ? '800ms' : '0ms' }}
          >
            <Link
              href="/contact"
              onClick={closeMenu}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-8 py-6 text-lg font-semibold bg-[#40E0D0] text-[#1E3A8A] shadow-lg shadow-[#40E0D0]/25 hover:bg-[#40E0D0]/90 transition-all"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </Link>

            {mounted && (
              <button
                onClick={toggleTheme}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 py-6 font-medium border-2 border-white/30 text-white bg-transparent hover:bg-white/10 transition-all"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-5 h-5" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" /> Dark Mode
                  </>
                )}
              </button>
            )}
          </div>

          {/* Brand watermark */}
          <div 
            className={`absolute bottom-8 flex items-center gap-2 text-white/40 transition-all duration-500 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: isOpen ? '900ms' : '0ms' }}
          >
            <Calculator className="w-4 h-4" />
            <span className="text-sm">VietPIT — Foreigner Tax Services</span>
          </div>
        </div>
      </div>
    </>
  )
})

export { Header }
