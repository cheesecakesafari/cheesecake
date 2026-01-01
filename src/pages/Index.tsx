import React from 'react'
import { Header } from '@/components/sections/Header'
import { HeroSection } from '@/components/sections/HeroSection'
import { PackagesSection } from '@/components/sections/PackagesSection'
import OurCars from '@/components/sections/OurCars'
import { EnhancedFooter } from '@/components/sections/EnhancedFooter'
import { FloatingWidget } from '@/components/sections/FloatingWidget'
import { FloatingWhatsApp } from '@/components/sections/FloatingWhatsApp'
import { HamburgerMenu } from '@/components/sections/HamburgerMenu'

export default function IndexPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <PackagesSection />
      <OurCars />
      <EnhancedFooter />
      <FloatingWidget />
      <FloatingWhatsApp />
      <HamburgerMenu />
    </>
  )
}
