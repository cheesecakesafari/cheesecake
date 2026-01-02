import React from 'react'
import { Header } from '@/components/sections/Header'
import { LocationsSection } from '@/components/sections/LocationsSection'
import { EnhancedFooter } from '@/components/sections/EnhancedFooter'
import { FloatingWidget } from '@/components/sections/FloatingWidget'
import { FloatingWhatsApp } from '@/components/sections/FloatingWhatsApp'
import { HamburgerMenu } from '@/components/sections/HamburgerMenu'

export default function LocationsPage() {
  return (
    <>
      <Header />

      <section className="bg-amber-50/40 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-white/70 p-8 rounded-lg shadow-md">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Customize Your Personalized Safari</h1>
            <p className="text-lg text-muted-foreground mb-6">Follow these steps to build your ideal trip — then download or share it.</p>

            <ol className="text-left list-decimal list-inside space-y-2 text-sm">
              <li><strong>Open the Locations section</strong> where different destinations are listed.</li>
              <li><strong>Open a Location</strong> and fill the short form (Enter name, number of days, hotel type).</li>
              <li><strong>Add Location/Destination to Package</strong> using the "Add to Package" button in the location details.</li>
              <li><strong>View Package Details</strong> by opening the package panel or the "View All" / package button on screen.</li>
              <li><strong>Download or Send</strong> the package as a JSON or send via WhatsApp / Email using the provided controls.</li>
            </ol>
          </div>
        </div>
      </section>

      <div id="locations">
        <LocationsSection onViewAllClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      </div>

      <EnhancedFooter />
      <FloatingWidget />
      <FloatingWhatsApp />
      <HamburgerMenu />
    </>
  )
}
